"use client";

import { Megaphone, X } from "lucide-react";
import { useState } from "react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  const message =
    "EAS Hosting — try the first end-to-end deployment solution for universal app development.";

  return (
    <div className="sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-4 rounded-xl border bg-card shadow-card">
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="badge bg-[rgba(27,100,242,0.1)] text-[var(--primary)]">
              <Megaphone className="size-4" />
              EAS Hosting
            </span>
            <p className="text-sm text-muted-foreground">{message}</p>
            <div className="ml-auto">
              <button
                aria-label="Dismiss"
                onClick={() => setIsVisible(false)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
