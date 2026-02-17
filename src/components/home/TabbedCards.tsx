"use client";

import React, { useEffect, useState } from "react";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

interface TabbedCardsProps {
    headline: string;
    description: string;
    tabs?: string[];
    items: Array<{
        category: string;
        title: string;
        desc: string;
        icon: string;
        link: string;
    }>;
}

export const TabbedCards: React.FC<TabbedCardsProps> = ({ headline, description, items }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 3000); // Change active card every 3 seconds

        return () => clearInterval(interval);
    }, [items.length]);

    return (
        <section className="py-20 px-4 md:px-8 relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary-500 mb-4">{headline}</h2>
                    <p className="text-neutral-300 text-lg max-w-2xl mx-auto">{description}</p>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item, index) => (
                        <GridItem
                            key={index}
                            area=""
                            icon={<GetIconByIndex index={index} />}
                            title={item.title}
                            description={item.desc}
                            active={index === activeIndex}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};

// Helper to get diverse icons since the input only provides string icon names/paths which might not map directly
const GetIconByIndex = ({ index }: { index: number }) => {
    const icons = [
        <Box key="box" className="h-4 w-4 text-white" />,
        <Settings key="settings" className="h-4 w-4 text-white" />,
        <Lock key="lock" className="h-4 w-4 text-white" />,
        <Sparkles key="sparkles" className="h-4 w-4 text-white" />,
        <Search key="search" className="h-4 w-4 text-white" />
    ];
    return icons[index % icons.length];
};

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
    active?: boolean;
}

const GridItem = ({ area, icon, title, description, active }: GridItemProps) => {
    return (
        <li className={cn("min-h-[14rem] list-none", area)}>
            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-[rgba(255,255,255,0.1)] p-2 md:rounded-[1.5rem] md:p-3">

                <div className={cn(
                    "relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] p-6 shadow-sm md:p-6 backdrop-blur-md transition-all duration-500",
                    active ? "border-[#3B82F6]/50 bg-[rgba(59,130,246,0.1)]" : "border-[rgba(255,255,255,0.1)]"
                )}>
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className={cn(
                            "w-fit rounded-lg border-[0.75px] p-2 transition-colors duration-500",
                            active ? "border-[#3B82F6]/50 bg-[#3B82F6]/20" : "border-[rgba(255,255,255,0.1)]"
                        )}>
                            {icon}
                        </div>
                        <div className="space-y-3">
                            <h3 className="pt-0.5 text-3xl leading-tight font-semibold font-sans tracking-[-0.04em] text-balance text-white">
                                {title}
                            </h3>
                            <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-neutral-300">
                                {description}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};
