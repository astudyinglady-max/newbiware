"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
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
    "CEO메시지": "/about/ceo",
    "투자정보": "/about/ir",
    "내부정보관리규정": "/about/policy",
    "회사현황": "/about/company-status",
    "전국대리점": "/about/map",
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
    const rafId = React.useRef<number | null>(null);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

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

    // Close mobile menu on resize to lg, lock body scroll when open
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const handler = () => {
            if (mq.matches) setIsMobileMenuOpen(false);
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
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

    return (
        <>
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-12" ,
                scrolled ? "py-3 sm:py-4 bg-white/90 backdrop-blur-md shadow-sm" : "py-4 sm:py-5 md:py-6 bg-transparent"
            )}
        >
            <div className="container mx-auto flex items-center justify-between">
                {/* Left: Logo & Badge */}
                <Link href="/" className="flex items-center gap-3 group" aria-label="UBcare 홈">
                    <span className={cn("text-xl sm:text-2xl font-black tracking-tighter transition-colors text-[#0055FF]", scrolled ? "text-slate-900" : "text-white")}>
                        UB<span className="text-emerald-500">care</span>
                    </span>
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
                                                href={getSubLink(item.label, sub)}
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

                    {/* Mobile Menu Toggle — 44px min touch target */}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen((v) => !v)}
                        className={cn("lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 transition-colors touch-manipulation", scrolled || isMobileMenuOpen ? "text-slate-900" : "text-white/80 hover:text-white")}
                        aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
                    </button>
                </div>
            </div>
        </header>

        {/* Mobile menu overlay + panel */}
        {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="모바일 메뉴">
                {/* Backdrop */}
                <button
                    type="button"
                    onClick={closeMobileMenu}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    aria-label="메뉴 닫기"
                />
                {/* Panel: slide from right */}
                <div className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl flex flex-col overflow-y-auto">
                    <div className="p-6 pt-14 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-lg font-bold text-slate-900">메뉴</span>
                        <button
                            type="button"
                            onClick={closeMobileMenu}
                            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 touch-manipulation"
                            aria-label="메뉴 닫기"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <nav className="p-6 flex flex-col gap-1">
                        {navigation.map((item, idx) => (
                            <div key={idx} className="border-b border-slate-100 last:border-b-0">
                                <Link
                                    href={item.link}
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-between py-4 text-slate-700 font-medium hover:text-[#0055FF] transition-colors"
                                >
                                    {item.label}
                                    {item.subItems && item.subItems.length > 0 && (
                                        <ChevronDown size={18} className="text-slate-400 shrink-0" />
                                    )}
                                </Link>
                                {item.subItems && item.subItems.length > 0 && (
                                    <div className="pl-3 pb-3 flex flex-col gap-0.5">
                                        {item.subItems.map((sub, subIdx) => (
                                            <Link
                                                key={subIdx}
                                                href={getSubLink(item.label, sub)}
                                                onClick={closeMobileMenu}
                                                className="py-2.5 text-sm text-slate-500 hover:text-[#0055FF] transition-colors"
                                            >
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                    <div className="p-6 mt-auto border-t border-slate-100 flex flex-col gap-3">
                        {actions.map((action, idx) => {
                            if (action.type === "language") {
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        className="flex items-center gap-2 text-sm font-medium text-slate-600"
                                    >
                                        <Globe size={18} />
                                        {action.label}
                                    </button>
                                );
                            }
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    className={cn(
                                        "w-full py-3.5 rounded-full text-sm font-bold transition-all",
                                        action.style === "solid-blue"
                                            ? "bg-[#2563EB] text-white hover:bg-[#1d4ed8]"
                                            : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                                    )}
                                >
                                    {action.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        )}
        </>
    );
};
