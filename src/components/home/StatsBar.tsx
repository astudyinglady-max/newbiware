"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatsBarProps {
    items: Array<{ value: string; label: string }>;
}

export const StatsBar: React.FC<StatsBarProps> = ({ items }) => {
    const stats = [
    { value: '44%', label: 'EMR 시장 점유율 1위', desc: '국내 의원급 시장 점유' },
    { value: '1,200만+', label: '누적 가입자 수', desc: '디지털 헬스케어 통합' },
    { value: '24,000+', label: '의료 네트워크', desc: '전국 병·의원 및 약국' },
    { value: '30년+', label: '업계 최장 업력', desc: '신뢰로 쌓아온 헬스케어 역사' },
  ];

  return (
    <div className="bg-[#F8FAFF] py-20 border-y border-black/5">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`relative px-4 flex flex-col items-center text-center group ${
                idx !== stats.length - 1 ? 'md:border-r border-black/5' : ''
              }`}
            >
              <span className="text-5xl md:text-5xl font-bold text-[#0A0A0F] mb-2 font-display tabular-nums group-hover:text-[#0055FF] transition-colors">
                {stat.value}
              </span>
              <span className="text-md font-bold text-black/80 mt-1">
                {stat.label}
              </span>
              <span className="text-md text-black/40 uppercase tracking-wider">
                {stat.desc}
              </span>
              
              {/* Subtle hover indicator */}
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#0055FF] group-hover:w-12 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
