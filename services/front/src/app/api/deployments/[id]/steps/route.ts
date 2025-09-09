import { deploymentService } from '@/lib/utils/container';
import { createEndpoint } from '@/lib/utils/createEndpoint/createEndpoint';
import { addDeploymentStepRequestRequestSchema, addDeploymentStepResponseSchema } from '@contxthub/contracts';


export const POST = createEndpoint({
    protected: true,
    requestSchema: addDeploymentStepRequestRequestSchema,
    responseSchema: addDeploymentStepResponseSchema,
    async handler(req, ctx) {

        const step = await deploymentService.addDeploymentStep(req);

        return step;
    },
});


