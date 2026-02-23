"use client";

import React from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";

interface SynergySectionProps {
    headline: string;
    center: string;
    left: { label: string; desc: string; color: string };
    right: { label: string; desc: string; color: string };
}

export const SynergySection: React.FC<SynergySectionProps> = ({ headline, center, left, right }) => {
    return (
        <section
            className="relative overflow-hidden min-h-[820px] py-16 md:py-20 flex flex-col justify-center items-center bg-[#050510]"
        >
            <div className="relative z-10 max-w-[1600px] mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{headline}</h2>

                    {/* 헤드라인 아래 빛 퍼짐 효과 */}
                    <div className="w-full md:w-[40rem] max-w-full h-40 relative mx-auto z-0">
                        {/* 글로우 라인 */}
                        <div className="absolute inset-x-20 top-0 bg-linear-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                        <div className="absolute inset-x-20 top-0 bg-linear-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                        <div className="absolute inset-x-60 top-0 bg-linear-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                        <div className="absolute inset-x-60 top-0 bg-linear-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                        {/* Sparkles 파티클 */}
                        <SparklesCore
                            id="synergy-sparkles"
                            background="transparent"
                            minSize={0.4}
                            maxSize={1}
                            particleDensity={1200}
                            className="w-full h-full"
                            particleColor="#FFFFFF"
                        />

                        {/* 가장자리 페이드 마스크 */}
                        <div className="absolute inset-0 w-full h-full bg-[#050510] [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
                    </div>

                    <p className="text-blue-200/70 text-2xl max-w-2xl mx-auto -mt-10 relative z-10 top-[-60px]">
                        EMR 하나로 환자 유입부터 관리까지,<br className="hidden md:block" />
                        완벽한 병원 경영 사이클을 완성합니다.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">

                    {/* Left: Ddocdoc (Yellow) */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center lg:items-end text-center lg:text-right"
                    >
                        <h3 className="text-3xl font-bold text-white mb-2">{left.label}</h3>
                        <p className="text-blue-200/60 mb-4">{left.desc}</p>
                        <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300 text-sm font-semibold border border-yellow-400/30">
                            Patient Access
                        </span>
                    </motion.div>

                    {/* Center: HUB */}
                    <div className="relative z-10">
                        {/* Connecting Lines */}
                        <div className="absolute top-1/2 left-[-100px] w-[100px] h-[2px] bg-gradient-to-r from-yellow-400/40 to-blue-400/40 hidden lg:block" />
                        <div className="absolute top-1/2 right-[-100px] w-[100px] h-[2px] bg-gradient-to-l from-green-400/40 to-blue-400/40 hidden lg:block" />

                        <div className="w-80 h-80 rounded-full bg-white/5 backdrop-blur-sm border-4 border-blue-400/20 flex flex-col items-center justify-center shadow-2xl shadow-blue-500/10 relative group">
                            <div className="absolute inset-2 rounded-full border border-white/5" />
                            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400/60" />

                            <span className="text-4xl mb-1">🏥</span>
                            <span className="text-blue-300 font-black tracking-widest text-sm">{center}</span>
                        </div>
                    </div>

                    {/* Right: Dr.Vice (Green) */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        <h3 className="text-3xl font-bold text-white mb-2">{right.label}</h3>
                        <p className="text-blue-200/60 mb-4">{right.desc}</p>
                        <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-sm font-semibold border border-green-400/30">
                            Chronic Care
                        </span>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
