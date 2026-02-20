"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, TrendingUp, Users } from "lucide-react";

interface WhyUBcareProps {
    headline: string;
    subHeadline: string;
    features: Array<{ title: string; desc: string }>;
}

export const WhyUBcare: React.FC<WhyUBcareProps> = ({ headline, subHeadline, features }) => {
    const icons = [ShieldCheck, TrendingUp, Users, CheckCircle2];

    return (
        <section className="py-16 sm:py-20 md:py-24 bg-white relative border-y border-slate-100">
            <div className="container max-w-[1600px] mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 md:gap-16 items-start">

                    {/* Left: Headline & Context */}
                    <div className="lg:w-1/3">
                        
                         <span className="text-sm font-bold tracking-[0.2em] text-[#0055FF] uppercase">Difference</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A0A0F]">{headline}</h2>
                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed border-l-4 border-blue-500 pl-4 sm:pl-6 mt-4 sm:mt-6 ">
                            {subHeadline}
                        </p>
                    </div>
                   

                    {/* Right: Feature List */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                        {features.map((feature, idx) => {
                            const Icon = icons[idx] || CheckCircle2;
                            return (
                                <motion.div
                                    key={idx}
                                    className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.55, delay: idx * 0.09, ease: "easeOut" }}
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-50 text-[#9CAFB7] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2 sm:mb-3">{feature.title}</h3>
                                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
};
