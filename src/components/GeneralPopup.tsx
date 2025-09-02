"use client";

import Image from "next/image";
import { useState } from "react";

interface GeneralPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GeneralPopup({ isOpen, onClose }: GeneralPopupProps) {
  const [autoSave, setAutoSave] = useState(true);
  const [language, setLanguage] = useState('English');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-70 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-[#222222] rounded-[20px] w-full max-w-2xl max-h-[70vh] overflow-y-auto pointer-events-auto hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#343333]">
            <h1 className="text-[24px] font-semibold text-white font-['DM_Sans',sans-serif]">
              General Settings
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


            {/* Auto Save Section */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2 max-w-[400px]">
                <h2 className="text-[16px] font-semibold text-white font-['DM_Sans',sans-serif]">
                  Auto save conversations
                </h2>
                <p className="text-[#858484] text-[14px] font-normal font-['DM_Sans',sans-serif]">
                  Automatically save your conversations to your account for further references and access devices
                </p>
              </div>
              <button
                onClick={() => setAutoSave(!autoSave)}
                className={`w-10 h-5 rounded-full p-0.5 transition-all ${
                  autoSave ? 'bg-white' : 'bg-[#343333]'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-[#222222] transition-transform ${
                  autoSave ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Language Section */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2 max-w-[400px]">
                <h2 className="text-[16px] font-semibold text-white font-['DM_Sans',sans-serif]">
                  Language
                </h2>
                <p className="text-[#858484] text-[14px] font-normal font-['DM_Sans',sans-serif]">
                  Select your preferred language
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="border border-white rounded-lg px-3 py-2 w-28 flex items-center justify-between hover:bg-[#343333] transition-colors"
                >
                  <span className="text-white text-[14px] font-normal font-['DM_Sans',sans-serif]">
                    {language}
                  </span>
                  <div className="w-2.5 h-2.5 relative">
                    <Image 
                      src="/assets/9f492f127f2b1cd95291d6953b4f26ee62624379.svg"
                      alt="Dropdown"
                      width={7}
                      height={7}
                      className={`object-contain transition-transform ${
                        showLanguageMenu ? 'rotate-180' : 'rotate-90'
                      }`}
                    />
                  </div>
                </button>
                
                {showLanguageMenu && (
                  <div className="absolute top-full left-0 mt-1 w-28 bg-[#343333] border border-white rounded-lg py-1 z-10">
                    {['English', 'Spanish', 'French', 'German'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setShowLanguageMenu(false);
                        }}
                        className="w-full px-3 py-2 text-left text-white text-[14px] hover:bg-[#4a4747] transition-colors"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Settings Sync Section */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2 max-w-[400px]">
                <h2 className="text-[16px] font-semibold text-white font-['DM_Sans',sans-serif]">
                  Settings Sync
                </h2>
                <p className="text-[#858484] text-[14px] font-normal font-['DM_Sans',sans-serif]">
                  Your settings are automatically saved to your account and will sync across all devices.
                </p>
              </div>
              <button className="bg-white border border-white rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors">
                <span className="text-[#222222] text-[14px] font-normal font-['DM_Sans',sans-serif]">
                  Save Now
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
