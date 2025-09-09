import React from "react";

export function TerminalLog({ log }: { log: string }) {
  const lines = log.split("\n");

  return (
    <div
      className="
        bg-muted text-foreground
        px-5 pt-4 pb-4 text-xs font-mono grid gap-1
        whitespace-pre-wrap overflow-x-auto
      "
    >
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="w-8 pr-3 text-right text-muted-foreground select-none">
            {i + 1}
          </span>
          <span className="flex-1">{line}</span>
        </div>
      ))}
    </div>
  );
}
