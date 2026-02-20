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
      className="relative w-full py-32 sm:py-32 overflow-hidden min-h-[500px] flex justify-center items-center"
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(to bottom, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.5) 100%), url(${backgroundImage})`
          : "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.85) 50%, rgba(30,58,138,0.3) 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap"
            aria-label="breadcrumb"
          >
            {breadcrumbs.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="w-4 h-4 text-white/50" />}
                {item.href ? (
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-8xl sm:text-8xl font-bold text-white tracking-tight text-center">
          {title}
        </h1>
      </div>
    </header>
    
    
    </>
    
  );
};
