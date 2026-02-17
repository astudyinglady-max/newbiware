"use client";

import React from "react";
import { motion } from "framer-motion";

interface SynergySectionProps {
    headline: string;
    center: string;
    left: { label: string; desc: string; color: string };
    right: { label: string; desc: string; color: string };
}

export const SynergySection: React.FC<SynergySectionProps> = ({ headline, center, left, right }) => {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Glow - Lighter */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-100/50 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">{headline}</h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
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
                        <div className="w-20 h-20 rounded-2xl bg-white border border-yellow-200 flex items-center justify-center mb-6 shadow-lg shadow-yellow-100 animate-pulse">
                            <span className="text-3xl">📅</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-2">{left.label}</h3>
                        <p className="text-slate-500 mb-4">{left.desc}</p>
                        <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 text-sm font-semibold border border-yellow-200">
                            Patient Access
                        </span>
                    </motion.div>

                    {/* Center: HUB */}
                    <div className="relative z-10">
                        {/* Connecting Lines */}
                        <div className="absolute top-1/2 left-[-100px] w-[100px] h-[2px] bg-gradient-to-r from-yellow-300 to-blue-300 hidden lg:block" />
                        <div className="absolute top-1/2 right-[-100px] w-[100px] h-[2px] bg-gradient-to-l from-green-300 to-blue-300 hidden lg:block" />

                        <div className="w-40 h-40 rounded-full bg-white border-4 border-blue-100 flex flex-col items-center justify-center shadow-2xl shadow-blue-100 relative group">
                            <div className="absolute inset-2 rounded-full border border-slate-100 animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-[spin_3s_linear_infinite]" />

                            <span className="text-4xl mb-1">🏥</span>
                            <span className="text-blue-600 font-black tracking-widest text-sm">{center}</span>
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
                        <div className="w-20 h-20 rounded-2xl bg-white border border-green-200 flex items-center justify-center mb-6 shadow-lg shadow-green-100 animate-pulse">
                            <span className="text-3xl">💊</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-2">{right.label}</h3>
                        <p className="text-slate-500 mb-4">{right.desc}</p>
                        <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-semibold border border-green-200">
                            Chronic Care
                        </span>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
