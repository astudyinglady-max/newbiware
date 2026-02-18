"use client";

import * as React from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAutoScroll } from "@/components/hooks/use-auto-scroll";
import { cn } from "@/lib/utils";

interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  smooth?: boolean;
  light?: boolean;
}

const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({ className, children, smooth = false, light = false, ...props }, _ref) => {
    const {
      scrollRef,
      isAtBottom,
      scrollToBottom,
      disableAutoScroll,
    } = useAutoScroll({
      smooth,
      content: children,
    });

    return (
      <div className="relative w-full h-full">
        <div
          className={cn(
            "flex flex-col w-full h-full p-4 overflow-y-auto gap-4",
            className
          )}
          ref={scrollRef}
          onWheel={disableAutoScroll}
          onTouchMove={disableAutoScroll}
          {...props}
        >
          <div className="flex flex-col gap-4">{children}</div>
        </div>

        {!isAtBottom && (
          <Button
            onClick={() => scrollToBottom()}
            size="icon"
            variant="outline"
            className={cn(
              "absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full",
              light
                ? "border-gray-200 bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                : "border-white/20 bg-primary-950/90 text-white hover:bg-white/10"
            )}
            aria-label="맨 아래로"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }
);

ChatMessageList.displayName = "ChatMessageList";

export { ChatMessageList };
