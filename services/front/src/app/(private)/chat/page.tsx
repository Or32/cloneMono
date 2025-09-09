"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { trpc } from "@/lib/trpc/client";
import { ChatMessages } from "@/components/dashboard/chat/ChatMessages";
import { ChatInput } from "@/components/dashboard/chat/ChatInput";

export function ChatWrapper() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const searchParams = useSearchParams();
  const mcpUrl = searchParams.get("mcp");

  const sendMessage = async (text: string) => {
    if (!mcpUrl) {
      setMessages((prev) => [...prev, { role: "assistant", text: "❌ No MCP URL provided." }]);
      return;
    }
    setMessages([...messages, { role: "user", text }]);
    const res = await trpc.chat.sendMessage.mutate({ mcpUrl, message: text });
    setMessages((prev) => [...prev, { role: "assistant", text: res.reply }]);
  };

  return (
    <div className="flex flex-col h-full border rounded-lg">
      <ChatMessages messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
