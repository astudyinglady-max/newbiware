"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, Briefcase, BarChart3, MessageCircle, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CHAT_TRIGGER_LINK = "#chat";

interface FloatingDockProps {
  items: Array<{ label: string; icon: string; link: string }>;
  chatTriggerLink?: string;
  onChatClick?: () => void;
  isChatOpen?: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  briefcase: Briefcase,
  "chart-bar": BarChart3,
  chat: MessageCircle,
};

const linkOrButtonClass =
  "relative group flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-colors";

function DockItems({
  items,
  chatTriggerLink,
  onChatClick,
  isChatOpen,
  onItemClick,
}: FloatingDockProps & { onItemClick?: () => void }) {
  return (
    <>
      {items.map((item, idx) => {
        const Icon = iconMap[item.icon] || Home;
        const isChatTrigger = chatTriggerLink && item.link === chatTriggerLink && onChatClick;
        const labelSpan = (
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black/80 text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
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
              onClick={() => {
                onChatClick?.();
                onItemClick?.();
              }}
              className={cn(linkOrButtonClass, "cursor-pointer")}
              aria-label={chatLabel}
            >
              <ChatIcon className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black/80 text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                {chatLabel}
              </span>
            </button>
          );
        }

        return (
          <Link
            key={idx}
            href={item.link}
            onClick={onItemClick}
            className={linkOrButtonClass}
            aria-label={item.label}
          >
            <Icon className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" />
            {labelSpan}
          </Link>
        );
      })}
    </>
  );
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  items,
  chatTriggerLink = CHAT_TRIGGER_LINK,
  onChatClick,
  isChatOpen = false,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 md:hidden flex justify-end">
        <AnimatePresence mode="wait">
          {!isMobileMenuOpen ? (
            <motion.button
              key="fab"
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-[74px] h-[74px] rounded-full glass border border-white/20 shadow-2xl flex items-center justify-center touch-manipulation shrink-0"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              aria-label="메뉴 열기"
            >
              <Menu className="w-8 h-8 text-primary" aria-hidden />
            </motion.button>
          ) : (
            <motion.div
              key="dock"
              className="flex items-center gap-2 px-4 py-3 rounded-full glass border border-white/20 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <DockItems
                items={items}
                chatTriggerLink={chatTriggerLink}
                onChatClick={onChatClick}
                isChatOpen={isChatOpen}
                onItemClick={closeMobileMenu}
              />
              <button
                type="button"
                onClick={closeMobileMenu}
                className={cn(linkOrButtonClass, "cursor-pointer")}
                aria-label="메뉴 닫기"
              >
                <X className="text-primary w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black/80 text-white text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                  메뉴 닫기
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <motion.div
          className="flex items-center gap-2 px-4 py-3 rounded-full glass border border-white/20 shadow-2xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <DockItems
            items={items}
            chatTriggerLink={chatTriggerLink}
            onChatClick={onChatClick}
            isChatOpen={isChatOpen}
          />
        </motion.div>
      </div>
    </>
  );
};
