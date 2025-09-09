import { sdkManager } from '@/lib/utils/container';
import { createEndpoint } from '@/lib/utils/createEndpoint/createEndpoint';
import { createDeploymentRequestRequestSchema, createDeploymentResponseSchema } from '@contxthub/contracts';

export const POST = createEndpoint({
    protected: true,
    requestSchema: createDeploymentRequestRequestSchema,
    responseSchema: createDeploymentResponseSchema,
    async handler(req, ctx) {
        console.log("got deployment : ", req)
        const deployment = await sdkManager.deploy(ctx.session.user.id , req)

        return deployment;
    },
});