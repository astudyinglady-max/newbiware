"use client";

import React from "react";
import Link from "next/link";
import { Home, Briefcase, BarChart3, MessageCircle, X } from "lucide-react"; // Map icons manually or dynamically
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CHAT_TRIGGER_LINK = "#chat";

interface FloatingDockProps {
    items: Array<{ label: string; icon: string; link: string }>;
    /** 링크가 이 값인 아이템은 클릭 시 페이지 이동 대신 챗봇을 연다 */
    chatTriggerLink?: string;
    /** 챗봇 트리거 아이템 클릭 시 호출 */
    onChatClick?: () => void;
    /** 챗봇 열림 상태 (true면 트리거 아이콘을 X로 표시) */
    isChatOpen?: boolean;
}

const iconMap: Record<string, any> = {
    home: Home,
    briefcase: Briefcase,
    "chart-bar": BarChart3,
    chat: MessageCircle,
};

export const FloatingDock: React.FC<FloatingDockProps> = ({
    items,
    chatTriggerLink = CHAT_TRIGGER_LINK,
    onChatClick,
    isChatOpen = false,
}) => {
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
                    const isChatTrigger =
                        chatTriggerLink && item.link === chatTriggerLink && onChatClick;

                    const linkOrButtonClass =
                        "relative group flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-colors";
                    const labelSpan = (
                        <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-black/80 text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap">
                            {item.label}
                        </span>
                    );

                    if (isChatTrigger) {
                        const ChatIcon = isChatOpen ? X : Icon;
                        const chatLabel = isChatOpen ? "챗봇 닫기" : item.label;
                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={onChatClick}
                                className={cn(linkOrButtonClass, "cursor-pointer")}
                                aria-label={chatLabel}
                            >
                                <ChatIcon className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-black/80 text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                    {chatLabel}
                                </span>
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={idx}
                            href={item.link}
                            className={linkOrButtonClass}
                            aria-label={item.label}
                        >
                            <Icon className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" />
                            {labelSpan}
                        </Link>
                    );
                })}
            </motion.div>
        </div>
    );
};
