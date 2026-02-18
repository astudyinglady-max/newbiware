"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageLoading } from "@/components/ui/message-loading";

interface ChatBubbleProps {
  variant?: "sent" | "received";
  layout?: "default" | "ai";
  className?: string;
  children: React.ReactNode;
}

export function ChatBubble({
  variant = "received",
  layout = "default",
  className,
  children,
}: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 mb-4",
        variant === "sent" && "flex-row-reverse",
        className
      )}
    >
      {children}
    </div>
  );
}

interface ChatBubbleMessageProps {
  variant?: "sent" | "received";
  isLoading?: boolean;
  light?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function ChatBubbleMessage({
  variant = "received",
  isLoading,
  light = false,
  className,
  children,
}: ChatBubbleMessageProps) {
  return (
    <div
      className={cn(
        "rounded-xl px-4 py-3 max-w-[85%]",
        variant === "sent"
          ? "bg-primary-500 text-white"
          : light
            ? "bg-gray-100 text-gray-900 border border-gray-200"
            : "bg-white/10 text-white border border-white/10",
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <MessageLoading />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

interface ChatBubbleAvatarProps {
  src?: string;
  fallback?: string;
  light?: boolean;
  className?: string;
}

export function ChatBubbleAvatar({
  src,
  fallback = "AI",
  light = false,
  className,
}: ChatBubbleAvatarProps) {
  return (
    <Avatar
      className={cn(
        "h-8 w-8 shrink-0 rounded-full border",
        light ? "border-gray-200" : "border-white/10",
        className
      )}
    >
      {src && <AvatarImage src={src} />}
      <AvatarFallback
        className={cn(
          "text-xs",
          light ? "bg-gray-200 text-gray-700" : "bg-primary-900/80 text-white"
        )}
      >
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
}

interface ChatBubbleActionProps {
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ChatBubbleAction({
  icon,
  onClick,
  className,
}: ChatBubbleActionProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-6 w-6 text-white/80 hover:text-white", className)}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}

export function ChatBubbleActionWrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-center gap-1 mt-2", className)}>
      {children}
    </div>
  );
}
