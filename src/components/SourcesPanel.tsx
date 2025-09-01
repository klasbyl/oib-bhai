"use client";

import Image from "next/image";

// Asset imports
const imgEllipse6 = "/assets/f757d4fd644a78bdd7cafb5f4539a4cbed05d5cc.png";
const imgEllipse7 = "/assets/5b5ee343a71bc51cb7fb4167ee290c8f6d9c1d32.png";
const imgEllipse8 = "/assets/70dd8473fe9336453a06c60f1c9c5aaddc2049e2.png";
const imgEllipse9 = "/assets/7eb09f6edd37ee622bd301bb9eecd030deb71033.png";
const imgVector = "/assets/1d598a39bbd2a527534525f0c600ebeefb3638a5.svg";
const imgVector1 = "/assets/bcd88e226763390ee79c1dfeed006dce1cbe2be5.svg";

interface SourcesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SourceItemProps {
  icon: string;
  title: string;
  description: string;
}

const SourceItem: React.FC<SourceItemProps> = ({ icon, title, description }) => (
  <div className="bg-[#343333] h-[108px] rounded-[12px] w-full p-[18px] relative overflow-hidden">
    <div className="absolute left-[5px] size-10 top-[7px]">
      <Image 
        src={icon} 
        alt="Source icon" 
        width={40} 
        height={40} 
        className="block max-w-none size-full rounded-full" 
      />
    </div>
    <div className="absolute left-14 text-[#9acff0] text-[14px] font-medium top-1 w-[207px] leading-[22px]">
      {title}
    </div>
    <div className="absolute left-2 text-white text-[12px] font-normal top-[54px] w-[251px] leading-[15px]">
      {description}
    </div>
  </div>
);

export default function SourcesPanel({ isOpen, onClose }: SourcesPanelProps) {
  const sources = [
    {
      icon: imgEllipse6,
      title: 'Titles "Wellness Check-in" or "Workout Routine Setup"',
      description: 'Titles such as "Wellness Check-in" or "Workout Routine Setup" feel personalized and human-like,'
    },
    {
      icon: imgEllipse8,
      title: 'Titles "Wellness Check-in" or "Workout Routine Setup"',
      description: 'Titles such as "Wellness Check-in" or "Workout Routine Setup" feel personalized and human-like,'
    },
    {
      icon: imgEllipse7,
      title: 'Titles "Wellness Check-in" or "Workout Routine Setup"',
      description: 'Titles such as "Wellness Check-in" or "Workout Routine Setup" feel personalized and human-like,'
    },
    {
      icon: imgEllipse9,
      title: 'Titles "Wellness Check-in" or "Workout Routine Setup"',
      description: 'Titles such as "Wellness Check-in" or "Workout Routine Setup" feel personalized and human-like,'
    }
  ];

  return (
    <div className={`fixed bg-[#222222] overflow-hidden shadow-2xl transition-all duration-300 z-40 ${
      isOpen 
        ? 'w-full md:w-[400px] opacity-100 right-0 md:right-2 top-0 md:top-[75px] bottom-0 md:bottom-2 md:rounded-[20px]' 
        : 'w-0 opacity-0 right-2 top-[75px] bottom-2'
    }`}>
      {isOpen && (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-5 pb-4 flex-shrink-0">
            <h2 className="text-white text-[20px] font-normal">Sources</h2>
            <button 
              onClick={onClose}
              className="w-3 h-3 flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <Image src={imgVector} alt="Close" width={12} height={12} />
            </button>
          </div>

          {/* Sources List */}
          <div className="px-[18px] space-y-4 flex-1 overflow-y-auto">
            {sources.map((source, index) => (
              <SourceItem
                key={index}
                icon={source.icon}
                title={source.title}
                description={source.description}
              />
            ))}
          </div>

          {/* View More */}
          <div className="flex items-center justify-center gap-[11px] py-4 flex-shrink-0">
            <span className="text-[#858484] text-[15px] font-normal">View more</span>
            <div className="w-3 h-[7px]">
              <Image src={imgVector1} alt="Arrow down" width={12} height={7} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
