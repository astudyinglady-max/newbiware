"use client";

import React from "react";
import Link from "next/link";
import { Activity, Pill, Truck, Database, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SolutionsGridProps {
    headline: string;
    description: string;
    items: Array<{
        title: string;
        desc: string;
        icon: string;
        theme: string;
    }>;
}

const iconMap: Record<string, any> = {
    activity: Activity,
    pill: Pill,
    truck: Truck,
    database: Database
};

// Updated light theme styles
const themeClasses: Record<string, string> = {
    blue: "bg-white border-slate-200 hover:border-blue-500 text-blue-600 hover:shadow-xl hover:shadow-blue-500/10",
    cyan: "bg-white border-slate-200 hover:border-cyan-500 text-cyan-600 hover:shadow-xl hover:shadow-cyan-500/10",
    indigo: "bg-white border-slate-200 hover:border-indigo-500 text-indigo-600 hover:shadow-xl hover:shadow-indigo-500/10",
    violet: "bg-white border-slate-200 hover:border-violet-500 text-violet-600 hover:shadow-xl hover:shadow-violet-500/10"
};

export const SolutionsGrid: React.FC<SolutionsGridProps> = ({ headline, description, items }) => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{headline}</h2>
                    <p className="text-slate-500 text-lg">{description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item, idx) => {
                        const Icon = iconMap[item.icon] || Activity;
                        return (
                            <Link
                                key={idx}
                                href="#"
                                className={cn(
                                    "group relative p-8 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-2",
                                    themeClasses[item.theme] || themeClasses["blue"]
                                )}
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 group-hover:text-blue-500">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>

                                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Icon size={32} />
                                </div>

                                <h3 className="text-3xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
