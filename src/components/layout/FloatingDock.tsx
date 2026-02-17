"use client";

import React from "react";
import Link from "next/link";
import { Home, Briefcase, BarChart3, MessageCircle } from "lucide-react"; // Map icons manually or dynamically
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingDockProps {
    items: Array<{ label: string; icon: string; link: string }>;
}

const iconMap: Record<string, any> = {
    home: Home,
    briefcase: Briefcase,
    "chart-bar": BarChart3,
    chat: MessageCircle,
};

export const FloatingDock: React.FC<FloatingDockProps> = ({ items }) => {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                className="flex items-center gap-2 px-4 py-3 rounded-full glass border border-white/20 shadow-2xl"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {items.map((item, idx) => {
                    const Icon = iconMap[item.icon] || Home;
                    return (
                        <Link
                            key={idx}
                            href={item.link}
                            className="relative group flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <Icon className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-black/80 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </motion.div>
        </div>
    );
};
