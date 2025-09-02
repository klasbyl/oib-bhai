"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSocialSignup = async (provider: string) => {
    setIsLoading(provider);
    // TODO: Implement actual social signup logic
    console.log(`Signing up with ${provider}`);
    setTimeout(() => setIsLoading(null), 2000); // Simulate loading
  };

  return (
    <div className="min-h-screen bg-[#fcf7f7] flex items-center justify-center p-4">
             {/* Main Signup Container */}
       <div className="bg-white relative rounded-[20px] w-full max-w-[700px] h-[700px] shadow-2xl">
        {/* Border */}
        <div className="absolute border border-[#c8c4c4] border-solid inset-0 pointer-events-none rounded-[20px]" />
        
                 {/* Header Logo & Brand */}
         <div className="absolute top-[25px] left-1/2 -translate-x-1/2 flex gap-[18px] items-end">
           <Link href="/" className="flex gap-[18px] items-end hover:opacity-80 transition-opacity">
             <div className="w-[65px] h-[65px] relative cursor-pointer">
               <Image 
                 src="/assets/640b20a128648296e24f7ce09fa56b28396d42ce.png"
                 alt="Logo"
                 fill
                 className="object-cover"
               />
             </div>
             <h1 className="font-['DM_Sans',sans-serif] font-semibold text-[42px] text-black leading-none whitespace-nowrap cursor-pointer">
               One In a Billion
             </h1>
           </Link>
         </div>

                 {/* Signup Content - Centered */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[35px] items-center w-full max-w-[580px] px-4">
          {/* Signup Header */}
          <div className="flex flex-col gap-4 items-center text-center max-w-[367px]">
            <h2 className="font-['DM_Sans',sans-serif] font-medium text-[32px] text-black leading-none">
              Sign Up
            </h2>
            <p className="font-['DM_Sans',sans-serif] font-normal text-[#858484] text-[16px] leading-normal">
              Join us to get smarter responses and explore more.
            </p>
            <p className="font-['DM_Sans',sans-serif] font-normal text-[#858484] text-[14px] leading-normal">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Social Signup Buttons */}
          <div className="flex flex-col gap-5 items-start w-full max-w-[443px]">
            {/* X (Twitter) Signup */}
            <button
              onClick={() => handleSocialSignup('x')}
              disabled={isLoading === 'x'}
              className="bg-[#f2f1f1] hover:bg-[#e8e7e7] active:bg-[#dedddd] disabled:opacity-50 disabled:cursor-not-allowed w-full h-[69px] flex items-center justify-start px-[50px] py-2.5 rounded-[50px] border border-[#b5b2b2] border-solid transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <div className="w-[30px] h-[30px] relative mr-5 flex-shrink-0">
                <Image 
                  src="/assets/07340b6845ef29631e4157e42edbe647753f57af.png"
                  alt="X (Twitter)"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-['DM_Sans',sans-serif] font-medium text-[#222222] text-[20px] whitespace-nowrap">
                {isLoading === 'x' ? 'Connecting...' : 'Continue with X'}
              </span>
            </button>

            {/* Google Signup */}
            <button
              onClick={() => handleSocialSignup('google')}
              disabled={isLoading === 'google'}
              className="bg-[#f2f1f1] hover:bg-[#e8e7e7] active:bg-[#dedddd] disabled:opacity-50 disabled:cursor-not-allowed w-full h-[69px] flex items-center justify-start px-[50px] py-2.5 rounded-[50px] border border-[#b5b2b2] border-solid transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <div className="w-[30px] h-[30px] relative mr-5 flex-shrink-0">
                <Image 
                  src="/assets/c33182c00d8219852566c2fee5a9b222b1e8fb9f.png"
                  alt="Google"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-['DM_Sans',sans-serif] font-medium text-[#222222] text-[20px] whitespace-nowrap">
                {isLoading === 'google' ? 'Connecting...' : 'Continue with Google'}
              </span>
            </button>

            {/* Apple Signup */}
            <button
              onClick={() => handleSocialSignup('apple')}
              disabled={isLoading === 'apple'}
              className="bg-[#f2f1f1] hover:bg-[#e8e7e7] active:bg-[#dedddd] disabled:opacity-50 disabled:cursor-not-allowed w-full h-[69px] flex items-center justify-start px-[50px] py-2.5 rounded-[50px] border border-[#b5b2b2] border-solid transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <div className="w-[30px] h-[30px] relative mr-5 flex-shrink-0">
                <Image 
                  src="/assets/5611955a4e19212be80ba336fae33bfad862120b.png"
                  alt="Apple"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-['DM_Sans',sans-serif] font-medium text-[#222222] text-[20px] whitespace-nowrap">
                {isLoading === 'apple' ? 'Connecting...' : 'Continue with Apple'}
              </span>
            </button>

            {/* Microsoft Signup */}
            <button
              onClick={() => handleSocialSignup('microsoft')}
              disabled={isLoading === 'microsoft'}
              className="bg-[#f2f1f1] hover:bg-[#e8e7e7] active:bg-[#dedddd] disabled:opacity-50 disabled:cursor-not-allowed w-full h-[69px] flex items-center justify-start px-[50px] py-2.5 rounded-[50px] border border-[#b5b2b2] border-solid transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <div className="w-[30px] h-[30px] relative mr-5 flex-shrink-0">
                <Image 
                  src="/assets/be78c658180cedf877bfbdc7d9d77b076847bd99.png"
                  alt="Microsoft"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-['DM_Sans',sans-serif] font-medium text-[#222222] text-[20px] whitespace-nowrap">
                {isLoading === 'microsoft' ? 'Connecting...' : 'Continue with Microsoft'}
              </span>
            </button>
          </div>
        </div>

                 {/* Footer Terms */}
         <div className="absolute bottom-[15px] left-1/2 -translate-x-1/2 flex gap-8 items-center">
          <a 
            href="/terms" 
            className="font-['DM_Sans',sans-serif] text-[#858484] text-[16px] hover:text-[#666] transition-colors duration-200"
          >
            Terms & Conditions
          </a>
          <a 
            href="/privacy" 
            className="font-['DM_Sans',sans-serif] text-[#858484] text-[16px] hover:text-[#666] transition-colors duration-200"
          >
            Privacy
          </a>
        </div>
      </div>
    </div>
  );
}
