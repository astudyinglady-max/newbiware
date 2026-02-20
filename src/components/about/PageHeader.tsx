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
  /** 브레드크럼 (선택) */
  breadcrumbs?: BreadcrumbItem[];
  /** 히어로 배경 이미지 (선택) */
  backgroundImage?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs,
  backgroundImage,
}) => {
  return (
    <>
    <header
      className="relative w-full py-32 sm:py-8 overflow-hidden min-h-[500px] sm:min-h-[240px] md:min-h-[320px] lg:min-h-[400px] flex justify-center items-center"
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(to bottom, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.5) 100%), url(${backgroundImage})`
          : "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.85) 50%, rgba(30,58,138,0.3) 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        
        <h1 className="text-8xl sm:text-4xl lg:text-4xl md:text-4xl font-bold text-white tracking-tight text-center">
          {title}
        </h1>
      </div>
    </header>
    
    
    </>
    
  );
};
