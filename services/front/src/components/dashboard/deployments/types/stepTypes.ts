import { DeploymentStepStatusEnum, deploymentStepTypeEnum } from "@/lib/db";

export type RawStep = {
  id?: string | number;
  stepType?: string | null;
  status?: string | null;
  startedAt?: string | Date | null;
  title?: string | null;
  name?: string | null;
  logUrl?: string | null;
};


export type StepGroup = {
  type: deploymentStepTypeEnum;
  derivedStatus: DeploymentStepStatusEnum;
  startedAt: Date | null;
  endedAt: Date | null; // last transition time or now if running
  log: string;
};
