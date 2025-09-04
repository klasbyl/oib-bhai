/**
 * ChatInput Component
 * Handles chat message input with proper validation and accessibility
 */

"use client";

import React, { useState, useCallback, KeyboardEvent } from 'react';
import Image from 'next/image';
import { ASSETS, CHAT_CONSTANTS } from '@/lib/constants';

interface ChatInputProps {
  onSubmit: (message: string) => Promise<void>;
  isLoading: boolean;
  isStreaming: boolean;
  placeholder?: string;
  maxLength?: number;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSubmit,
  isLoading,
  isStreaming,
  placeholder = "Type your prompt here",
  maxLength = CHAT_CONSTANTS.MAX_MESSAGE_LENGTH,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading || isStreaming) {
      return;
    }

    try {
      setMessage(""); // Clear input immediately
      await onSubmit(trimmedMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Error handling is managed by parent component
    }
  }, [message, isLoading, isStreaming, onSubmit]);

  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const trimmedMessage = message.trim();
      if (!trimmedMessage || isLoading || isStreaming) return;

      setMessage("");
      onSubmit(trimmedMessage).catch((error) => {
        console.error('Failed to send message:', error);
        // Error handling is managed by parent component
      });
    }
  }, [message, isLoading, isStreaming, onSubmit]);

  const isDisabled = !message.trim() || isLoading || isStreaming;
  const isSubmitting = isLoading || isStreaming;

  return (
    <div className="flex-shrink-0 px-3 sm:px-4 lg:px-6 pb-8 md:pb-6 safe-area-inset-bottom">
      <form onSubmit={handleSubmit} className="bg-[#413e3e] h-[53px] rounded-[40px] w-[705px] max-w-full mx-auto relative">
        <div className="h-[53px] overflow-clip relative w-full">
          {/* Add button */}
          <button
            type="button"
            className="absolute left-1 size-[45px] top-1 cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Add attachment"
            disabled={isSubmitting}
          >
            <Image
              src={ASSETS.icons.add}
              alt=""
              width={45}
              height={45}
              className="block max-w-none size-full"
            />
          </button>

          {/* Send button */}
          <button
            type="submit"
            className="absolute right-1 size-[45px] top-1 cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDisabled}
            aria-label={isSubmitting ? "Sending message..." : "Send message"}
          >
            <Image
              src={ASSETS.icons.send}
              alt=""
              width={45}
              height={45}
              className={`block max-w-none size-full ${isSubmitting ? 'animate-pulse' : ''}`}
            />
          </button>

          {/* Input field */}
          <div className="absolute left-[62px] right-[120px] top-1/2 -translate-y-1/2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full bg-transparent text-white placeholder-[#858484] text-[14px] outline-none border-none overflow-hidden text-ellipsis"
              style={{
                fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 400,
              }}
              maxLength={maxLength}
              disabled={isSubmitting}
              aria-describedby="input-help"
              aria-invalid={message.length > maxLength}
            />
          </div>

          {/* Microphone icon */}
          <div className="absolute left-[88.79%] right-[9.08%] top-1/2 -translate-y-1/2 aspect-[6.93282/9.5]">
            <Image
              src={ASSETS.icons.microphone}
              alt=""
              width={15}
              height={20}
              className="block max-w-none size-full opacity-50"
            />
          </div>
        </div>

        {/* White border */}
        <div className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[40px]" />

        {/* Hidden help text for screen readers */}
        <div id="input-help" className="sr-only">
          Press Enter to send message. Maximum {maxLength} characters.
          {isSubmitting ? ' Message is being sent.' : ''}
        </div>
      </form>
    </div>
  );
};
