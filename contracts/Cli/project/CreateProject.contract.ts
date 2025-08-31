import { z } from "zod";

// ✅ Request schema
export const CreateProjectRequestSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  team: z.string(),
});

export type CreateProjectRequest = z.infer<typeof CreateProjectRequestSchema>;

// ✅ Response schema
export const CreateProjectResponseSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
});

export type CreateProjectResponse = z.infer<typeof CreateProjectResponseSchema>;
