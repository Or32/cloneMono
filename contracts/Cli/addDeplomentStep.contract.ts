import z from "zod";

export const deploymentStepTypeValues = [
    "build",
    "deploy",
    "validate",
    "cleanup",
] as const;

export const deploymentStepStatusValues = [
    "warning",
    "starting",
    "succeeded",
    "failed",
] as const;

export const addDeploymentStepRequestRequestSchema = z.object({
    deploymentId: z.number(),
    stepType: z.enum(deploymentStepTypeValues),
    status: z.enum(deploymentStepStatusValues),
    log: z.string().optional(),
    startedAt: z.date()
});

export type AddDeploymentStepRequest = z.infer<typeof addDeploymentStepRequestRequestSchema>;

export const addDeploymentStepResponseSchema = z.object({
});

export type AddDeploymentStepResponse = z.infer<typeof addDeploymentStepResponseSchema>;