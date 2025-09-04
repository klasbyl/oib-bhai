/**
 * ChatMessage Component
 * Displays individual chat messages with proper styling and accessibility
 */

"use client";

import React, { memo, useRef } from 'react';
import Image from 'next/image';
import type { ChatMessage as ChatMessageType } from '@/types';
import { ASSETS } from '@/lib/constants';

interface ChatMessageProps {
  message: ChatMessageType;
  isExpanded: boolean;
  onToggleReasoning: (messageId: string) => void;
}

export const ChatMessage = memo<ChatMessageProps>(({
  message,
  isExpanded,
  onToggleReasoning
}) => {
  const isUser = message.type === 'user';

  return (
    <div
      className={`flex flex-col gap-2.5 w-full ${
        isUser ? 'items-end' : 'items-start'
      }`}
    >
      {/* Reasoning Section for AI messages */}
      {!isUser && (
        <ReasoningSection
          message={message}
          isExpanded={isExpanded}
          onToggle={() => onToggleReasoning(message.id)}
        />
      )}

      {/* Message Content */}
      <div
        className="bg-[#222222] h-auto min-h-[79px] rounded-[12px] w-full p-5 flex items-center"
        role="article"
        aria-label={`${isUser ? 'User' : 'AI'} message`}
      >
        <div
          className="text-white text-[16px] font-normal leading-[30px] w-full"
          style={{
            fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: 400,
          }}
        >
          {message.type === 'ai' && message.isStreaming ? (
            <div>
              <div className="whitespace-pre-wrap">{message.content}</div>
              <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse" />
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{message.content}</div>
          )}
        </div>
      </div>

      {/* Sources for AI messages */}
      {!isUser && message.sources && message.sources.length > 0 && (
        <SourcesDisplay sources={message.sources} />
      )}

      {/* Timestamp */}
      <div
        className={`h-[23px] ${isUser ? 'w-[47px]' : 'w-[78px]'}`}
        aria-label={`Message timestamp: ${message.timestamp.toLocaleTimeString()}`}
      >
        <Image
          src={isUser ? ASSETS.icons.userTimestamp : ASSETS.icons.aiTimestamp}
          alt={`${isUser ? 'User' : 'AI'} message timestamp`}
          width={isUser ? 47 : 78}
          height={23}
          className="w-full h-full"
        />
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

/**
 * ReasoningSection Component
 * Displays the AI reasoning section with expand/collapse functionality
 */
interface ReasoningSectionProps {
  message: ChatMessageType;
  isExpanded: boolean;
  onToggle: () => void;
}

const ReasoningSection = memo<ReasoningSectionProps>(({
  message,
  isExpanded,
  onToggle
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new reasoning content arrives
  React.useEffect(() => {
    if (isExpanded && message.isStreaming && scrollRef.current && message.reasoning) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      });
    }
  }, [message.reasoning, isExpanded, message.isStreaming]);

  return (
  <div
    className={`rounded-[12px] w-full transition-all duration-400 ease-out ${
      isExpanded ? 'bg-[#343333]' : 'bg-transparent'
    }`}
  >
    <div className="p-5 pb-0">
      <button
        onClick={onToggle}
        disabled={message.isStreaming}
        className={`bg-[#403d3d] rounded-[8px] p-[10px] flex items-center justify-between w-[158px] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white/20 ${
          isExpanded
            ? 'border border-white'
            : 'border border-transparent hover:bg-[#4a4747]'
        } ${message.isStreaming ? 'cursor-not-allowed opacity-75' : 'hover:bg-[#4a4747]'}`}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} reasoning section`}
        aria-describedby="reasoning-content"
      >
        <span className="text-white text-[16px] font-normal">
          Reasoning
          {message.isStreaming && (
            <span className="inline-block w-2 h-4 bg-white ml-2 animate-pulse" />
          )}
        </span>
        <div
          className="w-4 h-3 flex items-center justify-center"
          style={{
            transform: isExpanded ? 'rotate(135deg)' : 'rotate(315deg)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          aria-hidden="true"
        >
          <Image
            src={ASSETS.icons.toggle}
            alt=""
            width={12}
            height={12}
          />
        </div>
      </button>
    </div>

    <div
      id="reasoning-content"
      className={`overflow-hidden transition-all duration-400 ease-out ${
        isExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="p-5 pt-5 relative">
        <div
          ref={scrollRef}
          className="font-['DM_Sans:Regular',_sans-serif] font-normal text-[14px] text-white transition-all duration-200 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
          style={{
            fontVariationSettings: "'opsz' 14",
            lineHeight: '1.5',
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          {message.reasoning ? (
            <div className="whitespace-pre-wrap min-h-[20px]" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {message.reasoning}
            </div>
          ) : (
            <div className="text-[#858484] italic min-h-[20px]" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {message.isStreaming
                ? "Analyzing your question and formulating a response..."
                : "The AI is processing your request and will provide reasoning when available."
              }
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
});

ReasoningSection.displayName = 'ReasoningSection';

/**
 * SourcesDisplay Component
 * Shows source attribution for AI messages
 */
interface SourcesDisplayProps {
  sources: Array<{ icon: string; title: string; description?: string; url?: string }>;
}

const SourcesDisplay = memo<SourcesDisplayProps>(({ sources }) => (
  <div className="flex gap-[5px] items-end justify-end mt-4">
    <span className="text-[#858484] text-[14px] font-light">Source</span>
    <div className="flex gap-[-5px]">
      {sources.slice(0, 3).map((source, idx) => (
        <Image
          key={idx}
          src={source.icon}
          alt={`Source ${idx + 1}: ${source.title}`}
          width={15}
          height={15}
          className="mr-[-5px]"
          title={source.title}
        />
      ))}
    </div>
  </div>
));

SourcesDisplay.displayName = 'SourcesDisplay';
