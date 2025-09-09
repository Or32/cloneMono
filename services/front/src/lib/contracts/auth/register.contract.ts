import { z } from "zod";

export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
}).and(
  z.union([
    z.object({ inviteToken: z.string() }),
    z.object({ teamName: z.string().min(2) }),
  ])
);

export type RegisterRequestContract = z.infer<typeof RegisterRequestSchema>;

export const RegisterResponseSchema = z.object({
  success: z.boolean(),
  userId: z.string().uuid(),
  teamId: z.string().uuid(),
  role: z.enum(["owner", "member"]),
});

export type RegisterResponseContract = z.infer<typeof RegisterResponseSchema>;