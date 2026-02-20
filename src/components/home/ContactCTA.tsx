"use client";

import React from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { AuroraBackgroundLayer } from "@/components/ui/aurora-background";
interface ContactCTAProps {
    headline: string;
    primaryBtn: string;
    secondaryBtn: string;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ headline, primaryBtn, secondaryBtn }) => {
    return (
        <section className="relative py-20 sm:py-28 md:py-36 lg:py-40 bg-white overflow-hidden group">
           <AuroraBackgroundLayer showRadialGradient={true} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#0055FF]/2 rounded-full blur-[100px]"></div>
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 text-center relative z-10 space-y-8 sm:space-y-10 md:space-y-12">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#0A0A0F] leading-tight font-syne">
            {headline}
          </h2>
          <p className="text-black/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            국내 유일의 의료 통합 생태계를 통해 더 효율적인 병원 운영과<br className="hidden md:block" /> 혁신적인 환자 경험을 실현하세요.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button type="button" className="w-full sm:w-auto min-h-[48px] bg-[#0055FF] text-white hover:bg-[#0044EE] px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl active:scale-95 touch-manipulation">
            {primaryBtn}
            <ArrowUpRight className="w-5 h-5 shrink-0" aria-hidden />
          </button>
          <button type="button" className="w-full sm:w-auto min-h-[48px] bg-white border border-black/10 hover:bg-black/5 text-[#0A0A0F] px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all active:scale-95 touch-manipulation">
            <MapPin className="w-5 h-5" aria-hidden />
            {secondaryBtn}
          </button>
        </div>

        
      </div>
    </section>
    );
};
