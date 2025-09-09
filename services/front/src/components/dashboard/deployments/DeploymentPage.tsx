"use client";

import Loader from "@/components/ui/Loader";
import { trpc } from "@/lib/trpc/client";
import SummaryCard from "./components/SummaryCard";
import GroupedStepsList from "./sections/GroupedStepsList";
import { StepGroup } from "./types/stepTypes";
import { toStepGroups } from "./utils/stepUtils";

export default function DeploymentDetailsClient({ deploymentId }: { deploymentId: string }) {
  const { data, isLoading } = trpc.deployment.getFullDeployment.useQuery({ deploymentId });

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center">
        <Loader />
      </div>
    );
  }

  if (!data) {
    return <div className="p-6 text-sm text-muted-foreground">Deployment not found.</div>;
  }

  const groups: StepGroup[] = toStepGroups(data.steps);

  return (
    <div className="p-6 space-y-6 bg-background text-foreground">
      <SummaryCard
        name={data.name ?? "Untitled deployment"}
        description={data.gitMessage}
        version={data.version}

        commit={data.gitCommit}
        createdBy={data.createdBy}
      />

      <GroupedStepsList groups={groups} />
    </div>
  );
}
