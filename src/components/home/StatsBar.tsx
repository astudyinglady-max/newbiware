"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatsBarProps {
    items: Array<{ value: string; label: string }>;
}

const DEFAULT_STATS = [
  { value: "44%", label: "EMR 시장 점유율 1위", desc: "국내 의원급 시장 점유" },
  { value: "1,200만+", label: "누적 가입자 수", desc: "디지털 헬스케어 통합" },
  { value: "24,000+", label: "의료 네트워크", desc: "전국 병·의원 및 약국" },
  { value: "30년+", label: "업계 최장 업력", desc: "신뢰로 쌓아온 헬스케어 역사" },
];

export const StatsBar: React.FC<StatsBarProps> = ({ items }) => {
  const displayStats = items?.length
    ? items.map((i, idx) => ({ ...i, desc: DEFAULT_STATS[idx]?.desc ?? "" }))
    : DEFAULT_STATS;

  return (
    <div className="bg-[#F8FAFF] py-12 sm:py-16 md:py-20 border-y border-black/5 touch-pan-y overflow-visible">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {displayStats.map((stat, idx) => (
            <motion.div
              key={idx}
              className={`relative px-2 sm:px-4 flex flex-col items-center text-center group ${
                idx !== displayStats.length - 1 ? 'md:border-r border-black/5' : ''
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
            >
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#222222] mb-1 sm:mb-2 font-display tabular-nums group-hover:text-emerald-400 transition-colors">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm md:text-base font-bold text-black/80 mt-1">
                {stat.label}
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm text-black/40 uppercase tracking-wider hidden sm:block">
                {stat.desc}
              </span>
              
              {/* Subtle hover indicator */}
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#0055FF] group-hover:w-12 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
