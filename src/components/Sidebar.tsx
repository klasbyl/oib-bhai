"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useCustomScrollbar } from "@/hooks/use-custom-scrollbar";
import { ASSETS, MOCK_CHAT_HISTORY } from "@/lib/constants";
import type { SidebarProps } from "@/types";
import { useRouter } from "next/navigation";
import ProfileMenu from "./ProfileMenu";

export default function Sidebar({ isExpanded, onToggle, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const {
    scrollThumbTop,
    scrollThumbHeight,
    scrollContainerRef,
    handleScroll,
    handleScrollbarMouseDown,
    handleScrollbarTrackClick,
  } = useCustomScrollbar();

  const handleNewChat = () => {
    // Navigate to homepage for new chat
    router.push('/');
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isExpanded || !sidebarRef.current) return;
      
      const target = event.target as HTMLElement;
      
      // Don't close if clicking inside the sidebar
      if (sidebarRef.current.contains(target)) {
        return;
      }
      
      // Don't close if clicking on toggle buttons (in collapsed state)
      const isToggleButton = target.closest('[data-sidebar-toggle]');
      if (isToggleButton) {
        return;
      }
      
      // Close sidebar if clicking outside
      onClose();
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
      className={`bg-[#1f1f1f] mobile-fit-screen overflow-hidden ${
        isExpanded 
          ? 'w-[300px] fixed z-50 md:relative md:z-auto top-2 left-2 right-2 bottom-2 md:inset-auto md:m-2 md:ml-2 md:mr-1 rounded-[20px] md:h-[calc(100vh-16px)]' 
          : 'w-[80px] md:w-[72px] min-w-[80px] md:min-w-[72px] md:m-2 m-2 h-[calc(100vh-32px)] md:h-[calc(100vh-16px)] rounded-[20px] cursor-pointer'
      } flex flex-col relative`}
      style={{
        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onClick={(e) => {
        // Only expand if clicking on the container itself, not on buttons or interactive elements
        if (!isExpanded && !isProfileMenuOpen) {
          // Check if the click target is the sidebar container or a non-interactive child
          const target = e.target as HTMLElement;

          // Don't expand if clicking on interactive elements
          if (target.tagName === 'BUTTON' ||
              target.tagName === 'INPUT' ||
              target.tagName === 'H1' ||
              target.closest('button') ||
              target.closest('input') ||
              target.closest('h1') ||
              target.closest('[data-sidebar-toggle]') ||
              target.closest('[aria-label="Expand sidebar"]') ||
              target.closest('[aria-label="Collapse sidebar"]')) {
            return;
          }

          // Expand the sidebar
          onToggle();
        }
      }}
    >
      {/* Header Section */}
      <div 
        className={`flex items-center pt-3 pb-4 relative ${
          isExpanded ? 'px-5 justify-between' : 'px-0 justify-center'
        }`}
        style={{
          transition: 'padding 0.4s cubic-bezier(0.4, 0, 0.2, 1), justify-content 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Collapsed state: Home icon */}
        <div
          className={`flex items-center justify-center cursor-pointer hover:opacity-80 ${
            isExpanded
              ? 'w-0 h-0 opacity-0 overflow-hidden'
              : 'w-10 h-10 opacity-100'
          }`}
          style={{
            transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          aria-label="Expand sidebar"
        >
          <Image src={ASSETS.icons.home} alt="Home" width={25} height={25} />
        </div>

        {/* Expanded state: Title and collapse button */}
        <div 
          className={`flex items-center justify-between w-full ${
            isExpanded 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-4 pointer-events-none absolute'
          }`}
          style={{
            transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <h1
            className="text-white text-[28px] font-semibold whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            aria-label="Collapse sidebar"
          >
            My Chats
          </h1>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            data-sidebar-toggle
            // className="w-8 h-8 bg-[#504e4e] rounded-[8px] flex items-center justify-center hover:bg-[#595858] transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 ml-4"
            aria-label="Collapse sidebar"
          >
            <Image src={ASSETS.icons.collapse} alt="Collapse" width={20} height={20} />
          </button>
        </div>
      </div>

      {/* Navigation Buttons Section */}
      <div 
        className={`space-y-2 flex flex-col items-center ${
          isExpanded ? 'px-5 items-start' : 'px-0 items-center'
        }`}
        style={{
          transition: 'padding 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* New Chat Button */}
        <button 
          className={`bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] flex items-center text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/20 ${
            isExpanded 
              ? 'w-full px-4 py-2.5 gap-4 text-[16px] h-auto' 
              : 'w-10 h-10 justify-center px-0 py-0'
          }`}
          style={{
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1), gap 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onClick={handleNewChat}
          aria-label="New Chat"
        >
          <Image src={ASSETS.icons.newChat} alt="New Chat" width={12} height={12} className="flex-shrink-0" />
          <span 
            className={`whitespace-nowrap ${
              isExpanded 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-4 w-0 overflow-hidden'
            }`}
            style={{
              transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, width 0.1s ease-out'
            }}
          >
            New Chat
          </span>
        </button>
        
        {/* Library Button */}
        <button 
          className={`bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] flex items-center text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/20 ${
            isExpanded 
              ? 'w-full px-4 py-2.5 gap-4 text-[16px] h-auto' 
              : 'w-10 h-10 justify-center px-0 py-0'
          }`}
          style={{
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1), gap 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onClick={isExpanded ? undefined : onToggle}
          aria-label="Library"
        >
          <Image src={ASSETS.icons.library} alt="Library" width={18} height={18} className="flex-shrink-0" />
          <span 
            className={`whitespace-nowrap ${
              isExpanded 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-4 w-0 overflow-hidden'
            }`}
            style={{
              transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, width 0.1s ease-out'
            }}
          >
            Library
          </span>
        </button>
        
        {/* Analytics Button */}
        <button 
          className={`bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] flex items-center text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/20 ${
            isExpanded 
              ? 'w-full px-4 py-2.5 gap-4 text-[16px] h-auto' 
              : 'w-10 h-10 justify-center px-0 py-0'
          }`}
          style={{
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1), gap 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onClick={isExpanded ? undefined : onToggle}
          aria-label="Analytics"
        >
          <Image src={ASSETS.icons.analytics} alt="Analytics" width={18} height={18} className="flex-shrink-0" />
          <span 
            className={`whitespace-nowrap ${
              isExpanded 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-4 w-0 overflow-hidden'
            }`}
            style={{
              transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, width 0.1s ease-out'
            }}
          >
            Analytics
          </span>
        </button>
        
        {/* Archive Button */}
        <button 
          className={`bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] flex items-center text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/20 ${
            isExpanded 
              ? 'w-full px-4 py-2.5 gap-4 text-[16px] h-auto' 
              : 'w-10 h-10 justify-center px-0 py-0'
          }`}
          style={{
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1), gap 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onClick={isExpanded ? undefined : onToggle}
          aria-label="Archive"
        >
          <Image src={ASSETS.icons.archive} alt="Archive" width={18} height={18} className="flex-shrink-0" />
          <span 
            className={`whitespace-nowrap ${
              isExpanded 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-4 w-0 overflow-hidden'
            }`}
            style={{
              transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, width 0.1s ease-out'
            }}
          >
            Archive
          </span>
        </button>
      </div>

      {/* Expanded Only Content - Recent and Search */}
      <div 
        className={`overflow-hidden ${
          isExpanded 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
        style={{
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s'
        }}
      >
        {/* Recent Section */}
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-[20px] font-medium">Recent</h2>
            <Image src="/assets/4530752161363026214efdef323c68ad717900a7.svg" alt="Expand" width={11} height={15} />
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
              src={ASSETS.icons.search} 
              alt="Search" 
              width={13} 
              height={13} 
              className="absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>

      {/* Chat History - Always Scrollable */}
      <div className="flex-1 overflow-hidden relative">
        <div 
          className={`h-full ${isExpanded ? 'px-5' : 'px-2'}`}
          style={{
            transition: 'padding 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div 
            ref={scrollContainerRef}
            className="h-full overflow-y-auto pr-2 space-y-1 custom-scrollbar"
            onScroll={handleScroll}
          >
            {isExpanded ? (
              <>
                {/* Active Chat */}
                <div className="bg-[#504e4e] rounded-[8px] px-4 py-2.5 flex items-center justify-between">
                  <span className="text-white text-[14px]">New Chat</span>
                  <Image src="/assets/d1428bb9796cca07e66a235c9a3352a29d1b9510.svg" alt="Arrow" width={13} height={3} className="rotate-90" />
                </div>
                
                {/* Chat History Items */}
                {MOCK_CHAT_HISTORY.map((chat: string, index: number) => (
                  <div key={index} className="rounded-[8px] px-4 py-2.5 flex items-center justify-between hover:bg-[#2a2a2a] transition-colors cursor-pointer">
                    <span className="text-[#858484] text-[14px] truncate">{chat}</span>
                    <Image src="/assets/e56c88d93cc1ca2bf6495c035bbd8cd75bce7034.svg" alt="Arrow" width={13} height={3} className="rotate-90" />
                  </div>
                ))}
              </>
            ) : (
              /* Collapsed mode - empty space */
              <div className="h-full"></div>
            )}
          </div>
          
          {/* Custom Scrollbar - Only show when expanded */}
          {isExpanded && (
            <div className="absolute right-2 top-1 bottom-1 w-2 pointer-events-auto">
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
          )}
        </div>
      </div>

      {/* Bottom Section - Divider and Profile */}
      <div className="flex flex-col items-center">
        {/* Divider */}
        <div 
          className={`h-px bg-white/20 ${
            isExpanded ? 'w-full mx-5 mb-2' : 'w-10 mb-4'
          }`}
          style={{
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), margin 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        ></div>
        
        {/* Profile Section */}
        <div 
          className={`cursor-pointer hover:opacity-80 transition-opacity pb-4 safe-area-inset-bottom relative ${
            isExpanded ? 'px-5 w-full' : 'px-0'
          }`} 
          onClick={(e) => {
            e.stopPropagation();
            toggleProfileMenu();
          }}
          style={{
            transition: 'padding 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          role="button"
          aria-label="Open profile menu"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleProfileMenu();
            }
          }}
        >
          <div 
            className={`flex items-center ${
              isExpanded ? 'gap-3' : 'justify-center'
            }`}
            style={{
              transition: 'gap 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image 
                src={ASSETS.images.profile} 
                alt="Abhijeet Jharbade profile picture" 
                width={40} 
                height={40} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div 
              className={`flex flex-col ${
                isExpanded 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-4 w-0 overflow-hidden'
              }`}
              style={{
                transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, width 0.1s ease-out'
              }}
            >
              <span className="text-white text-[16px] font-medium whitespace-nowrap">Abhijeet Jharbade</span>
              <span className="text-white text-[12px] font-light whitespace-nowrap">Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Menu */}
      <ProfileMenu 
        isOpen={isProfileMenuOpen} 
        onClose={closeProfileMenu} 
      />
    </div>
  );
}
