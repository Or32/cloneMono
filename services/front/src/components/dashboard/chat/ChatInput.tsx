"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!value.trim()) return;
        onSend(value);
        setValue("");
      }}
      className="flex gap-2 border-t p-2"
    >
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type a message..." />
      <Button type="submit">Send</Button>
    </form>
  );
}
