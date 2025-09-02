"use client";

import Image from "next/image";
import { useState } from "react";

interface SystemPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SystemPopup({ isOpen, onClose }: SystemPopupProps) {
  const [systemMessage, setSystemMessage] = useState(
    "You are a helpful AI assistant. You are knowledgeable, friendly, and always try to provide accurate and helpful responses"
  );

  if (!isOpen) return null;

  const handleReset = () => {
    setSystemMessage("You are a helpful AI assistant. You are knowledgeable, friendly, and always try to provide accurate and helpful responses");
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving system message:", systemMessage);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-70 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-[#222222] rounded-[20px] w-full max-w-4xl max-h-[80vh] overflow-y-auto pointer-events-auto hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#343333]">
            <h1 className="text-[24px] font-semibold text-white font-['DM_Sans',sans-serif]">
              System Settings
            </h1>
            <button
              onClick={onClose}
              className="bg-[#343333] hover:bg-[#4a4747] rounded-[10px] p-2.5 flex items-center gap-2.5 transition-colors"
            >
              <div className="w-[18px] h-[18px] relative">
                <Image 
                  src="/assets/1edf12cd1e61ad9cca2521c4b0a6f965f3575380.svg"
                  alt="Close"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white text-[14px] font-normal">
                Close
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Custom System Message Section */}
            <div className="space-y-3">
              <div className="space-y-2 max-w-[600px]">
                <h2 className="text-[16px] font-semibold text-white font-['DM_Sans',sans-serif]">
                  Custom System Message
                </h2>
                <p className="text-[#858484] text-[14px] font-normal font-['DM_Sans',sans-serif]">
                  Set a custom system message that will be sent to the AI at the beginning of each conversation. This helps define the AI's role, behaviour, and context of all your chats
                </p>
              </div>
              
              {/* System Message Textarea */}
              <div className="relative">
                <textarea
                  value={systemMessage}
                  onChange={(e) => setSystemMessage(e.target.value)}
                  placeholder="Enter your custom system message..."
                  className="w-full h-[120px] p-3 bg-transparent border border-white rounded-[10px] text-white text-[14px] font-normal font-['DM_Sans',sans-serif] resize-none focus:outline-none focus:ring-2 focus:ring-white/20 placeholder:text-[#858484]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleReset}
                className="bg-[#343333] hover:bg-[#4a4747] rounded-[10px] px-4 py-2.5 text-white text-[14px] font-normal font-['DM_Sans',sans-serif] transition-colors min-w-[80px]"
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                className="bg-white hover:bg-gray-100 rounded-[10px] px-4 py-2.5 text-[#222222] text-[14px] font-normal font-['DM_Sans',sans-serif] transition-colors min-w-[80px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
