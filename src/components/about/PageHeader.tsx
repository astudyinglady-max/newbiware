"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  
  /** 히어로 배경 이미지 (선택) */
  backgroundImage?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  backgroundImage,
}) => {
  return (
    <> 
    <header
      className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden min-h-[280px] sm:min-h-[340px] md:min-h-[400px] flex justify-center items-center"
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(to bottom, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.5) 100%), url(${backgroundImage})`
          : "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.85) 50%, rgba(30,58,138,0.3) 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm text-white/70 mb-6"
          aria-label="breadcrumb"
        >
          
        </nav>
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight text-center">
          {title}
        </h1>
      </div>
    </header>
    
    
    </>
    
  );
};
