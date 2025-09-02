"use client";

import Image from "next/image";
import { useState } from "react";
import AccountsPopup from "./AccountsPopup";
import GeneralPopup from "./GeneralPopup";
import SystemPopup from "./SystemPopup";

// Custom CSS to hide scrollbar
const hideScrollbarStyles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const [isAccountsOpen, setIsAccountsOpen] = useState(false);
  const [isGeneralOpen, setIsGeneralOpen] = useState(false);
  const [isSystemOpen, setIsSystemOpen] = useState(false);

  if (!isOpen) return null;

  const handleMenuClick = (action: string) => {
    console.log(`Profile menu action: ${action}`);
    
    if (action === 'accounts') {
      setIsAccountsOpen(true);
    } else if (action === 'general') {
      setIsGeneralOpen(true);
    } else if (action === 'system-settings') {
      setIsSystemOpen(true);
    } else {
      // TODO: Implement actual functionality for other menu items
      onClose();
    }
  };

  return (
    <>
      {/* Inject custom CSS */}
      <style dangerouslySetInnerHTML={{ __html: hideScrollbarStyles }} />
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-30"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="fixed inset-0 z-50 flex items-end justify-start p-4 md:p-0 md:items-end md:justify-start md:bottom-4 md:left-16 md:inset-auto">
        <div className="bg-[#1c1c1c] border border-[#858484] rounded-[20px] p-[10px] w-[280px] md:w-[249px] shadow-2xl flex flex-col gap-2.5 items-start justify-start max-h-[80vh] overflow-y-auto hide-scrollbar">
          {/* Upgrade your plan */}
          <button
            onClick={() => handleMenuClick('upgrade')}
            className="w-full bg-[#3c3a3a] hover:bg-[#4a4747] rounded-[8px] p-2.5 md:p-[10px] flex items-center gap-2.5 transition-colors"
          >
            <div className="w-4 h-[15px] relative">
              <Image 
                src="/assets/71f4cf981be061398869e65860a4e6a364620035.svg"
                alt="Upgrade"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-['DM_Sans:Regular',sans-serif] font-normal text-[13px] md:text-[14px] text-white whitespace-nowrap leading-[0]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Upgrade your plan
            </span>
          </button>

          {/* Accounts */}
          <button
            onClick={() => handleMenuClick('accounts')}
            className="w-full hover:bg-[#2a2a2a] rounded-[8px] p-2.5 md:p-[10px] flex items-center gap-2.5 transition-colors"
          >
            <div className="w-[18px] h-[18px] relative">
              <Image 
                src="/assets/a76b77ad81d0631a0aa93c759daa55fddcbae999.svg"
                alt="Accounts"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-['DM_Sans:Regular',sans-serif] font-normal text-[13px] md:text-[14px] text-white whitespace-nowrap leading-[0]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Accounts
            </span>
          </button>

          {/* General */}
          <button
            onClick={() => handleMenuClick('general')}
            className="hover:bg-[#2a2a2a] rounded-[8px] p-2.5 md:p-[10px] flex items-center gap-2.5 transition-colors w-full"
          >
            <div className="w-[18px] h-[18px] relative">
              <Image 
                src="/assets/20d53b9d2086badcb1223a626dff28447c2b3e7f.svg"
                alt="General"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-['DM_Sans:Regular',sans-serif] font-normal text-[13px] md:text-[14px] text-white whitespace-nowrap leading-[0]" style={{ fontVariationSettings: "'opsz' 14" }}>
              General
            </span>
          </button>

          {/* System settings */}
          <button
            onClick={() => handleMenuClick('system-settings')}
            className="w-full hover:bg-[#2a2a2a] rounded-[8px] p-2.5 md:p-[10px] flex items-center gap-2.5 transition-colors"
          >
            <div className="w-5 h-5 relative">
              <Image 
                src="/assets/09a7b8b605e3746cb6f00e3a3a5e1ecca070acc0.svg"
                alt="System settings"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-['DM_Sans:Regular',sans-serif] font-normal text-[13px] md:text-[14px] text-white whitespace-nowrap leading-[0]" style={{ fontVariationSettings: "'opsz' 14" }}>
              System settings
            </span>
          </button>

          {/* Divider line below System settings */}
          <div className="w-full h-px bg-[#858484] my-1"></div>

          {/* Terms and Conditions */}
          <button
            onClick={() => handleMenuClick('terms')}
            className="w-full hover:bg-[#2a2a2a] rounded-[8px] p-2.5 md:p-[10px] flex items-center gap-2.5 transition-colors"
          >
            <div className="w-[15px] h-[18px] relative">
              <Image 
                src="/assets/3d3e5bf02e45071e71735737727e0d0800cde887.svg"
                alt="Terms and Conditions"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-['DM_Sans:Regular',sans-serif] font-normal text-[13px] md:text-[14px] text-white whitespace-nowrap leading-[0]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Terms and Conditions
            </span>
          </button>

          {/* Logout */}
          <button
            onClick={() => handleMenuClick('logout')}
            className="w-full hover:bg-[#2a2a2a] rounded-[8px] p-2.5 md:p-[10px] flex items-center gap-2.5 transition-colors"
          >
            <div className="w-[18px] h-[18px] relative">
              <Image 
                src="/assets/1edf12cd1e61ad9cca2521c4b0a6f965f3575380.svg"
                alt="Logout"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-['DM_Sans:Regular',sans-serif] font-normal text-[13px] md:text-[14px] text-white whitespace-nowrap leading-[0]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Accounts Popup */}
      <AccountsPopup 
        isOpen={isAccountsOpen} 
        onClose={() => setIsAccountsOpen(false)} 
      />

      {/* General Popup */}
      <GeneralPopup 
        isOpen={isGeneralOpen} 
        onClose={() => setIsGeneralOpen(false)} 
      />

      {/* System Popup */}
      <SystemPopup 
        isOpen={isSystemOpen} 
        onClose={() => setIsSystemOpen(false)} 
      />
    </>
  );
}
