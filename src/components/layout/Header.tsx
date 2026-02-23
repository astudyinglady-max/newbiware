"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Globe, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
    logo: { src: string; alt: string; badge?: string };
    navigation: Array<{ label: string; link: string; subItems?: string[] }>;
    actions: Array<{ label: string; type: string; style?: string }>;
}

const SCROLL_THRESHOLD = 20;

const SUB_LINK_MAP: Record<string, Record<string, string>> = {
  Company: {
    "기업개요": "/about/overview",
    "연혁": "/about/history",
    "CEO 메시지": "/about/ceo",
    "투자정보": "/about/ir",
    "내부정보관리규정": "/about/policy",
    "회사현황": "/about/company-status",
    "전국대리점": "/about/branches",
  },
  Business: {
    "EMR (병/의원)": "/solutions/medical",
    "EMR (약국)": "/solutions/pharmacy",
    "유통": "/solutions/distribution",
    "제약/데이터": "/solutions/pharma",
  },
  "UB Culture": {
    "인재상": "/platform/talent",
    "UB Life": "/platform/ub-life",
    "UB Pride": "/platform/ub-pride",
    "인재채용": "/platform/recruit",
    "윤리경영": "/platform/ethics",
  },
};

function getSubLink(parentLabel: string, subLabel: string): string {
  return SUB_LINK_MAP[parentLabel]?.[subLabel] ?? "#";
}

export const Header: React.FC<HeaderProps> = ({ logo, navigation, actions }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDesktopMenu, setOpenDesktopMenu] = useState<number | null>(null);
    const rafId = React.useRef<number | null>(null);
    const desktopNavRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const updateScrolled = () => {
            setScrolled(window.scrollY > SCROLL_THRESHOLD);
            rafId.current = null;
        };
        const handleScroll = () => {
            if (rafId.current !== null) return;
            rafId.current = requestAnimationFrame(updateScrolled);
        };
        setScrolled(window.scrollY > SCROLL_THRESHOLD);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafId.current !== null) cancelAnimationFrame(rafId.current);
        };
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1280px)");
        const handleChange = () => {
            if (mq.matches) setIsMobileMenuOpen(false);
        };
        mq.addEventListener("change", handleChange);
        return () => mq.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!desktopNavRef.current) return;
            if (!desktopNavRef.current.contains(event.target as Node)) {
                setOpenDesktopMenu(null);
            }
        };
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpenDesktopMenu(null);
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-12",
                scrolled ? "py-3 sm:py-4 bg-white/90 backdrop-blur-md shadow-sm" : "py-4 sm:py-5 md:py-6 bg-transparent"
            )}
        >
            <div className="container mx-auto flex items-center justify-between">
                {/* Left: Logo & Badge */}
                <Link href="/" className="flex items-center gap-3 group" aria-label="UBcare 홈">
                    <span className={cn("text-xl sm:text-2xl font-black tracking-tighter transition-colors text-[#0055FF]", scrolled ? "text-slate-900" : "text-white")}>
                        UBcare
                    </span>
                </Link>
                {/* Center: GNB */}
                <nav ref={desktopNavRef} className="hidden xl:flex items-center gap-8">
                    {navigation.map((item, idx) => (
                        <div key={idx} className="relative">
                            {item.subItems && item.subItems.length > 0 ? (
                                <button
                                    type="button"
                                    onClick={() => setOpenDesktopMenu(openDesktopMenu === idx ? null : idx)}
                                    className={cn(
                                        "flex items-center gap-1 text-sm font-medium transition-colors py-2",
                                        scrolled ? "text-slate-600 hover:text-blue-600" : "text-white/80 hover:text-white"
                                    )}
                                    aria-haspopup="menu"
                                    aria-expanded={openDesktopMenu === idx}
                                >
                                    {item.label}
                                    <ChevronDown
                                        size={14}
                                        className={cn(
                                            "opacity-60 transition-transform",
                                            openDesktopMenu === idx && "rotate-180",
                                            scrolled ? "text-slate-400" : "text-white/50"
                                        )}
                                    />
                                </button>
                            ) : (
                                <Link
                                    href={item.link}
                                    className={cn(
                                        "flex items-center gap-1 text-sm font-medium transition-colors py-2",
                                        scrolled ? "text-slate-600 hover:text-blue-600" : "text-white/80 hover:text-white"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            )}

                            {item.subItems && item.subItems.length > 0 && openDesktopMenu === idx && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl transition-all duration-200 overflow-hidden">
                                    <div className="py-2">
                                        {item.subItems.map((sub, subIdx) => (
                                            <Link
                                                key={subIdx}
                                                href={getSubLink(item.label, sub)}
                                                onClick={() => setOpenDesktopMenu(null)}
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
                                    "hidden xl:flex px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-blue-500/25",
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
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                        className={cn(
                            "xl:hidden min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 transition-colors touch-manipulation",
                            scrolled || isMobileMenuOpen ? "text-slate-900" : "text-white/80 hover:text-white"
                        )}
                        aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {isMobileMenuOpen && (
                <div className="xl:hidden fixed inset-0 top-[72px] bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 overflow-y-auto">
                    <nav className="max-w-[1600px] mx-auto px-6 py-6">
                        {navigation.map((item, idx) => (
                            <div key={idx} className="border-b border-slate-200/80 last:border-b-0 py-3">
                                <Link
                                    href={item.link}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-slate-900 font-semibold text-base py-2"
                                >
                                    {item.label}
                                </Link>
                                {item.subItems && item.subItems.length > 0 && (
                                    <div className="mt-1 pl-2 flex flex-col">
                                        {item.subItems.map((sub, subIdx) => (
                                            <Link
                                                key={subIdx}
                                                href={getSubLink(item.label, sub)}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-slate-600 hover:text-blue-600 text-sm py-2"
                                            >
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};
