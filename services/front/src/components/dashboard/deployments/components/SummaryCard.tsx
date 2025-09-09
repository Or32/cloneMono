import { KeyValue } from "./KeyValue";

export default function SummaryCard({
  name,
  description,
  version,
  commit,
  createdBy,
}: {
  name: string;
  description?: string | null;
  version?: string | null;
  projectId?: string | null;
  commit?: string | null;
  createdBy?: string | null;
}) {
  return (
    <section className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-start justify-between p-5">
        <div>
          <h1 className="text-xl font-semibold text-foreground">{name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {description || "No description"}
          </p>
        </div>
      </div>

      {/* Info grid */}
      <div className="border-t border-border px-5 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
        <KeyValue label="Version" value={version ?? "—"} />
        <KeyValue label="Commit" value={commit ?? "—"} mono />
        <KeyValue label="Created by" value={createdBy ?? "—"} />
      </div>
    </section>
  );
}
