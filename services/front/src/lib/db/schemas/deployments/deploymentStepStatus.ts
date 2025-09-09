export const deploymentStepStatusValues = [
  "warning",
  "starting",
  "succeeded",
  "failed",
] as const;

export type DeploymentStepStatusEnum = typeof deploymentStepStatusValues[number];