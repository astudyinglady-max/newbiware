"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
    logo: { src: string; alt: string; badge?: string };
    navigation: Array<{ label: string; link: string; subItems?: string[] }>;
    actions: Array<{ label: string; type: string; style?: string }>;
}

export const Header: React.FC<HeaderProps> = ({ logo, navigation, actions }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "py-4 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm" : "py-6 bg-transparent"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Left: Logo & Badge */}
                <Link href="/" className="flex items-center gap-3 group">
                    {/* Logo Placeholder */}
                    <div className={cn("text-2xl font-black tracking-tighter transition-colors", scrolled ? "text-slate-900" : "text-white")}>
                        UBcare
                    </div>
                    {/* User removed badge, keeping it removed or optional if they add it back later, but strictly following current file state I should probably leave it out or check if they want it back. The blueprint had it, but user removed it. I will leave it out to respect user edit, or add it back if I'm "resetting" to blueprint. User said "modify structure... based on blueprint" initially, but then manually removed it. I'll respect the blueprint generally but might have to accept the user's manual change. 
                Actually, the user request says "overall primary bg... white bg...". 
                I will re-add the badge code but maybe commented out or just clean up the file to support the light theme properly. 
                I'll stick to the "Light Theme Refactor" goal: visible text on white.
            */}
                </Link>
                {/* Center: GNB */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navigation.map((item, idx) => (
                        <div key={idx} className="relative group">
                            <Link
                                href={item.link}
                                className={cn(
                                    "flex items-center gap-1 text-sm font-medium transition-colors py-2",
                                    scrolled ? "text-slate-600 hover:text-blue-600" : "text-white/80 hover:text-white"
                                )}
                            >
                                {item.label}
                                {item.subItems && (
                                    <ChevronDown
                                        size={14}
                                        className={cn(
                                            "opacity-50 group-hover:opacity-100 transition-opacity",
                                            scrolled ? "text-slate-400 group-hover:text-blue-600" : "text-white/50 group-hover:text-white"
                                        )}
                                    />
                                )}
                            </Link>

                            {/* Dropdown */}
                            {item.subItems && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                                    <div className="py-2">
                                        {item.subItems.map((sub, subIdx) => (
                                            <Link
                                                key={subIdx}
                                                href="#"
                                                className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                                            >
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    {actions.map((action, idx) => {
                        if (action.type === "language") {
                            return (
                                <button
                                    key={idx}
                                    className={cn(
                                        "flex items-center gap-1 text-sm font-medium transition-colors",
                                        scrolled ? "text-slate-500 hover:text-slate-900" : "text-white/60 hover:text-white"
                                    )}
                                >
                                    <Globe size={14} />
                                    <span>{action.label}</span>
                                </button>
                            );
                        }
                        // CTA Button
                        return (
                            <button
                                key={idx}
                                className={cn(
                                    "hidden md:flex px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-blue-500/25",
                                    action.style === "solid-blue"
                                        ? "bg-[#2563EB] text-white hover:bg-[#1d4ed8]"
                                        : "bg-white text-slate-900 hover:bg-slate-50 border border-slate-200"
                                )}
                            >
                                {action.label}
                            </button>
                        );
                    })}

                    {/* Mobile Menu Toggle */}
                    <button className={cn("lg:hidden transition-colors", scrolled ? "text-slate-900" : "text-white/80 hover:text-white")}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
};
