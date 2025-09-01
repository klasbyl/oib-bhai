"use client";

import Image from "next/image";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import SourcesPanel from "@/components/SourcesPanel";

import { useCustomScrollbar } from "@/hooks/use-custom-scrollbar";

// Asset imports
const imgAsset12 = "/assets/640b20a128648296e24f7ce09fa56b28396d42ce.png";
const imgFrame19 = "/assets/d09129f6602709bb5c29e32c765ade6258442ae8.svg";
const imgFrame20 = "/assets/54212aa38c8d48f27cff07bb9a2a1bbfe77ab63f.svg";
const imgVector4 = "/assets/1ac5dd6ed9e48c5888923a563979c8f56b46627c.svg";
const imgVector5 = "/assets/08c401b681a7f06ff91478a7a2727f1e2d8a5bb6.svg";
const imgVector = "/assets/5eceb407d33a6328409e0fe726d4f00769fc9e08.svg";
const imgVector1 = "/assets/76ded5aa267c13e8c0d321d76b88c25e1a58665a.svg";
const imgVector2 = "/assets/b0279ff2d6d8cdd3331384028d384ff7af34ac5f.svg";
const imgGroup5 = "/assets/a74ec3a64363f6186a4db7a2ab988fb85b4d5e17.svg";
const imgVector3 = "/assets/ef3b19fc5dfbb30127eeb376a8538e5ca93783d2.svg";

interface CategoryButtonProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ 
  icon, 
  label, 
  isActive = false, 
  onClick 
}) => (
  <button 
    onClick={onClick}
    className={`
      h-[38px] px-4 py-2.5 flex items-center gap-3 rounded-[20px] transition-all duration-200
      ${isActive 
        ? 'bg-white text-[#262525] hover:bg-gray-100' 
        : 'bg-[#504e4e] text-white hover:bg-[#595858]'
      }
    `}
  >
    <Image src={icon} alt={label} width={16} height={16} className="w-4 h-4" />
    <span className="text-[14px] font-normal">{label}</span>
  </button>
);

export default function ConvoPage() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isSourcesPanelOpen, setIsSourcesPanelOpen] = useState(false);
  const [isReasoningExpanded, setIsReasoningExpanded] = useState(false);
  const {
    scrollThumbTop,
    scrollThumbHeight,
    scrollContainerRef,
    handleScroll,
    handleScrollbarMouseDown,
    handleScrollbarTrackClick,
  } = useCustomScrollbar();

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
    // // Close sources panel when sidebar is expanded
    // if (!isSidebarExpanded) {
    //   setIsSourcesPanelOpen(false);
    // }
  };

  const closeSidebar = () => {
    setIsSidebarExpanded(false);
  };

  const toggleSourcesPanel = () => {
    setIsSourcesPanelOpen(!isSourcesPanelOpen);
  };

  const closeSourcesPanel = () => {
    setIsSourcesPanelOpen(false);
  };

  const toggleReasoning = () => {
    setIsReasoningExpanded(!isReasoningExpanded);
  };

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
      <div className={`flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 ${
        isSidebarExpanded ? 'md:ml-2' : ''
      }`}>
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 flex-shrink-0">
          {/* Logo */}
          <div className="w-[45px] h-[45px] rounded-lg overflow-hidden">
            <Image src={imgAsset12} alt="Logo" width={45} height={45} className="w-full h-full object-cover" />
          </div>
          
          {/* Upgrade button */}
          <div className="bg-white rounded-[12px] px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 hover:bg-gray-100 transition-colors cursor-pointer">
            <Image src={imgVector5} alt="Upgrade icon" width={19} height={18} />
            <span className="text-[#222222] font-medium text-sm sm:text-base">Upgrade</span>
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
                {/* User Message */}
                <div className="flex flex-col gap-2.5 items-end w-[471px] max-w-full">
                  <div className="bg-[#222222] h-[79px] rounded-[12px] w-full p-5 flex items-center">
                    <p className="text-white text-[16px] font-normal leading-normal">
                      explain me in simple points to start a small product based startup
                    </p>
                  </div>
                  <div className="h-[23px] w-[47px]">
                    <Image src="/assets/9b92b08567bb06ffa9496a22e73251b7a42cb630.svg" alt="User timestamp" width={47} height={23} className="w-full h-full" />
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex flex-col gap-[34px] items-start w-full">
                  {/* Reasoning Section - Conditional Background */}
                  <div className={`rounded-[12px] w-full transition-all duration-400 ease-out ${
                    isReasoningExpanded ? 'bg-[#343333]' : 'bg-transparent'
                  }`}>
                    {/* Reasoning Button - Always Visible */}
                    <div className="p-5 pb-0">
                      <button 
                        onClick={toggleReasoning}
                        className={`bg-[#403d3d] rounded-[8px] p-[10px] flex items-center justify-between w-[158px] hover:bg-[#4a4747] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white/20 ${
                          isReasoningExpanded ? 'border border-white' : 'border border-transparent'
                        }`}
                        aria-expanded={isReasoningExpanded}
                        aria-label={`${isReasoningExpanded ? 'Collapse' : 'Expand'} reasoning section`}
                      >
                        <span className="text-white text-[16px] font-normal">Reasoning</span>
                        <div 
                          className="w-4 h-3 flex items-center justify-center"
                          style={{
                            transform: isReasoningExpanded ? 'rotate(135deg)' : 'rotate(315deg)',
                            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        >
                          <Image src="/assets/f336b203bf6c218af18453ce2315e93526c43331.svg" alt="Toggle" width={12} height={12} />
                        </div>
                      </button>
                    </div>
                    
                    {/* Expandable Content Only */}
                    <div 
                      className={`overflow-hidden transition-all duration-400 ease-out ${
                        isReasoningExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-5 pt-5 relative">
                        <div 
                          className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[0] text-[14px] text-white" 
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          <ol className="list-decimal mb-0" start={4}>
                            <li className="ms-[21px]">
                              <span className="leading-[22px]">Personalization & Familiarity</span>
                            </li>
                          </ol>
                          <ul className="list-disc mb-0">
                                                      <li className="mb-0 ms-[21px]">
                            <span className="leading-[22px]">Titles such as &ldquo;Wellness Check-in&rdquo; or &ldquo;Workout Routine Setup&rdquo; feel personalized and human-like, reinforcing trust in the bot.</span>
                          </li>
                            <li className="ms-[21px]">
                              <span className="leading-[22px]">It mimics how humans label notes or reminders</span>
                            </li>
                          </ul>
                          <p className="leading-[22px] mb-0">.</p>
                          <p className="leading-[22px] mb-0">5. Balance Between Generic & Specific</p>
                          <ul className="list-disc">
                            <li className="mb-0 ms-[21px]">
                              <span className="leading-[22px]">Some titles are generic and flexible (&ldquo;Drafting Email Reply&rdquo;, &ldquo;Quick Q&A – Python Errors&rdquo;).</span>
                            </li>
                            <li className="mb-0 ms-[21px]">
                              <span className="leading-[22px]">Others are specific and descriptive (&ldquo;Brainstorming Startup Names&rdquo;, &ldquo;Creative Story Draft&rdquo;).</span>
                            </li>
                            <li className="ms-[21px]">
                              <span className="leading-[22px]">This balance makes the chat history tidy yet useful across different use cases.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Message Content */}
                  <div className="flex flex-col gap-1.5 items-start w-full">
                    <div className="bg-[#222222] rounded-[10px] w-full p-[27px] pt-4">
                      <div className="text-white text-[16px] font-normal leading-[30px]">
                        <p className="mb-0">
                          Sure 👍 Here&apos;s a <span className="font-bold">short & simple version:</span>
                        </p>
                        <p className="mb-0">&nbsp;</p>
                        <ol className="list-decimal mb-0 ml-6">
                          <li className="mb-0">
                            <span className="font-bold">Find a proble</span>m people face.
                          </li>
                          <li className="mb-0">
                            <span className="font-bold">Validate the ide</span>a – check if others want it.
                          </li>
                          <li className="mb-0">
                            <span className="font-bold">Build a simple MV</span>P (basic version of product).
                          </li>
                          <li className="mb-0">
                            <span className="font-bold">Launch sma</span>ll to early users.
                          </li>
                          <li className="mb-0">
                            <span className="font-bold">Collect feedbac</span>k and improve.
                          </li>
                          <li className="mb-0">
                            <span className="font-bold">Decide revenue mode</span>l (subscription, one-time, etc.).
                          </li>
                          <li className="mb-0">
                            <span className="font-bold">Market cheapl</span>y via social media & communities.
                          </li>
                          <li className="mb-0">
                            <span className="font-bold">Iterate & grow</span> step by step.
                          </li>
                        </ol>
                        <p className="mb-0">&nbsp;</p>
                        <p className="mb-0">
                          👉 Formula: <span className="font-bold">Problem → Validate → MVP → Launch → Feedback → Improve → Grow.</span>
                        </p>
                        <p className="mb-0">&nbsp;</p>
                        <p className="mb-0">Want me to make an ultra-short 1-line version (like a startup mantra)?</p>
                      </div>

                                          {/* Source Attribution */}
                    <div className="flex gap-[5px] items-end justify-end mt-4">
                      <span className="text-[#858484] text-[14px] font-light">Source</span>
                      <button 
                        onClick={toggleSourcesPanel}
                        className="flex items-center hover:opacity-80 transition-opacity"
                      >
                        <Image src="/assets/b20458d1f77516b8b42331fe1b8903745b898b8e.png" alt="Source 1" width={15} height={15} className="mr-[-5px]" />
                        <Image src="/assets/3bb4be32b505c71f4b54097e6464260a76c92a7e.png" alt="Source 2" width={15} height={15} className="mr-[-5px]" />
                        <Image src="/assets/cced42a2ea906dfd1a2c96a7edd2cb587fbcaa4c.png" alt="Source 3" width={15} height={15} className="mr-[-5px]" />
                      </button>
                    </div>
                    </div>
                    
                    {/* AI Response Timestamp */}
                    <div className="h-[23px] w-[78px]">
                      <Image src="/assets/661fccc37c4590d45a3e7486262613fb67247d95.svg" alt="AI timestamp" width={78} height={23} className="w-full h-full" />
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
            
            {/* Custom Scrollbar
            <div className="absolute right-2 top-0 bottom-0 w-2 pointer-events-auto">
              <div 
                className="relative h-full w-full bg-[#2a2a2a] rounded-full cursor-pointer"
                onClick={handleScrollbarTrackClick}
              >
                <div 
                  className="absolute w-full bg-[#504e4e] rounded-full cursor-pointer hover:bg-[#595858] transition-colors select-none"
                  style={{
                    top: `${scrollThumbTop}%`,
                    height: `${scrollThumbHeight}%`,
                    minHeight: '20px'
                  }}
                  onMouseDown={handleScrollbarMouseDown}
                  draggable={false}
                />
              </div>
            </div> */}
          </div>

          {/* Fixed Input Area at Bottom */}
          <div className="flex-shrink-0 px-3 sm:px-4 lg:px-6 pb-8 md:pb-6 safe-area-inset-bottom">
            <div className="bg-[#413e3e] h-[53px] rounded-[40px] w-[705px] max-w-full mx-auto relative">
              <div className="h-[53px] overflow-clip relative w-full">
                {/* Left icon */}
                <button className="absolute left-1 size-[45px] top-1 cursor-pointer">
                  <Image src="/assets/318d58d830b9b38d9b0599b5ddf33d109fb41910.svg" alt="Add" width={45} height={45} className="block max-w-none size-full" />
                </button>
                
                {/* Right icon */}
                <div className="absolute right-1 size-[45px] top-1">
                  <Image src="/assets/54212aa38c8d48f27cff07bb9a2a1bbfe77ab63f.svg" alt="Send" width={45} height={45} className="block max-w-none size-full" />
                </div>
                
                {/* Input text */}
                <div className="absolute left-[62px] right-[120px] top-1/2 -translate-y-1/2">
                  <span className="text-[#858484] text-[14px] font-normal">
                    Type your prompt here
                  </span>
                </div>
                
                {/* Microphone icon */}
                <div className="absolute left-[88.79%] right-[9.08%] top-1/2 -translate-y-1/2 aspect-[6.93282/9.5]">
                  <Image src="/assets/1ac5dd6ed9e48c5888923a563979c8f56b46627c.svg" alt="Microphone" width={15} height={20} className="block max-w-none size-full" />
                </div>
              </div>
              
              {/* White border */}
              <div className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[40px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Sources Panel */}
      <SourcesPanel 
        isOpen={isSourcesPanelOpen}
        onClose={closeSourcesPanel}
      />
    </div>
  );
}
