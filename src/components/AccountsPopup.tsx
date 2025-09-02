"use client";

import Image from "next/image";

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

interface AccountsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountsPopup({ isOpen, onClose }: AccountsPopupProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Inject custom CSS */}
      <style dangerouslySetInnerHTML={{ __html: hideScrollbarStyles }} />
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-70 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-[#222222] rounded-[20px] w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#343333]">
            <h1 className="text-[32px] font-semibold text-white font-['DM_Sans',sans-serif]">
              Accounts
            </h1>
            <button
              onClick={onClose}
              className="bg-[#343333] hover:bg-[#4a4747] rounded-[10px] p-2.5 flex items-center gap-2.5 transition-colors"
            >
              <div className="w-[18px] h-[18px] relative">
                <Image 
                  src="/assets/1edf12cd1e61ad9cca2521c4b0a6f965f3575380.svg"
                  alt="Logout"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white text-[14px] font-normal">
                Logout
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Profile Section */}
            <div className="space-y-2">
              <h2 className="text-[20px] font-medium text-white font-['DM_Sans',sans-serif]">
                Profile
              </h2>
              <div className="bg-[#343333] rounded-[20px] p-4 flex items-center gap-6">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image 
                    src="/assets/53bf75599706ef0e5e4456934f1b294151d93f59.png"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2.5 text-white">
                  <div className="text-[16px] font-medium font-['DM_Sans',sans-serif]">
                    Abhijeet Jharbade
                  </div>
                  <div className="text-[12px] font-light font-['DM_Sans',sans-serif]">
                    abhijeetjharbade@gmail.com
                  </div>
                  <div className="text-[12px] font-medium font-['DM_Sans',sans-serif]">
                    Connected via google
                  </div>
                </div>
              </div>
            </div>

            {/* Linked Accounts Section */}
            <div className="space-y-2">
              <h2 className="text-[20px] font-medium text-white font-['DM_Sans',sans-serif]">
                Linked Accounts
              </h2>
              <div className="space-y-px">
                {/* Google */}
                <div className="flex items-center justify-between py-2.5 border-b border-[#858484]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 relative">
                      <Image 
                        src="/assets/6b7ef6157717dc56e4ee3f53ccd05532f1888544.svg"
                        alt="Google"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[16px] font-medium text-white font-['DM_Sans',sans-serif]">
                      Google
                    </span>
                  </div>
                  <span className="text-[16px] font-medium text-[#34a853] font-['DM_Sans',sans-serif]">
                    Connected
                  </span>
                </div>
                
                {/* Apple */}
                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 relative">
                      <Image 
                        src="/assets/7797af88f869250e9ed44cfe36263cfd0ad80b43.svg"
                        alt="Apple"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[16px] font-medium text-white font-['DM_Sans',sans-serif]">
                      Apple
                    </span>
                  </div>
                  <span className="text-[16px] font-medium text-[#504e4e] font-['DM_Sans',sans-serif]">
                    Not Connected
                  </span>
                </div>
              </div>
            </div>

            {/* Account Activity Section */}
            <div className="space-y-2">
              <h2 className="text-[20px] font-medium text-white font-['DM_Sans',sans-serif]">
                Account Activity
              </h2>
              <div className="space-y-px">
                {/* Last Login */}
                <div className="flex items-center justify-between py-2.5 border-b border-[#858484]">
                  <span className="text-[16px] font-medium text-white font-['DM_Sans',sans-serif]">
                    Last Login
                  </span>
                  <span className="text-[12px] font-normal text-white font-['DM_Sans',sans-serif]">
                    8/28/2025 at 12:03:45 PM
                  </span>
                </div>
                
                {/* Account Created */}
                <div className="flex items-center justify-between py-2.5 border-b border-[#858484]">
                  <span className="text-[16px] font-medium text-white font-['DM_Sans',sans-serif]">
                    Account Created
                  </span>
                  <span className="text-[12px] font-normal text-white font-['DM_Sans',sans-serif]">
                    06/23/2024
                  </span>
                </div>
                
                {/* Total Conversations */}
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-[16px] font-medium text-white font-['DM_Sans',sans-serif]">
                    Total Conversations
                  </span>
                  <span className="text-[12px] font-normal text-white font-['DM_Sans',sans-serif]">
                    58
                  </span>
                </div>
              </div>
            </div>

            {/* Account Management Section */}
            <div className="space-y-2">
              <h2 className="text-[20px] font-medium text-white font-['DM_Sans',sans-serif]">
                Account Management
              </h2>
              <div className="space-y-2">
                {/* Delete Chat History */}
                <button className="w-full bg-[#991b1b] hover:bg-[#b91c1c] rounded-[8px] p-[10px] flex items-center gap-2.5 transition-colors group">
                  <div className="w-[18px] h-[18px] relative">
                    <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <span className="text-white text-[14px] font-medium font-['DM_Sans',sans-serif]">
                    Delete Chat History
                  </span>
                </button>
                
                {/* Delete Account */}
                <button className="w-full bg-[#991b1b] hover:bg-[#7f1d1d] rounded-[8px] p-[10px] flex items-center gap-2.5 transition-colors group">
                  <div className="w-[18px] h-[18px] relative">
                    <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <span className="text-white text-[14px] font-medium font-['DM_Sans',sans-serif]">
                    Delete Account
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
