import z from "zod";

export const createDeploymentRequestRequestSchema = z.object({
  file: z.instanceof(File),
  projectId: z.string().min(1),
  deploymentName: z.string().min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, {
    message: "Version must follow x.x.x format",
  }),
  gitCommit: z.string().min(1),
  gitMessage: z.string().min(1),

  createdBy:z.string().min(1),
});

export type CreateDeploymentRequest = z.infer<typeof createDeploymentRequestRequestSchema>;

export const createDeploymentResponseSchema = z.object({
  deploymentId: z.string()
});

export type CreateDeploymentResponse = z.infer<typeof createDeploymentResponseSchema>;