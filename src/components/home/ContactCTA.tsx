"use client";

import React from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

interface ContactCTAProps {
    headline: string;
    primaryBtn: string;
    secondaryBtn: string;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ headline, primaryBtn, secondaryBtn }) => {
    return (
        <section className="relative py-40 bg-white overflow-hidden group">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#0055FF]/[0.02] rounded-full blur-[100px]"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 text-center relative z-10 space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0A0A0F] leading-tight font-syne">
            병·의원 경영의 혁신,<br />지금 시작하세요.
          </h2>
          <p className="text-black/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            국내 유일의 의료 통합 생태계를 통해 더 효율적인 병원 운영과<br className="hidden md:block" /> 혁신적인 환자 경험을 실현하세요.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-[#0055FF] text-white hover:bg-[#0044EE] px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl active:scale-95">
            도입 문의하기
            <ArrowUpRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto bg-white border border-black/10 hover:bg-black/5 text-[#0A0A0F] px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-95">
            <MapPin className="w-5 h-5" />
            가까운 대리점 찾기
          </button>
        </div>

        <div className="flex items-center justify-center gap-8 text-black/30 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0055FF]/30"></div>
            평균 응답시간 2시간 이내
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0055FF]/30"></div>
            전국 37개 대리점 운영
          </div>
        </div>
      </div>
    </section>
    );
};
