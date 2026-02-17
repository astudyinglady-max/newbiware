"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

interface Hero3DProps {
    content: {
        headline: string;
        subHeadline: string;
        badge?: { label: string; color: string };
        cta: {
            primary: { label: string; link: string; icon?: string };
            secondary: { label: string; link: string; icon?: string };
        };
    };
}

export const Hero3D: React.FC<Hero3DProps> = ({ content }) => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-primary-950">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary-500/20 rounded-full blur-3xl animate-float delay-1000" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl animate-float delay-0" />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    {content.badge && (
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-100 text-sm font-medium">
                            {content.badge.label}
                        </span>
                    )}

                    <h1
                        className="text-5xl lg:text-7xl font-bold leading-tight text-white text-balance"
                        dangerouslySetInnerHTML={{ __html: content.headline }}
                    />

                    <p
                        className="text-lg text-primary-100/80 leading-relaxed max-w-xl text-balance"
                        dangerouslySetInnerHTML={{ __html: content.subHeadline }}
                    />

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                            href={content.cta.primary.link}
                            className="group flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold transition-all hover:scale-105"
                        >
                            {content.cta.primary.label}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href={content.cta.secondary.link}
                            className="flex items-center gap-2 px-8 py-4 glass text-white/90 hover:text-white rounded-full font-semibold transition-all hover:bg-white/10"
                        >
                            <Download className="w-5 h-5" />
                            {content.cta.secondary.label}
                        </Link>
                    </div>
                </motion.div>

                {/* Visual Content (Abstract Nodes) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative h-[600px] w-full flex items-center justify-center perspective-1000"
                >
                    {/* Placeholder for 3D model/visual */}
                    <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-white/10 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-8 border border-white/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: 180 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[15%] border border-primary-500/30 rounded-full blur-sm"
                        />

                        {/* Central Node */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary rounded-full blur-lg opacity-50 animate-pulse" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 glass rounded-full flex items-center justify-center z-10 shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                            <span className="text-white font-bold text-xl">UB</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
