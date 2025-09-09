import clsx from "clsx";

interface KeyValueProps {
  label: string;
  value: string;
  mono?: boolean;   // monospace value (from old Key)
  strong?: boolean; // bold/primary value (from old KV)
  variant?: "inline" | "stacked"; // layout style
}

export function KeyValue({
  label,
  value,
  mono,
  strong,
  variant = "inline",
}: KeyValueProps) {
  if (variant === "inline") {
    return (
      <div
        className={clsx(
          "flex items-center justify-between rounded-md border p-3",
          "bg-muted text-foreground border-border"
        )}
      >
        <span className="text-muted-foreground">{label}</span>
        <span
          className={clsx(
            "text-muted-foreground",
            mono && "font-mono text-foreground"
          )}
        >
          {value}
        </span>
      </div>
    );
  }

  // stacked variant
  return (
    <div
      className={clsx(
        "rounded-lg border px-3 py-2",
        "bg-muted text-foreground border-border"
      )}
    >
      <div className="text-xs text-muted-foreground">{label}</div>
      <div
        className={clsx(
          "mt-0.5 text-muted-foreground",
          strong && "font-semibold text-foreground"
        )}
      >
        {value}
      </div>
    </div>
  );
}
