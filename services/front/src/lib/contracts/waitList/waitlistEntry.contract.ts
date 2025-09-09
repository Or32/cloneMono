import { z } from 'zod';

export const waitlistEntryRequestSchema = z.object({
    email: z.email("Invalid email address"),
});

export type WaitlistEntryRequest = z.infer<typeof waitlistEntryRequestSchema>;