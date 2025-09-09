"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { useState } from "react";

export function TokenModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data, isLoading } = trpc.sdk.getCLIPayload.useQuery();
  const [copied, setCopied] = useState(false);

  const handleRevealAndCopy = async () => {
    if (!data?.token) return;
    await navigator.clipboard.writeText(data.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>CLI Authentication Token</DialogTitle>
          <DialogDescription>
            Use this token to authenticate your CLI. Keep it private.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="bg-gray-100 rounded p-3 text-sm font-mono text-gray-800 text-center select-none">
            {"••••••••••••••••••••"}
          </div>

          <Button onClick={handleRevealAndCopy} disabled={isLoading || copied} className="w-full">
            {copied ? "Copied!" : "Copy Token"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
