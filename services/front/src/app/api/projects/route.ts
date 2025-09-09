
import { CreateProjectRequestSchema, CreateProjectResponseSchema } from '@contxthub/contracts/Cli';
import { sdkManager } from '@/lib/utils/container';
import { createEndpoint } from '@/lib/utils/createEndpoint/createEndpoint';

export const POST = createEndpoint({
    protected: true,
    requestSchema: CreateProjectRequestSchema,
    responseSchema: CreateProjectResponseSchema,
    async handler(req, ctx) {
        const deployment = await sdkManager.createProject(req)

        return deployment;
    },
});