"use client";

import Image from "next/image";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function Homepage() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const closeSidebar = () => {
    setIsSidebarExpanded(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isSubmitting) {
      setIsSubmitting(true);
      // Navigate to convo page with the message as a query parameter
      router.push(`/convo?message=${encodeURIComponent(message.trim())}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    // Navigate to convo page with the category as a message
    router.push(`/convo?message=${encodeURIComponent(`Help me with ${category}`)}`);
  };

  return (
    <div className="chat-interface bg-[#1c1c1c] h-screen w-full relative flex overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        isExpanded={isSidebarExpanded}
        onToggle={toggleSidebar}
        onClose={closeSidebar}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 flex-shrink-0">
          {/* Logo */}
          <div className="w-[45px] h-[45px] rounded-lg overflow-hidden">
            <Image src={imgAsset12} alt="Logo" width={45} height={45} className="w-full h-full object-cover" />
          </div>
          
          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Login button */}
            <Link 
              href="/login"
              className="bg-[#504e4e] hover:bg-[#595858] rounded-[12px] px-4 py-2.5 flex items-center gap-2 transition-colors text-white font-medium text-sm"
            >
              <span>Login</span>
            </Link>
            
            {/* Upgrade button */}
            <div className="bg-white rounded-[12px] px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 hover:bg-gray-100 transition-colors cursor-pointer">
              <Image src={imgVector5} alt="Upgrade icon" width={19} height={18} />
              <span className="text-[#222222] font-medium text-sm sm:text-base">Upgrade</span>
            </div>
          </div>
        </div>

        {/* Main Chat Interface */}
        <div className="flex-1 flex items-center justify-center p-3 sm:p-4 lg:p-6 overflow-hidden">
          <div className="bg-[#1C1C1C] rounded-[25px] p-3 sm:p-4 lg:p-6 w-full max-w-[786px] h-full max-h-[400px] flex flex-col justify-center">
            {/* Welcome Message */}
            <div className="text-center mb-3 sm:mb-4 lg:mb-6 flex-shrink-0">
              <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
                Hi <span className="text-[#858484]">Abhijeet</span>,<br />
                How can we help you?
              </h1>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSubmit} className="bg-[#413e3e] rounded-[40px] h-[53px] mb-3 sm:mb-4 lg:mb-6 relative flex-shrink-0">
              <div className="h-[53px] overflow-clip relative w-full">
                {/* Left icon */}
                <div className="absolute left-1 size-[45px] top-1">
                  <Image src={imgFrame19} alt="Search" width={45} height={45} className="block max-w-none size-full" />
                </div>
                
                {/* Right icon - now a submit button */}
                <button 
                  type="submit"
                  className="absolute right-1 size-[45px] top-1 cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!message.trim() || isSubmitting}
                >
                  <Image 
                    src={imgFrame20} 
                    alt={isSubmitting ? "Sending..." : "Send"} 
                    width={45} 
                    height={45} 
                    className={`block max-w-none size-full ${isSubmitting ? 'animate-pulse' : ''}`}
                  />
                </button>
                
                {/* Input text - now controlled */}
                <div className="absolute left-[62px] right-[120px] top-1/2 -translate-y-1/2">
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your prompt here" 
                    className="w-full bg-transparent text-white placeholder-[#858484] text-[14px] outline-none border-none overflow-hidden text-ellipsis"
                    style={{ 
                      fontFamily: 'DM Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontWeight: 400
                    }}
                    maxLength={500}
                  />
                </div>
                
                {/* Microphone icon */}
                <div className="absolute left-[88.79%] right-[9.08%] top-1/2 -translate-y-1/2 aspect-[6.93282/9.5]">
                  <Image src={imgVector4} alt="Microphone" width={15} height={20} className="block max-w-none size-full" />
                </div>
              </div>
              
              {/* White border */}
              <div className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[40px]" />
            </form>

            {/* Category Selection */}
            <div className="text-center flex-shrink-0">
              <h2 className="text-white text-sm sm:text-base mb-2 sm:mb-3 lg:mb-4">Are you looking for?</h2>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:gap-3">
                <CategoryButton icon={imgVector} label="Fintech" onClick={() => handleCategoryClick("Fintech")} />
                <CategoryButton icon={imgVector1} label="E-commerce" onClick={() => handleCategoryClick("E-commerce")} />
                <CategoryButton icon={imgVector2} label="SaaS" onClick={() => handleCategoryClick("SaaS")} />
                <CategoryButton icon={imgGroup5} label="Legal Help" onClick={() => handleCategoryClick("Legal Help")} />
                <CategoryButton icon={imgVector3} label="More" isActive onClick={() => handleCategoryClick("general assistance")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
