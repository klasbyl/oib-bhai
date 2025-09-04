/**
 * useAIChat Hook
 * React hook for managing AI chat functionality with streaming support
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import type {
  ChatMessage,
  ChatThread,
  AIError,
  UseAIChatReturn
} from '@/types';
import { aiChatService, chatManager } from '@/lib/chat-service';

export function useAIChat(threadId?: string): UseAIChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentThread, setCurrentThread] = useState<ChatThread | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isReasoning, setIsReasoning] = useState(false);
  const [error, setError] = useState<AIError | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Initialize thread on mount
  useEffect(() => {
    if (threadId) {
      const thread = chatManager.switchThread(threadId);
      if (thread) {
        setCurrentThread(thread);
        setMessages(thread.messages);
      }
    } else {
      // Create new thread if none specified
      const newThread = chatManager.createThread();
      setCurrentThread(newThread);
      setMessages([]);
    }
  }, [threadId]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setIsReasoning(false);
    setIsLoading(false);
  }, []);

  // Send message function
  const sendMessage = useCallback(async (content: string, model: 'grok' | 'gpt-oss' = 'grok') => {
    if (!content.trim() || !currentThread) return;

    // Clear previous error
    setError(null);

    // Create user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: content.trim(),
      timestamp: new Date(),
      type: 'user',
    };

    // Add user message to state immediately
    setMessages(prev => [...prev, userMessage]);

    // Create AI message placeholder
    const aiMessageId = crypto.randomUUID();
    const aiMessage: ChatMessage = {
      id: aiMessageId,
      content: '',
      timestamp: new Date(),
      type: 'ai',
      isStreaming: true,
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsStreaming(true);
    setIsReasoning(false); // Start with reasoning collapsed

    try {
      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController();

      // Stream the AI response
      let fullContent = '';
      let reasoning = '';
      let hasStartedReasoning = false;
      let hasStartedResponse = false;

      const stream = aiChatService.streamMessage({
        message: content.trim(),
        threadId: currentThread.id,
        model,
      });

      for await (const chunk of stream) {
        // Check if request was cancelled
        if (abortControllerRef.current?.signal.aborted) {
          break;
        }

        if (chunk.isComplete) {
          // Update final message
          setMessages(prev => prev.map(msg =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  content: fullContent,
                  reasoning,
                  isStreaming: false,
                  timestamp: new Date(),
                }
              : msg
          ));

          // Save to thread
          const finalMessage: ChatMessage = {
            id: aiMessageId,
            content: fullContent,
            timestamp: new Date(),
            type: 'ai',
            reasoning: reasoning || undefined,
            sources: chunk.sources,
          };

          chatManager.addMessage(currentThread.id, userMessage);
          chatManager.addMessage(currentThread.id, finalMessage);

          // Reset reasoning state
          setIsReasoning(false);
          break;
        } else {
          // Handle reasoning vs content streaming
          if (chunk.reasoning && !hasStartedResponse) {
            if (!hasStartedReasoning) {
              hasStartedReasoning = true;
              setIsReasoning(true); // Expand reasoning section when reasoning starts
            }
            reasoning += chunk.reasoning;
          }

          if (chunk.content) {
            if (!hasStartedResponse) {
              hasStartedResponse = true;
              setIsReasoning(false); // Collapse reasoning when final response starts
            }
            fullContent += chunk.content;
          }

          setMessages(prev => prev.map(msg =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  content: fullContent,
                  reasoning: reasoning || undefined,
                }
              : msg
          ));
        }
      }
    } catch (err) {
      console.error('Chat error:', err);

      let chatError: AIError;

      // Type-safe error handling
      if (err && typeof err === 'object' && 'code' in err && 'message' in err) {
        // Already an AIError
        chatError = err as AIError;
      } else {
        // Create a generic error
        chatError = {
          code: 'AI_SERVICE_ERROR' as const,
          message: err instanceof Error ? err.message : 'An unexpected error occurred',
          details: err,
          retryable: true,
        };
      }

      // Update AI message with error state
      setMessages(prev => prev.map(msg =>
        msg.id === aiMessageId
          ? {
              ...msg,
              content: 'Sorry, I encountered an error while processing your message. Please try again.',
              isStreaming: false,
            }
          : msg
      ));

      setError(chatError);
    } finally {
      setIsStreaming(false);
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [currentThread]);

  // Create new thread
  const createNewThread = useCallback(() => {
    cleanup();
    const newThread = chatManager.createThread();
    setCurrentThread(newThread);
    setMessages([]);
    setError(null);
  }, [cleanup]);

  // Switch to existing thread
  const switchThread = useCallback((newThreadId: string) => {
    cleanup();
    const thread = chatManager.switchThread(newThreadId);
    if (thread) {
      setCurrentThread(thread);
      setMessages(thread.messages);
      setError(null);
    }
  }, [cleanup]);

  // Clear messages in current thread
  const clearMessages = useCallback(() => {
    if (currentThread) {
      setMessages([]);
      chatManager.updateThread(currentThread.id, { messages: [] });
    }
  }, [currentThread]);

  // Retry last message
  const retryLastMessage = useCallback(async () => {
    if (!currentThread || messages.length === 0) return;

    const lastUserMessage = [...messages]
      .reverse()
      .find(msg => msg.type === 'user');

    if (lastUserMessage) {
      // Remove the last AI response if it exists
      const lastAiMessageIndex = messages.findLastIndex(msg => msg.type === 'ai');
      if (lastAiMessageIndex !== -1) {
        setMessages(prev => prev.slice(0, lastAiMessageIndex));
      }

      await sendMessage(lastUserMessage.content);
    }
  }, [currentThread, messages, sendMessage]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    messages,
    currentThread,
    isLoading,
    isStreaming,
    isReasoning,
    error,
    sendMessage,
    createNewThread,
    switchThread,
    clearMessages,
    retryLastMessage,
  };
}

/**
 * Hook for managing multiple chat threads
 */
export function useChatThreads() {
  const [threads, setThreads] = useState<ChatThread[]>([]);

  const refreshThreads = useCallback(() => {
    setThreads(chatManager.getAllThreads());
  }, []);

  const deleteThread = useCallback((threadId: string) => {
    const success = chatManager.deleteThread(threadId);
    if (success) {
      refreshThreads();
    }
    return success;
  }, [refreshThreads]);

  // Refresh threads on mount
  useEffect(() => {
    refreshThreads();
  }, [refreshThreads]);

  return {
    threads,
    refreshThreads,
    deleteThread,
  };
}
