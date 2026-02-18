"use client";

import { useState, FormEvent } from "react";
import { MessageCircle, Paperclip, Mic, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { useChat } from "@/context/ChatContext";

const INITIAL_MESSAGES = [
  {
    id: 1,
    content: "안녕하세요. UBcare 챗봇입니다. 무엇을 도와드릴까요?",
    sender: "ai",
  },
];

export function Chatbot() {
  const { isOpen, close } = useChat();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: "user",
      },
    ]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content:
            "문의해 주셔서 감사합니다. 담당자가 확인 후 연락드리겠습니다.",
          sender: "ai",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleAttachFile = () => {
    // TODO: 파일 첨부
  };

  const handleMicrophoneClick = () => {
    // TODO: 음성 입력
  };

  const isLight = true;

  return (
    <ExpandableChat
      size="lg"
      position="bottom-center"
      icon={<MessageCircle className="h-6 w-6" />}
      open={isOpen}
      onOpenChange={(open) => !open && close()}
      showToggle={false}
      light={isLight}
    >
      <ExpandableChatHeader
        light={isLight}
        className="flex flex-col items-center text-center gap-1"
      >
        <h2 className={isLight ? "text-lg font-semibold text-gray-900" : "text-lg font-semibold text-white"}>
          UBcare 챗봇
        </h2>
        <p className={isLight ? "text-sm text-gray-600" : "text-sm text-white/70"}>
          궁금한 점을 남겨주시면 안내해 드립니다.
        </p>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList light={isLight}>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                light={isLight}
                className="h-8 w-8 shrink-0"
                fallback={message.sender === "user" ? "나" : "AI"}
              />
              <ChatBubbleMessage
                light={isLight}
                variant={message.sender === "user" ? "sent" : "received"}
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar light={isLight} className="h-8 w-8 shrink-0" fallback="AI" />
              <ChatBubbleMessage light={isLight} isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter light={isLight}>
        <form
          onSubmit={handleSubmit}
          className={
            isLight
              ? "relative rounded-xl border border-gray-200 bg-white focus-within:ring-1 focus-within:ring-primary-500 focus-within:ring-offset-1 p-2"
              : "relative rounded-xl border border-white/10 bg-primary-950/50 focus-within:ring-1 focus-within:ring-primary-500 focus-within:ring-offset-1 focus-within:ring-offset-primary-950 p-2"
          }
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            light={isLight}
            className="min-h-12 resize-none rounded-lg border-0 bg-transparent p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center justify-between gap-2 px-1 pb-1">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleAttachFile}
                className={isLight ? "text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg" : "text-white/70 hover:text-white hover:bg-white/10 rounded-lg"}
              >
                <Paperclip className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleMicrophoneClick}
                className={isLight ? "text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg" : "text-white/70 hover:text-white hover:bg-white/10 rounded-lg"}
              >
                <Mic className="size-4" />
              </Button>
            </div>
            <Button
              type="submit"
              size="sm"
              className="ml-auto gap-1.5 bg-primary-500 hover:bg-primary-500/90 text-white rounded-lg"
            >
              전송
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
