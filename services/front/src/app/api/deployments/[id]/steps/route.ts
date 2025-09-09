import { addDeploymentStepRequestRequestSchema, addDeploymentStepResponseSchema } from '@/lib/contracts/SDK/addDeplomentStep.contract';
import { createEndpoint } from '@/lib/utils/createEndpoint/createEndpoint';
import { DeploymentService } from '@/server/services/deployment.service';


export const POST = createEndpoint({
    protected: true,
    requestSchema: addDeploymentStepRequestRequestSchema,
    responseSchema: addDeploymentStepResponseSchema,
    async handler(req, ctx) {

        const step = await DeploymentService.addDeploymentStep(req);

        return step;
    },
});


