"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useCustomScrollbar } from "@/hooks/use-custom-scrollbar";

// Asset imports
const imgEllipse1 = "/assets/53bf75599706ef0e5e4456934f1b294151d93f59.png";
const imgFrame10 = "/assets/eef4aa0406513d1f8bad96a9c041bcde73b994ec.svg";
const imgGroup = "/assets/377d174631c34357cd26596c83370cfb1b7f85b0.svg";
const imgGroup1 = "/assets/d3deb3f73d5be574dc8ff02a4708d86ec3cf8a76.svg";
const imgGroup2 = "/assets/26cb702bc3f45cbe3d2520a6757db423b98fe1a2.svg";
const imgGroup3 = "/assets/10075025782609e53c183d59e6d3013cb3ac8ac2.svg";
const imgVectorSearch = "/assets/56079bbf4c7b65d985bb245bb2cdfd86398e6614.svg";
const imgVectorExpand = "/assets/4530752161363026214efdef323c68ad717900a7.svg";
const imgVectorNewChat = "/assets/d93e2a2582f0e707f42737ad7aaaf61621474c27.svg";
const imgVectorArrow = "/assets/d1428bb9796cca07e66a235c9a3352a29d1b9510.svg";
const imgVectorArrowGray = "/assets/e56c88d93cc1ca2bf6495c035bbd8cd75bce7034.svg";

// Mock data for chat history
const mockChatHistory = [
  "Daily Planner – Aug 20",
  "Resume Feedback Session",
  "Travel Itinerary Ideas",
  "Brainstorming Startup Names",
  "Job Interview Practice",
  "Recipe Finder: Pasta Variations",
  "Drafting Email Reply",
  "Workout Routine Setup",
  "Wellness Check-in",
  "Quick Q&A – Python Errors",
  "Brainstorming Startup Names",
  "Math Help: Algebra Basics"
];

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function Sidebar({ isExpanded, onToggle, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const {
    scrollThumbTop,
    scrollThumbHeight,
    scrollContainerRef,
    handleScroll,
    handleScrollbarMouseDown,
    handleScrollbarTrackClick,
  } = useCustomScrollbar();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, onClose]);

  return (
    <div 
      ref={sidebarRef}
      className={`bg-[#1f1f1f] h-[calc(100vh-16px)] rounded-[20px] m-2 ${
        isExpanded ? 'w-[300px]' : 'w-[72px] min-w-[72px]'
      } flex flex-col relative`}
    >
      {isExpanded ? (
        // Expanded Sidebar
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-5 pb-4">
            <h1 className="text-white text-[28px] font-semibold">My Chats</h1>
          </div>

          {/* Navigation Buttons */}
          <div className="px-5 space-y-2">
            <button className="w-full bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] px-4 py-2.5 flex items-center gap-4 text-white text-[16px] hover:opacity-80 transition-opacity">
              <Image src={imgVectorNewChat} alt="New Chat" width={12} height={12} />
              <span>New Chat</span>
            </button>
            
            <button className="w-full bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] px-4 py-2.5 flex items-center gap-4 text-white text-[16px] hover:opacity-80 transition-opacity">
              <Image src={imgGroup} alt="Library" width={18} height={18} />
              <span>Library</span>
            </button>
            
            <button className="w-full bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] px-4 py-2.5 flex items-center gap-4 text-white text-[16px] hover:opacity-80 transition-opacity">
              <Image src={imgGroup1} alt="Analytics" width={18} height={18} />
              <span>Analytics</span>
            </button>
            
            <button className="w-full bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] px-4 py-2.5 flex items-center gap-4 text-white text-[16px] hover:opacity-80 transition-opacity">
              <Image src={imgGroup2} alt="Archive" width={18} height={18} />
              <span>Archive</span>
            </button>
          </div>

          {/* Recent Section */}
          <div className="px-5 pt-6 pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-[20px] font-medium">Recent</h2>
              <Image src={imgVectorExpand} alt="Expand" width={11} height={15} />
            </div>
          </div>

          {/* Search */}
          <div className="px-5 pb-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-transparent border border-[#858484] rounded-[8px] px-4 py-2.5 text-[#c4c1c1] text-[14px] outline-none"
              />
              <Image 
                src={imgVectorSearch} 
                alt="Search" 
                width={13} 
                height={13} 
                className="absolute right-3 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Chat History - Scrollable */}
          <div className="flex-1 px-5 overflow-hidden relative">
            <div 
              ref={scrollContainerRef}
              className="h-full overflow-y-auto pr-2 space-y-1 custom-scrollbar"
              onScroll={handleScroll}
            >
              {/* Active Chat */}
              <div className="bg-[#504e4e] rounded-[8px] px-4 py-2.5 flex items-center justify-between">
                <span className="text-white text-[14px]">New Chat</span>
                <Image src={imgVectorArrow} alt="Arrow" width={13} height={3} className="rotate-90" />
              </div>
              
              {/* Chat History Items */}
              {mockChatHistory.map((chat, index) => (
                <div key={index} className="rounded-[8px] px-4 py-2.5 flex items-center justify-between hover:bg-[#2a2a2a] transition-colors cursor-pointer">
                  <span className="text-[#858484] text-[14px] truncate">{chat}</span>
                  <Image src={imgVectorArrowGray} alt="Arrow" width={13} height={3} className="rotate-90" />
                </div>
              ))}
            </div>
            
            {/* Custom Scrollbar */}
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
            </div>
          </div>

          {/* Divider */}
          <div className="px-5 py-2">
            <div className="h-px bg-white/20"></div>
          </div>

          {/* Profile Section */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image src={imgEllipse1} alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-[16px] font-medium">Abhijeet Jharbade</span>
                <span className="text-white text-[12px] font-light">Free</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Collapsed Sidebar
        <div className="flex flex-col items-center justify-between h-full py-2 relative">
          {/* Logo/Home icon */}
          <div className="w-[26px] h-6.5 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer" onClick={onToggle}>
            <Image src={imgGroup3} alt="Home" width={20} height={20} className="w-full h-full" />
          </div>
          
          {/* Top navigation items */}
          <div className="flex flex-col items-center gap-2 -mt-118">
            {/* Navigation buttons */}
            <div className="w-[38px] h-9 bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer" onClick={onToggle}>
              <Image src={imgFrame10} alt="Navigation" width={30} height={30} />
            </div>
            
            <div className="w-[38px] h-9 bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer" onClick={onToggle}>
              <Image src={imgGroup} alt="Navigation" width={18} height={18} />
            </div>
            
            <div className="w-[38px] h-9 bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer" onClick={onToggle}>
              <Image src={imgGroup1} alt="Navigation" width={18} height={18} />
            </div>
            
            <div className="w-[38px] h-9 bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer" onClick={onToggle}>
              <Image src={imgGroup2} alt="Navigation" width={18} height={18} />
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col items-center gap-2">
            {/* Divider line */}
            <div className="w-10 h-px bg-white/20"></div>
            
            {/* Profile section */}
            <div className="relative cursor-pointer hover:opacity-80 transition-opacity" onClick={onToggle}>
              <div className="w-9 h-9 rounded-full overflow-hidden">
                <Image src={imgEllipse1} alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
