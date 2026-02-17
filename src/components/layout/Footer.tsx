"use client";

import React from "react";
import Link from "next/link";

interface FooterProps {
    brandTextBig: string;
    copyright: string;
    columns: Array<{
        title: string;
        links: Array<{ label: string; link: string }>;
    }>;
}

export const Footer: React.FC<FooterProps> = ({ brandTextBig, copyright, columns }) => {
    return (
        <footer className="relative bg-primary-950 text-white pt-24 pb-12 overflow-hidden">
            {/* Big Brand Text Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 flex items-center justify-center overflow-hidden">
                <span className="text-[20vw] font-black tracking-tighter leading-none whitespace-nowrap select-none">
                    {brandTextBig}
                </span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1">
                        <h2 className="text-2xl font-bold mb-6">{brandTextBig}</h2>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Part of GC Family.<br />
                            Leading Digital Healthcare Platform.
                        </p>
                    </div>

                    {/* Links Columns */}
                    {columns.map((col, idx) => (
                        <div key={idx} className="col-span-1">
                            <h3 className="text-3xl font-semibold mb-6 text-primary-100">{col.title}</h3>
                            <ul className="space-y-4">
                                {col.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link
                                            href={link.link}
                                            className="text-white/60 hover:text-white transition-colors text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/40 text-sm">{copyright}</p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-white/40 hover:text-white text-sm">Privacy Policy</Link>
                        <Link href="#" className="text-white/40 hover:text-white text-sm">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
