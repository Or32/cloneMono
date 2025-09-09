export default function CardStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg p-4 bg-secondary border border-border">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold mt-0.5 text-foreground">{value}</div>
    </div>
  );
}
