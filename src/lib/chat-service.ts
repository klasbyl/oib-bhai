/**
 * Chat Service
 * Handles AI chat API interactions and conversation management
 */

import type {
  AIRequest,
  AIResponse,
  StreamingChunk,
  ChatService,
  ChatServiceConfig,
  AIError,
  ChatMessage,
  ChatThread
} from '@/types';

// Default configuration
const DEFAULT_CONFIG: ChatServiceConfig = {
  apiKey: '',
  model: 'grok-3-mini',
  maxTokens: 2000,
  temperature: 0.7,
  stream: true,
};

// In-memory storage for demo purposes (in production, use a database)
class ChatStorage {
  private threads = new Map<string, ChatThread>();
  private activeThreadId: string | null = null;

  createThread(title: string): ChatThread {
    const thread: ChatThread = {
      id: crypto.randomUUID(),
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    this.threads.set(thread.id, thread);
    this.activeThreadId = thread.id;
    return thread;
  }

  getThread(threadId: string): ChatThread | null {
    return this.threads.get(threadId) || null;
  }

  getActiveThread(): ChatThread | null {
    return this.activeThreadId ? this.threads.get(this.activeThreadId) || null : null;
  }

  updateThread(threadId: string, updates: Partial<ChatThread>): ChatThread | null {
    const thread = this.threads.get(threadId);
    if (!thread) return null;

    const updatedThread = {
      ...thread,
      ...updates,
      updatedAt: new Date(),
    };

    this.threads.set(threadId, updatedThread);
    return updatedThread;
  }

  addMessage(threadId: string, message: ChatMessage): ChatThread | null {
    const thread = this.threads.get(threadId);
    if (!thread) return null;

    const updatedThread = {
      ...thread,
      messages: [...thread.messages, message],
      updatedAt: new Date(),
    };

    this.threads.set(threadId, updatedThread);
    return updatedThread;
  }

  getAllThreads(): ChatThread[] {
    return Array.from(this.threads.values()).sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }

  deleteThread(threadId: string): boolean {
    return this.threads.delete(threadId);
  }
}

// Global storage instance
const chatStorage = new ChatStorage();

export class AIChatService implements ChatService {
  private config: ChatServiceConfig;

  constructor(config: Partial<ChatServiceConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Send a message to the AI and get a response
   */
  async sendMessage(request: AIRequest): Promise<AIResponse> {
    this.validateRequest(request);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: request.message,
          context: request.context,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw this.createAIError(response.status, errorData);
      }

      const data = await response.json();

      return {
        content: data.content,
        reasoning: data.reasoning,
        sources: data.sources,
        usage: data.usage,
        model: data.model,
        timestamp: new Date(data.timestamp),
      };
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        throw error;
      }

      console.error('Chat service error:', error);
      throw this.createAIError(500, {
        error: 'Network error',
        message: 'Failed to connect to AI service',
        retryable: true,
      });
    }
  }

  /**
   * Stream a message response from the AI
   */
  async *streamMessage(request: AIRequest): AsyncIterable<StreamingChunk> {
    this.validateRequest(request);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: request.message,
          context: request.context,
          stream: true,
          model: request.model || 'grok',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw this.createAIError(response.status, errorData);
      }

      if (!response.body) {
        throw this.createAIError(500, {
          error: 'No response body',
          message: 'Streaming response body is empty',
          retryable: true,
        });
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // Send final completion chunk if not already sent
            yield {
              content: '',
              isComplete: true,
            };
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                yield data;
              } catch {
                console.warn('Failed to parse streaming chunk:', line);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        throw error;
      }

      console.error('Streaming error:', error);
      throw this.createAIError(500, {
        error: 'Streaming failed',
        message: 'Failed to stream AI response',
        retryable: true,
      });
    }
  }

  /**
   * Validate request before sending
   */
  validateRequest(request: AIRequest): boolean {
    if (!request.message || typeof request.message !== 'string') {
      throw this.createAIError(400, {
        error: 'Invalid request',
        message: 'Message is required and must be a string',
        retryable: false,
      });
    }

    if (request.message.length > 10000) {
      throw this.createAIError(400, {
        error: 'Invalid request',
        message: 'Message is too long (max 10000 characters)',
        retryable: false,
      });
    }

    if (request.message.trim().length === 0) {
      throw this.createAIError(400, {
        error: 'Invalid request',
        message: 'Message cannot be empty',
        retryable: false,
      });
    }

    return true;
  }

  /**
   * Create a standardized AI error
   */
  private createAIError(status: number, data: Record<string, unknown>): AIError {
    let code: AIError['code'] = 'AI_SERVICE_ERROR';
    let retryable = false;

    if (status === 429) {
      code = 'AI_RATE_LIMIT';
      retryable = true;
    } else if (status === 400) {
      code = 'AI_INVALID_REQUEST';
      retryable = false;
    } else if (status >= 500) {
      code = 'AI_MODEL_ERROR';
      retryable = true;
    }

    return {
      code,
      message: (data.message as string) || 'An error occurred',
      details: data,
      retryable: (data.retryable as boolean) ?? retryable,
    };
  }
}

// Conversation management functions
export const chatManager = {
  /**
   * Create a new chat thread
   */
  createThread(title: string = 'New Conversation'): ChatThread {
    return chatStorage.createThread(title);
  },

  /**
   * Get the active thread
   */
  getActiveThread(): ChatThread | null {
    return chatStorage.getActiveThread();
  },

  /**
   * Switch to a different thread
   */
  switchThread(threadId: string): ChatThread | null {
    const thread = chatStorage.getThread(threadId);
    if (thread) {
      // Mark current active thread as inactive
      const activeThread = chatStorage.getActiveThread();
      if (activeThread) {
        chatStorage.updateThread(activeThread.id, { isActive: false });
      }

      // Mark new thread as active
      chatStorage.updateThread(threadId, { isActive: true });
    }
    return thread;
  },

  /**
   * Add a message to a thread
   */
  addMessage(threadId: string, message: ChatMessage): ChatThread | null {
    return chatStorage.addMessage(threadId, message);
  },

  /**
   * Get all threads
   */
  getAllThreads(): ChatThread[] {
    return chatStorage.getAllThreads();
  },

  /**
   * Update a thread
   */
  updateThread(threadId: string, updates: Partial<ChatThread>): ChatThread | null {
    return chatStorage.updateThread(threadId, updates);
  },

  /**
   * Delete a thread
   */
  deleteThread(threadId: string): boolean {
    return chatStorage.deleteThread(threadId);
  },

  /**
   * Generate a title for a conversation based on the first message
   */
  generateTitle(firstMessage: string): string {
    const trimmed = firstMessage.trim();
    if (trimmed.length <= 50) {
      return trimmed;
    }
    return trimmed.substring(0, 47) + '...';
  },
};

// Export singleton instance
export const aiChatService = new AIChatService();
