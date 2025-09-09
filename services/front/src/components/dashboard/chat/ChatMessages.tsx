import { cn } from "@/lib/utils/cn";

export function ChatMessages({ messages }: { messages: { role: "user" | "assistant"; text: string }[] }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((m, i) => (
        <div
          key={i}
          className={cn(
            "rounded-lg px-3 py-2 max-w-[80%]",
            m.role === "user" ? "bg-primary text-primary-foreground self-end ml-auto" : "bg-muted"
          )}
        >
          {m.text}
        </div>
      ))}
    </div>
  );
}
