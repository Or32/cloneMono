import { z } from "zod";

export const CreateTeamRequestSchema = z.object({
  teamName: z.string().min(2),   // at least 2 characters
});

export type CreateTeamRequestContract = z.infer<typeof CreateTeamRequestSchema>;

// Response schema
export const CreateTeamResponseSchema = z.object({
  success: z.boolean(),
  teamId: z.string().uuid(),
  role: z.literal("owner"),
});

export type CreateTeamResponseContract = z.infer<typeof CreateTeamResponseSchema>;
