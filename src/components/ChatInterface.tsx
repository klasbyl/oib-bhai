import Image from "next/image";

// Asset imports
const imgEllipse1 = "/assets/53bf75599706ef0e5e4456934f1b294151d93f59.png";
const imgAsset12 = "/assets/640b20a128648296e24f7ce09fa56b28396d42ce.png";
const imgFrame10 = "/assets/eef4aa0406513d1f8bad96a9c041bcde73b994ec.svg";
const imgGroup = "/assets/377d174631c34357cd26596c83370cfb1b7f85b0.svg";
const imgGroup1 = "/assets/d3deb3f73d5be574dc8ff02a4708d86ec3cf8a76.svg";
const imgGroup2 = "/assets/26cb702bc3f45cbe3d2520a6757db423b98fe1a2.svg";
const imgGroup3 = "/assets/10075025782609e53c183d59e6d3013cb3ac8ac2.svg";
const imgVector = "/assets/5eceb407d33a6328409e0fe726d4f00769fc9e08.svg";
const imgVector1 = "/assets/76ded5aa267c13e8c0d321d76b88c25e1a58665a.svg";
const imgVector2 = "/assets/b0279ff2d6d8cdd3331384028d384ff7af34ac5f.svg";
const imgGroup5 = "/assets/a74ec3a64363f6186a4db7a2ab988fb85b4d5e17.svg";
const imgVector3 = "/assets/ef3b19fc5dfbb30127eeb376a8538e5ca93783d2.svg";
const imgFrame19 = "/assets/d09129f6602709bb5c29e32c765ade6258442ae8.svg";
const imgFrame20 = "/assets/54212aa38c8d48f27cff07bb9a2a1bbfe77ab63f.svg";
const imgVector5 = "/assets/08c401b681a7f06ff91478a7a2727f1e2d8a5bb6.svg";
const imgVector4 = "/assets/1ac5dd6ed9e48c5888923a563979c8f56b46627c.svg"; // Added missing asset

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

export default function ChatInterface() {
  return (
    <div className="chat-interface bg-[#1c1c1c] h-screen w-full relative flex overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="bg-[#222222] w-[72px] min-w-[72px] h-[calc(100vh-16px)] rounded-[20px] m-2 flex flex-col items-center justify-between py-2 relative">
        {/* Top navigation items */}
        <div className="flex flex-col items-center gap-1.5">
          {/* Logo/Home icon */}
          <div className="w-[38px] h-9 flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
            <Image src={imgFrame10} alt="Home" width={38} height={40} className="w-full h-full" />
          </div>
          
          {/* Navigation buttons */}
          <div className="w-[38px] h-9 bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
            <Image src={imgGroup} alt="Navigation" width={18} height={18} />
          </div>
          
          <div className="w-[38px] h-9 bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
            <Image src={imgGroup1} alt="Navigation" width={18} height={18} />
          </div>
          
          <div className="w-[38px] h-9 bg-gradient-to-r from-[#504e4e] to-[#595858] rounded-[10px] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
            <Image src={imgGroup2} alt="Navigation" width={18} height={18} />
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col items-center gap-2">
          {/* Divider line */}
          <div className="w-10 h-px bg-white/20"></div>
          
          {/* Profile section */}
          <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <Image src={imgEllipse1} alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Image src={imgGroup3} alt="Profile icon" width={18} height={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
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
            <div className="bg-[#413e3e] rounded-[40px] h-[53px] mb-3 sm:mb-4 lg:mb-6 relative flex-shrink-0">
              <div className="h-[53px] overflow-clip relative w-full">
                {/* Left icon */}
                <div className="absolute left-1 size-[45px] top-1">
                  <Image src={imgFrame19} alt="Search" width={45} height={45} className="block max-w-none size-full" />
                </div>
                
                {/* Right icon */}
                <div className="absolute right-1 size-[45px] top-1 cursor-pointer hover:opacity-80 transition-opacity">
                  <Image src={imgFrame20} alt="Send" width={45} height={45} className="block max-w-none size-full" />
                </div>
                
                {/* Input text - now writable */}
                <div className="absolute left-[62px] right-[120px] top-1/2 -translate-y-1/2">
                  <input 
                    type="text" 
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
            </div>

            {/* Category Selection */}
            <div className="text-center flex-shrink-0">
              <h2 className="text-white text-sm sm:text-base mb-2 sm:mb-3 lg:mb-4">Are you looking for?</h2>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:gap-3">
                <CategoryButton icon={imgVector} label="Fintech" />
                <CategoryButton icon={imgVector1} label="E-commerce" />
                <CategoryButton icon={imgVector2} label="SaaS" />
                <CategoryButton icon={imgGroup5} label="Legal Help" />
                <CategoryButton icon={imgVector3} label="More" isActive />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
