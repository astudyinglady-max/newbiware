"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  light?: boolean;
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, light = false, ...props }, ref) => (
    <Textarea
      autoComplete="off"
      ref={ref}
      name="message"
      className={cn(
        "max-h-32 min-h-12 px-4 py-3 text-sm resize-none",
        light
          ? "bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:ring-primary-500 border-0"
          : "bg-primary-950/80 text-white placeholder:text-white/50 focus-visible:ring-primary-500 border-white/10",
        className
      )}
      {...props}
    />
  )
);
ChatInput.displayName = "ChatInput";

export { ChatInput };
