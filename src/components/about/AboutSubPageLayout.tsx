import React from "react";
import { PageHeader } from "@/components/about/PageHeader";

const DEFAULT_BACKGROUND =
  "https://images.unsplash.com/photo-1769670385952-36414b192051?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

interface AboutSubPageLayoutProps {
  /** 페이지 헤더 타이틀 (예: 기업개요, 연혁, CEO메시지) */
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

export function AboutSubPageLayout({
  pageTitle,
  subLabel,
  headline,
  children,
  backgroundImage = DEFAULT_BACKGROUND,
}: AboutSubPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <PageHeader title={pageTitle} backgroundImage={backgroundImage} />

      <section className="max-w-[1600px] mx-auto px-6 pb-24 sm:pb-20 ">
        <div className="w-full flex-shrink-0 sticky top-[70px] sm:top-[35px] bg-white z-50 lg:top-[70px] pt-16 sm:pt-8">
          <p className="flex items-center gap-2 text-sm font-medium text-slate-600 uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
            {subLabel}
          </p>
          <h1 className="text-6xl sm:text-3xl lg:text-7xl font-light text-[#333333] leading-tight tracking-tighter whitespace-pre-line ">
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
