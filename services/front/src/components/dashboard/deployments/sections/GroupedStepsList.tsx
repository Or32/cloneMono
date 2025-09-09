import { ChevronDown, Clock3 } from "lucide-react";
import { TerminalLog } from "../components/TerminalLog";
import { StepGroup } from "../types/stepTypes";
import { formatDuration, msBetween } from "../utils/stepUtils";
import { DeploymentStepStatusIcon } from "../components/DeploymentStepStatusIcon";

export default function GroupedStepsList({ groups }: { groups: StepGroup[] }) {
  if (!groups.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-5 text-sm text-muted-foreground">
        No steps.
      </div>
    );
  }

  return (
    <section className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-2 p-5 border-b border-border">
        <Clock3 className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-foreground">Step History</h3>
      </header>

      {/* Step groups */}
      <div className="divide-y divide-border">
        {groups.map((g) => {
          const label = g.type.charAt(0).toUpperCase() + g.type.slice(1);
          const duration = msBetween(g.startedAt, g.endedAt);

          return (
            <details key={g.type} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3 hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <DeploymentStepStatusIcon status={g.derivedStatus} />
                  <span className="text-sm text-foreground">{label}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">
                    {formatDuration(duration)}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </div>
              </summary>

              <TerminalLog log={g.log} />
            </details>
          );
        })}
      </div>
    </section>
  );
}
