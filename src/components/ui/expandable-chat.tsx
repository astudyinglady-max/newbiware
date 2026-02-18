"use client";

import React, { useRef, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type ChatPosition = "bottom-right" | "bottom-left" | "bottom-center";
export type ChatSize = "sm" | "md" | "lg" | "xl" | "full";

const chatConfig = {
  dimensions: {
    sm: "sm:max-w-sm sm:max-h-[500px]",
    md: "sm:max-w-md sm:max-h-[600px]",
    lg: "sm:max-w-lg sm:max-h-[700px]",
    xl: "sm:max-w-xl sm:max-h-[800px]",
    full: "sm:w-full sm:h-full",
  },
  positions: {
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
    "bottom-center": "bottom-8 left-1/2 -translate-x-1/2",
  },
  chatPositions: {
    "bottom-right": "sm:absolute sm:bottom-[calc(100%+10px)] sm:right-0",
    "bottom-left": "sm:absolute sm:bottom-[calc(100%+10px)] sm:left-0",
    /* 래퍼 무관, viewport 기준 fixed로 플로팅 독(bottom-8+높이) 위에 배치 */
    "bottom-center":
      "sm:fixed sm:bottom-24 sm:left-1/2 sm:-translate-x-1/2",
  },
  states: {
    open: "pointer-events-auto opacity-100 visible scale-100 translate-y-0",
    closed:
      "pointer-events-none opacity-0 invisible scale-100 sm:translate-y-5",
  },
};

interface ExpandableChatProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: ChatPosition;
  size?: ChatSize;
  icon?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** false면 챗봇창 밑 FAB(열기/닫기 버튼) 미표시 */
  showToggle?: boolean;
  /** true면 배경 흰색(라이트 테마) */
  light?: boolean;
}

const ExpandableChat: React.FC<ExpandableChatProps> = ({
  className,
  position = "bottom-right",
  size = "md",
  icon,
  open: controlledOpen,
  onOpenChange,
  showToggle = true,
  light = false,
  children,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const toggleChat = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const chatRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = () => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  };

  return (
    <div
      className={cn(
        `fixed ${chatConfig.positions[position]} z-100`,
        className
      )}
      {...props}
    >
      {isOpen && (
        <div
          className="fixed inset-0 -z-10 bg-black/20 sm:bg-black/30"
          onClick={handleBackdropClick}
          onKeyDown={(e) => e.key === "Escape" && handleBackdropClick()}
          role="button"
          tabIndex={-1}
          aria-label="챗봇 닫기 (바깥 영역 클릭)"
        />
      )}
      <div
        ref={chatRef}
        className={cn(
          "flex flex-col rounded-xl shadow-2xl overflow-hidden transition-all duration-250 ease-out w-full h-full sm:w-[90vw] sm:max-w-lg sm:h-[80vh]",
          position === "bottom-center"
            ? "fixed inset-0 sm:inset-auto"
            : "fixed inset-0 sm:absolute sm:inset-auto",
          light
            ? "bg-white border border-gray-200"
            : "bg-primary-950 border border-white/10",
          chatConfig.chatPositions[position],
          chatConfig.dimensions[size],
          isOpen ? chatConfig.states.open : chatConfig.states.closed
        )}
      >
        {children}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-3 right-3 sm:hidden rounded-full",
            light
              ? "text-gray-700 hover:bg-gray-100"
              : "text-white hover:bg-white/10"
          )}
          onClick={toggleChat}
          aria-label="챗봇 닫기"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      {showToggle && (
        <ExpandableChatToggle
          icon={icon}
          isOpen={isOpen}
          toggleChat={toggleChat}
        />
      )}
    </div>
  );
};

ExpandableChat.displayName = "ExpandableChat";

interface ExpandableChatHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  light?: boolean;
}

const ExpandableChatHeader: React.FC<ExpandableChatHeaderProps> = ({
  className,
  light = false,
  ...props
}) => (
  <div
    className={cn(
      "flex items-center justify-between p-4 border-b",
      light ? "border-gray-200" : "border-white/10",
      className
    )}
    {...props}
  />
);

ExpandableChatHeader.displayName = "ExpandableChatHeader";

const ExpandableChatBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={cn("grow overflow-y-auto min-h-0", className)} {...props} />
);

ExpandableChatBody.displayName = "ExpandableChatBody";

interface ExpandableChatFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  light?: boolean;
}

const ExpandableChatFooter: React.FC<ExpandableChatFooterProps> = ({
  className,
  light = false,
  ...props
}) => (
  <div
    className={cn(
      "border-t p-4",
      light ? "border-gray-200 bg-gray-50" : "border-white/10 bg-primary-950/50",
      className
    )}
    {...props}
  />
);

ExpandableChatFooter.displayName = "ExpandableChatFooter";

interface ExpandableChatToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  isOpen: boolean;
  toggleChat: () => void;
}

const ExpandableChatToggle: React.FC<ExpandableChatToggleProps> = ({
  className,
  icon,
  isOpen,
  toggleChat,
  ...props
}) => (
  <Button
    variant="default"
    onClick={toggleChat}
    className={cn(
      "w-14 h-14 rounded-full shadow-lg flex items-center justify-center bg-primary-500 hover:bg-primary-500/90 text-white border-0 hover:shadow-xl transition-all duration-300",
      className
    )}
    aria-label={isOpen ? "챗봇 닫기" : "챗봇 열기"}
    {...props}
  >
    {isOpen ? (
      <X className="h-6 w-6" />
    ) : (
      icon || <MessageCircle className="h-6 w-6" />
    )}
  </Button>
);

ExpandableChatToggle.displayName = "ExpandableChatToggle";

export {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
};
