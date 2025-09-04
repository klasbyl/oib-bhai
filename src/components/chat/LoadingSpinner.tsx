/**
 * LoadingSpinner Component
 * Accessible loading spinner with customizable size and message
 */

"use client";

import React, { memo } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
  showMessage?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export const LoadingSpinner = memo<LoadingSpinnerProps>(({
  size = 'md',
  message = 'Loading...',
  className = '',
  showMessage = true,
}) => (
  <div
    className={`flex items-center gap-2 ${className}`}
    role="status"
    aria-live="polite"
  >
    <div
      className={`${sizeClasses[size]} border-2 border-white/20 border-t-white rounded-full animate-spin`}
      aria-hidden="true"
    />
    {showMessage && (
      <span className="text-white text-sm">
        {message}
      </span>
    )}
    <span className="sr-only">
      {message}
    </span>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

/**
 * TypingIndicator Component
 * Shows animated dots for typing/streaming state
 */
interface TypingIndicatorProps {
  className?: string;
}

export const TypingIndicator = memo<TypingIndicatorProps>(({ className = '' }) => (
  <div
    className={`flex items-center gap-1 ${className}`}
    role="status"
    aria-live="polite"
    aria-label="AI is typing"
  >
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-white rounded-full animate-bounce"
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.6s'
          }}
          aria-hidden="true"
        />
      ))}
    </div>
    <span className="sr-only">AI is generating a response</span>
  </div>
));

TypingIndicator.displayName = 'TypingIndicator';

/**
 * SkeletonLoader Component
 * Shows skeleton loading state for messages
 */
interface SkeletonLoaderProps {
  lines?: number;
  className?: string;
}

export const SkeletonLoader = memo<SkeletonLoaderProps>(({
  lines = 3,
  className = ''
}) => (
  <div className={`space-y-2 ${className}`} role="status" aria-live="polite">
    {Array.from({ length: lines }, (_, i) => (
      <div
        key={i}
        className="h-4 bg-white/10 rounded animate-pulse"
        style={{
          width: `${Math.random() * 40 + 60}%`, // Random width between 60-100%
          animationDelay: `${i * 0.1}s`
        }}
        aria-hidden="true"
      />
    ))}
    <span className="sr-only">Loading message content</span>
  </div>
));

SkeletonLoader.displayName = 'SkeletonLoader';
