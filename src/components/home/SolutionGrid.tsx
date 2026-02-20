"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Pill, ShoppingCart, BarChart3, ArrowUpRight } from "lucide-react";

const solutions = [
  {
    title: "의사랑 (Medical EMR)",
    description: "국내 시장 점유율 1위, 최신 트렌드를 선도하는 의원용 EMR 솔루션입니다.",
    icon: Activity,
    stats: "17,000+ 병의원",
  },
  {
    title: "유팜 (Pharmacy EMR)",
    description: "약국 경영에 필요한 처방, 조제, 재고관리를 한 번에 해결합니다.",
    icon: Pill,
    stats: "7,000+ 약국",
  },
  {
    title: "미소몰 (Distribution)",
    description: "의료기기부터 소모품까지, 검증된 품질의 헬스케어 전문 커머스입니다.",
    icon: ShoppingCart,
    stats: "전국 37개 대리점",
  },
  {
    title: "UBIST (Data Analysis)",
    description: "방대한 의료 데이터를 정밀 분석하여 제약 마케팅 전략을 제시합니다.",
    icon: BarChart3,
    stats: "제약사 100+ 파트너",
  },
];

const SolutionsGrid: React.FC = () => {
  return (
    <section className="relative min-h-0 sm:min-h-[480px] lg:min-h-[720px] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden touch-pan-y">
      {/* 풀 배경: 다크 블루 + 추상 도형 */}
      <div className="absolute inset-0 bg-[#0F172A]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 0% 100%, rgba(96, 165, 250, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 100% 0%, rgba(37, 99, 235, 0.2) 0%, transparent 50%)
          `,
        }}
      />
      {/* 흰색 곡선 도형 */}
      <div className="absolute bottom-0 left-0 w-[min(90vw,600px)] h-[min(70vw,500px)] bg-white/5 rounded-tr-[40%] rounded-tl-none -translate-x-[10%] translate-y-[20%]" />
      <div className="absolute top-0 right-0 w-[min(80vw,500px)] h-[min(60vw,400px)] bg-blue-500/20 rounded-bl-[50%] rounded-br-none translate-x-[20%] -translate-y-[10%]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#1e3a5f]/40 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* 왼쪽: 타이틀 영역 */}
          <div className="lg:col-span-4 pt-6 sm:pt-8 lg:pt-16">
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-blue-400 uppercase">
              Core Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 sm:mt-4 leading-tight">
              유비케어의 4대
              <br />
              핵심 솔루션
            </h2>
            <p className="text-slate-400 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg">
              의료와 ICT의 융합으로
              <br className="hidden sm:block" />
              새로운 헬스케어를 만듭니다.
            </p>
          </div>

          {/* 오른쪽: 엇갈린 카드 그리드 (2열, 짝수 항목 위로 올림) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {solutions.map((item, idx) => {
                const Icon = item.icon;
                const isEven = idx % 2 === 1;
                return (
                  <motion.a
                    key={idx}
                    href="#"
                    className={`group relative block rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 bg-slate-800/60 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 hover:bg-slate-800/80 transition-all duration-300 ${isEven ? "sm:relative sm:-mt-12" : ""}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                  >
                    <div className="flex flex-col h-full min-h-[140px] sm:min-h-[160px]">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300 mb-4 sm:mb-6 group-hover:bg-blue-500/30 transition-colors">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-blue-200 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed flex-1">
                        {item.description}
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-xs font-semibold text-blue-400/90 uppercase tracking-wider">
                          {item.stats}
                        </span>
                        <span className="w-9 h-9 rounded-full bg-slate-700/80 flex items-center justify-center text-white group-hover:bg-blue-500 transition-colors">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
