import { z } from "zod";

export const UserMetaSchema = z.object({
  activeTeam: z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.coerce.date(), // stored as string (ISO date string)
  }),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    emailVerified: z.date().nullable(), // null or ISO date string
    image: z.url(),
  }),
});

export type UserMeta = z.infer<typeof UserMetaSchema>;

export const CliAuthPayloadSchema = z.object({
  token: z.string(),
  metadata: UserMetaSchema,
});

export type CliAuthPayload = z.infer<typeof CliAuthPayloadSchema>;