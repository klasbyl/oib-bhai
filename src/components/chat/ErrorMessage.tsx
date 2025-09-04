/**
 * ErrorMessage Component
 * Displays error messages with proper styling and accessibility
 */

"use client";

import React, { memo } from 'react';
import type { AIError } from '@/types';

interface ErrorMessageProps {
  error: AIError;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorMessage = memo<ErrorMessageProps>(({
  error,
  onRetry,
  onDismiss,
  className = ""
}) => {
  const handleRetry = () => {
    onRetry?.();
  };

  const handleDismiss = () => {
    onDismiss?.();
  };

  return (
    <div className={`flex flex-col gap-2.5 items-center w-full max-w-[471px] ${className}`}>
      <div
        className="bg-red-900/20 border border-red-500/50 rounded-[12px] w-full p-4"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="text-red-400 text-[14px] font-normal">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-semibold">Error</p>
          </div>

          <p className="text-red-300 mb-3">{error.message}</p>

          <div className="flex gap-2">
            {error.retryable && onRetry && (
              <button
                onClick={handleRetry}
                className="px-3 py-1 text-sm text-red-300 hover:text-red-200 underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                aria-label="Retry the failed operation"
              >
                Try again
              </button>
            )}

            {onDismiss && (
              <button
                onClick={handleDismiss}
                className="px-3 py-1 text-sm text-red-400 hover:text-red-300 underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                aria-label="Dismiss error message"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ErrorMessage.displayName = 'ErrorMessage';

/**
 * InlineError Component
 * For smaller, less intrusive error displays
 */
interface InlineErrorProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const InlineError = memo<InlineErrorProps>(({
  message,
  onRetry,
  className = ""
}) => (
  <div className={`flex items-center gap-2 text-red-400 text-sm ${className}`}>
    <svg
      className="w-3 h-3 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
    <span>{message}</span>
    {onRetry && (
      <button
        onClick={onRetry}
        className="text-red-300 hover:text-red-200 underline text-xs"
        aria-label="Retry"
      >
        Retry
      </button>
    )}
  </div>
));

InlineError.displayName = 'InlineError';
