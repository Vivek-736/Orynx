"use client";

import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-white overflow-hidden relative font-sans">
      <div className="hidden md:flex flex-col justify-between w-1/2 p-12 bg-white border-r border-zinc-100 relative z-10">
        <div className="space-y-12">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <Image 
              src="/logo.svg" 
              alt="Orynx Logo" 
              width={28} 
              height={28} 
              className="cursor-pointer"
            />
            <span className="text-2xl font-medium tracking-tight text-zinc-900">
              Orynx
            </span>
          </Link>

          <div className="space-y-6 pt-12">
            <h1 className="text-4xl font-semibold text-zinc-900">
              Next-Gen AI Voice Lab
            </h1>
            <p className="text-base text-zinc-500 max-w-md leading-relaxed">
              Experience professional voice cloning technology. Create and deploy hyper-realistic AI voices with precision.
            </p>
          </div>
        </div>
        <div className="mt-auto pt-12">
          <div 
            className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-900 select-none cursor-default"
            style={{ 
              textShadow: '1px 1px 0px #ccc, 2px 2px 0px #bbb, 3px 3px 0px #aaa, 4px 4px 5px rgba(0,0,0,0.1)'
            }}
          >
            Made with Passion
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-zinc-50/50 relative z-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};