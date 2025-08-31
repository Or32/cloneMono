import { z } from 'zod';

const CHECKSUM_LENGTH = 6

export const liveDebugRequestSchema = z.object({
    authentication: z.string(),
    tunnelAddress: z.url(),
    checksum: z.string().length(CHECKSUM_LENGTH)
});

export type LiveDebugRequest = z.infer<typeof liveDebugRequestSchema>;