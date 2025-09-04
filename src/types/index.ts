/**
 * Application Type Definitions
 * Centralized type definitions for type safety
 */

// Base component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Sidebar related types
export interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  onClick?: () => void;
  isActive?: boolean;
}

// Sources panel types
export interface SourcesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SourceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  url?: string;
}

// Chat related types
export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  type: 'user' | 'ai';
  sources?: SourceItem[];
  reasoning?: string;
  isStreaming?: boolean;
}

export interface ChatThread {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// AI-specific types
export interface AIRequest {
  message: string;
  threadId?: string;
  context?: string;
}

export interface AIResponse {
  content: string;
  reasoning?: string;
  sources?: SourceItem[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
  timestamp: Date;
}

export interface StreamingChunk {
  content: string;
  reasoning?: string;
  isComplete: boolean;
  sources?: SourceItem[];
}

// AI Service types
export interface ChatServiceConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
  stream: boolean;
}

export interface ChatService {
  sendMessage(request: AIRequest): Promise<AIResponse>;
  streamMessage(request: AIRequest): AsyncIterable<StreamingChunk>;
  validateRequest(request: AIRequest): boolean;
}

// Error types for AI
export interface AIError extends AppError {
  code: 'AI_SERVICE_ERROR' | 'AI_RATE_LIMIT' | 'AI_INVALID_REQUEST' | 'AI_MODEL_ERROR';
  retryable: boolean;
}

// Hook return types for AI chat
export interface UseAIChatReturn {
  messages: ChatMessage[];
  currentThread: ChatThread | null;
  isLoading: boolean;
  isStreaming: boolean;
  error: AIError | null;
  sendMessage: (content: string) => Promise<void>;
  createNewThread: () => void;
  switchThread: (threadId: string) => void;
  clearMessages: () => void;
  retryLastMessage: () => Promise<void>;
}

// UI State types
export interface UIState {
  isSidebarExpanded: boolean;
  isSourcesPanelOpen: boolean;
  activeChat?: string;
  isLoading: boolean;
  error?: string;
}

// Device and responsive types
export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

// Category button props
export interface CategoryButtonProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

// Custom hook return types
export interface UseCustomScrollbarReturn {
  scrollThumbTop: number;
  scrollThumbHeight: number;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  handleScroll: () => void;
  handleScrollbarMouseDown: (e: React.MouseEvent) => void;
  handleScrollbarTrackClick: (e: React.MouseEvent) => void;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

// Configuration types
export interface AppConfig {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  version: string;
  features: {
    aiEnabled: boolean;
    analyticsEnabled: boolean;
    sourcesEnabled: boolean;
  };
}

// Event handler types
export type EventHandler<T = void> = () => T;
export type EventHandlerWithParam<P, T = void> = (param: P) => T;

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] };
