import { Download } from "lucide-react";
import { KeyValue } from "../components/KeyValue";
import { StepGroup } from "../types/stepTypes";
import { formatDateTime, formatDuration, msBetween, normalizeStatus } from "../utils/stepUtils";

export default function BuildArtifactCard({
  start,
  queuedAt,
  startedAt,
  finishedAt,
  availabilityDays,
  artifactUrl,
  groups,
}: {
  start?: string | Date | null;
  queuedAt?: string | Date | null;
  startedAt?: string | Date | null;
  finishedAt?: string | Date | null;
  availabilityDays?: number | null;
  artifactUrl?: string | null;
  groups: StepGroup[];
}) {
  const build = groups.find((g) => g.type === "build");
  const isBuildRunning = build?.isRunning ?? false;

  const waitTimeMs = msBetween(start, start); // explicit 0 – keep key visible
  const queueTimeMs = msBetween(queuedAt ?? start, startedAt ?? finishedAt ?? start);
  const buildTimeMs = isBuildRunning
    ? msBetween(build?.startedAt ?? startedAt ?? start, new Date())
    : msBetween(build?.startedAt ?? startedAt ?? start, build?.endedAt ?? finishedAt ?? start);
  const totalTimeMs = isBuildRunning
    ? msBetween(queuedAt ?? start, new Date())
    : msBetween(queuedAt ?? start, build?.endedAt ?? finishedAt ?? start);

  const buildStatus = build?.derivedStatus ?? "starting";

  return (
    <section className="bg-card border border-border rounded-lg">
      {/* Header */}
      <header className="flex items-center justify-between p-5">
        <div className="flex items-center gap-2 text-sm">
          {/* Example status icons if needed later:
          {buildStatus === "succeeded" ? (
            <CheckCircle2 className="h-4 w-4 text-primary" />
          ) : build?.isRunning ? (
            <CircleDashed className="h-4 w-4 text-accent animate-spin-slow" />
          ) : (
            <CircleDashed className="h-4 w-4 text-muted-foreground" />
          )} */}
          <span className="font-medium text-foreground">Build artifact</span>
          <span className="text-muted-foreground">IPA</span>
        </div>

        {artifactUrl && (
          <a
            href={artifactUrl}
            className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium 
                       bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download
          </a>
        )}
      </header>

      {/* Stats */}
      <div className="border-t border-border px-5 py-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
        <KeyValue variant="stacked" label="Status" value={normalizeStatus(buildStatus)} strong />
        <KeyValue variant="stacked" label="Start time" value={formatDateTime(start)} />
        <KeyValue variant="stacked" label="Wait time" value={formatDuration(waitTimeMs)} />
        <KeyValue variant="stacked" label="Queue time" value={formatDuration(queueTimeMs)} />
        <KeyValue variant="stacked" label="Build time" value={formatDuration(buildTimeMs)} />
        <KeyValue variant="stacked"label="Total time" value={formatDuration(totalTimeMs)} />
        <KeyValue
        variant="stacked"
          label="Availability"
          value={availabilityDays != null ? `${availabilityDays} days` : "—"}
        />
      </div>
    </section>
  );
}
