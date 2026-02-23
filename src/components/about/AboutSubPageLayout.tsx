"use client";

import React, {useEffect, useState} from "react";
import { PageHeader } from "@/components/about/PageHeader";
import { cn } from "@/lib/utils";
const DEFAULT_BACKGROUND =
  "https://images.unsplash.com/photo-1769670385952-36414b192051?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

interface AboutSubPageLayoutProps {
  /** 페이지 헤더 타이틀 (예: 기업개요, 연혁, CEO 메시지) */
  pageTitle: string;
  /** 좌측 상단 라벨 (예: Company Overview, Company History) */
  subLabel: string;
  /** 좌측 큰 제목 (헤드라인). 문자열이면 \n으로 줄바꿈, ReactNode도 지원 */
  headline: React.ReactNode | string;
  /** 우측 본문 영역 */
  children: React.ReactNode;
  /** 헤더 배경 이미지 URL */
  backgroundImage?: string;
}
const SCROLL_THRESHOLD = 20;
export function AboutSubPageLayout({
  pageTitle,
  subLabel,
  headline,
  children,
  backgroundImage = DEFAULT_BACKGROUND,
}: AboutSubPageLayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const rafId = React.useRef<number | null>(null);

  useEffect(() => {
    const updateScrolled = () => {
      const newScrolled = window.scrollY > SCROLL_THRESHOLD;
      setScrolled(prev => prev !== newScrolled ? newScrolled : prev);
      rafId.current = null;
    };

    const handleScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(updateScrolled);
    };

    // 초기 스크롤 위치 확인
    updateScrolled();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, []);
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <PageHeader title={pageTitle} backgroundImage={backgroundImage} />

      <section className="max-w-[1440px] mx-auto px-6 pb-24 sm:pb-20 ">
        <div className={cn("w-full flex-shrink-0 bg-white z-50 lg:top-[30px] pt-16", scrolled ? "bg-white/80" : "")}>
          <p className="flex items-center gap-2 text-sm font-medium text-slate-600 uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
            {subLabel}
          </p>
          <h1 className={cn(
            "text-4xl sm:text-3xl lg:text-5xl font-bold text-[#333333] leading-tight tracking-tighter whitespace-pre-line transition-padding duration-300",

            )}>
            {typeof headline === "string"
              ? headline.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))
              : headline}
          </h1>
        </div>

        <div className="flex-1 min-w-0">{children}</div>
      </section>
    </div>
  );
}
