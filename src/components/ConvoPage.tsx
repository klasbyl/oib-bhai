/**
 * ConvoPage Component
 * Main conversation interface with AI chat functionality
 *
 * Features:
 * - Real-time AI chat with xAI Grok 3 Mini
 * - Expandable reasoning sections per message
 * - Streaming responses with loading indicators
 * - Error handling and retry mechanisms
 * - Responsive design with mobile support
 * - Accessible UI with proper ARIA labels
 */

"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import SourcesPanel from "@/components/SourcesPanel";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useSearchParams } from "next/navigation";
import { useAIChat } from "@/hooks/use-ai-chat";
import { useCustomScrollbar } from "@/hooks/use-custom-scrollbar";
import { ChatMessage, ChatInput, ErrorMessage } from "@/components/chat";
import { ASSETS, CHAT_CONSTANTS } from "@/lib/constants";

export default function ConvoPage() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isSourcesPanelOpen, setIsSourcesPanelOpen] = useState(false);
  const [expandedReasoningMessages, setExpandedReasoningMessages] = useState<Set<string>>(new Set());
  const [initialMessage, setInitialMessage] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<'grok' | 'gpt-oss'>('grok');
  const searchParams = useSearchParams();
  const router = useRouter();

  // AI Chat functionality
  const {
    messages,
    isLoading,
    isStreaming,
    isReasoning,
    error,
    sendMessage,
  } = useAIChat();

  // Create a wrapper function to include the model parameter
  const handleSendMessage = useCallback(async (content: string) => {
    await sendMessage(content, selectedModel);
  }, [sendMessage, selectedModel]);
  
  const {
    scrollContainerRef,
    handleScroll,
  } = useCustomScrollbar();

  /**
   * Initialize initial message from URL parameters
   * This allows deep linking to conversations with pre-filled messages
   */
  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setInitialMessage(decodeURIComponent(message));
    }
  }, [searchParams]);

  /**
   * Toggle sidebar expansion state
   * Handles mobile and desktop sidebar visibility
   */
  const toggleSidebar = useCallback(() => {
    setIsSidebarExpanded(prev => !prev);
  }, []);

  /**
   * Close sidebar programmatically
   * Used by mobile backdrop and other UI elements
   */
  const closeSidebar = useCallback(() => {
    setIsSidebarExpanded(false);
  }, []);

  /**
   * Close sources panel programmatically
   * Used by mobile backdrop and other UI elements
   */
  const closeSourcesPanel = useCallback(() => {
    setIsSourcesPanelOpen(false);
  }, []);

  /**
   * Toggle reasoning section for a specific message
   * Manages per-message reasoning expansion state
   * @param messageId - Unique identifier of the message
   */
  const toggleReasoning = useCallback((messageId: string) => {
    setExpandedReasoningMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  }, []);

  const handleLogoClick = useCallback(() => {
    router.push('/');
  }, [router]);

  /**
   * Memoized message list to prevent unnecessary re-renders
   * Only updates when messages array changes
   */
  const messageList = useMemo(() => messages, [messages]);

  /**
   * Auto-scroll to bottom when new messages or streaming content arrives
   */
  useEffect(() => {
    if (scrollContainerRef.current && (messages.length > 0 || isStreaming)) {
      const container = scrollContainerRef.current;
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 10);
    }
  }, [messages, isStreaming, scrollContainerRef]);

  /**
   * Memoized error retry function
   * Retries the last user message when an error occurs
   */
  const handleRetry = useCallback(() => {
    const lastUserMessage = messages
      .slice()
      .reverse()
      .find(msg => msg.type === 'user');

    if (lastUserMessage) {
      sendMessage(lastUserMessage.content);
    }
  }, [messages, sendMessage]);

    return (
    <div className="chat-interface bg-[#1c1c1c] h-screen mobile-vh-fix w-full flex overflow-hidden relative">
      {/* Mobile Backdrop */}
      {(isSidebarExpanded || isSourcesPanelOpen) && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => {
            if (isSidebarExpanded) closeSidebar();
            if (isSourcesPanelOpen) closeSourcesPanel();
          }}
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        isExpanded={isSidebarExpanded}
        onToggle={toggleSidebar}
        onClose={closeSidebar}
      />

      {/* Main Content Area */}
      <ErrorBoundary>
        <div className={`flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 ${
          isSidebarExpanded ? 'md:ml-2' : ''
        }`}>
          {/* Top Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 flex-shrink-0">
                      {/* Logo */}
          <div
            className="w-[45px] h-[45px] rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
            aria-label="Go to homepage"
          >
            <Image src={ASSETS.images.logo} alt="Logo" width={45} height={45} className="w-full h-full object-cover" />
          </div>

            {/* Model Toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#222222] rounded-lg p-1">
                <button
                  onClick={() => setSelectedModel('grok')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    selectedModel === 'grok'
                      ? 'bg-white text-black'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Grok
                </button>
                <button
                  onClick={() => setSelectedModel('gpt-oss')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    selectedModel === 'gpt-oss'
                      ? 'bg-white text-black'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  GPT OSS
                </button>
              </div>

              {/* Upgrade button */}
              <div className="bg-white rounded-[12px] px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 hover:bg-gray-100 transition-colors cursor-pointer">
                <Image src={ASSETS.icons.upgrade} alt="Upgrade icon" width={19} height={18} />
                <span className="text-[#222222] font-medium text-sm sm:text-base">Upgrade</span>
              </div>
            </div>
          </div>

          {/* Chat Thread Interface */}
          <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
            isSourcesPanelOpen ? 'md:mr-[408px]' : ''
          }`}>
            {/* Scrollable Chat Area */}
            <div className="flex-1 overflow-hidden px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
              <div
                ref={scrollContainerRef}
                className="h-full overflow-y-auto pr-2 custom-scrollbar"
                onScroll={handleScroll}
              >
                <div className="flex flex-col gap-[111px] w-full max-w-[786px] mx-auto">
                  {/* Chat Messages */}
                  <div className="flex flex-col gap-5 items-end w-full">
                    {/* Initial Message from URL params */}
                    {initialMessage && messages.length === 0 && (
                      <div className="flex flex-col gap-2.5 items-end w-[471px] max-w-full">
                        <div className="bg-[#222222] h-auto min-h-[79px] rounded-[12px] w-full p-5 flex items-center">
                          <p className="text-white text-[16px] font-normal leading-normal">
                            {initialMessage}
                          </p>
                        </div>
                        <div className="h-[23px] w-[47px]">
                          <Image src="/assets/9b92b08567bb06ffa9496a22e73251b7a42cb630.svg" alt="User timestamp" width={47} height={23} className="w-full h-full" />
                        </div>
                      </div>
                    )}

                    {/* Dynamic Messages */}
                    {messageList.map((msg) => {
                      // Auto-expand reasoning for the currently streaming message
                      const isCurrentlyStreaming = msg.isStreaming && isStreaming;
                      const shouldAutoExpandReasoning = isCurrentlyStreaming && isReasoning;
                      const isExpanded = Boolean(expandedReasoningMessages.has(msg.id) || shouldAutoExpandReasoning);

                      return (
                        <div key={msg.id} className={`flex flex-col gap-2.5 ${msg.type === 'user' ? 'items-end' : 'items-start'} ${msg.type === 'user' ? 'w-[471px] max-w-full' : 'w-full max-w-[786px]'}`}>
                          <ChatMessage
                            message={msg}
                            isExpanded={isExpanded}
                            onToggleReasoning={toggleReasoning}
                          />
                        </div>
                      );
                    })}

                    {/* Error Message */}
                    {error && (
                      <ErrorMessage
                        error={error}
                        onRetry={handleRetry}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Input Area at Bottom */}
            <ChatInput
              onSubmit={handleSendMessage}
              isLoading={isLoading}
              isStreaming={isStreaming}
              placeholder="Type your prompt here"
              maxLength={CHAT_CONSTANTS.MAX_MESSAGE_LENGTH}
            />
          </div>
        </div>
      </ErrorBoundary>

      {/* Sources Panel */}
      <SourcesPanel
        isOpen={isSourcesPanelOpen}
        onClose={closeSourcesPanel}
      />
    </div>
  );
}
