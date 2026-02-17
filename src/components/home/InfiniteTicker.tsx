"use client";

import React from "react";
import { motion } from "framer-motion";

interface InfiniteTickerProps {
    items: Array<{ value: string; label: string; sub: string }>;
    speed?: "slow" | "normal" | "fast";
}

export const InfiniteTicker: React.FC<InfiniteTickerProps> = ({ items, speed = "normal" }) => {
    const duration = speed === "slow" ? 40 : speed === "fast" ? 15 : 25;

    return (
        <section className="py-12 bg-primary-950 border-y border-white/5 overflow-hidden">
            <div className="relative w-full flex">
                <motion.div
                    className="flex flex-nowrap gap-16"
                    animate={{ x: "-50%" }}
                    transition={{ ease: "linear", duration: duration, repeat: Infinity }}
                >
                    {[...items, ...items, ...items, ...items].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center min-w-[200px]">
                            <span className="text-4xl md:text-5xl font-bold text-white mb-2">{item.value}</span>
                            <span className="text-primary-100 font-medium">{item.label}</span>
                            <span className="text-white/40 text-sm mt-1">{item.sub}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
