export const deploymentStepTypeValues = [
  "build",
  "deploy",
  "validate",
  "cleanup",
] as const;

export type deploymentStepTypeEnum = typeof deploymentStepTypeValues[number];