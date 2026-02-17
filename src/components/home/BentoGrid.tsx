"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, Pill, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
    headline: string;
    description: string;
    cards: Array<{
        id: string;
        size: "large" | "medium" | "small";
        theme: "glass-blue" | "glass-green" | "glass-dark";
        icon: string;
        title: string;
        desc: string;
        detail: string;
        link: string;
    }>;
}

const iconMap: Record<string, any> = {
    "hospital-building": Building2,
    "pill": Pill,
    "chart-network": Activity
};

const themeMap = {
    "glass-blue": "bg-primary-500/10 border-primary-500/20 hover:bg-primary-500/20",
    "glass-green": "bg-secondary/10 border-secondary/20 hover:bg-secondary/20",
    "glass-dark": "bg-white/5 border-white/10 hover:bg-white/10"
};

export const BentoGrid: React.FC<BentoGridProps> = ({ headline, description, cards }) => {
    return (
        <section className="py-24 bg-primary-950 px-6">
            <div className="w-full max-w-[1488px] mx-auto">
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{headline}</h2>
                    <p className="text-primary-100/60 text-lg">{description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {cards.map((card, idx) => {
                        const Icon = iconMap[card.icon as keyof typeof iconMap] || Activity;
                        return (
                            <Link
                                key={idx}
                                href={card.link}
                                className={cn(
                                    "group relative p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden",
                                    themeMap[card.theme],
                                    card.size === "large" ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                                )}
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="text-white w-6 h-6" />
                                </div>

                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2">{card.desc}</h3>
                                    <p className="text-sm text-primary-100 font-semibold uppercase tracking-wider mb-1">{card.title}</p>
                                </div>

                                <div>
                                    <p className="text-white/60 text-sm">{card.detail}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
