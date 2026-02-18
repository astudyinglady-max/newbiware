"use client";

import { ChatProvider, useChat } from "@/context/ChatContext";
import { FloatingDock } from "@/components/layout/FloatingDock";
import { Chatbot } from "@/components/layout/Chatbot";

interface DockAndChatProps {
  items: Array<{ label: string; icon: string; link: string }>;
}

function DockWithChatTrigger({ items }: DockAndChatProps) {
  const { toggle, isOpen } = useChat();
  return (
    <FloatingDock
      items={items}
      chatTriggerLink="#chat"
      onChatClick={toggle}
      isChatOpen={isOpen}
    />
  );
}

export function DockAndChat({ items }: DockAndChatProps) {
  return (
    <ChatProvider>
      <DockWithChatTrigger items={items} />
      <Chatbot />
    </ChatProvider>
  );
}
