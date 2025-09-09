

import { z } from "zod";
import { protectedProcedure, router } from '../trpc';
import { FullDeployment } from "@/types/deployment/fullDeployment";
import { deploymentService } from "@/lib/utils/container";
import { createDeploymentRequestRequestSchema, addDeploymentStepRequestRequestSchema } from "@contxthub/contracts";

export const deploymentRouter = router({
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      return deploymentService.getTeamDeployments();
    }),

  create: protectedProcedure
    .input(createDeploymentRequestRequestSchema)
    .mutation(async ({ input, ctx }) => {
      return deploymentService.createDeployment(input);
    }),

  createStep: protectedProcedure
    .input(addDeploymentStepRequestRequestSchema)
    .mutation(async ({ input}) => {
      return deploymentService.addDeploymentStep(input);
    }),

  getFullDeployment: protectedProcedure
    .input(z.object({ deploymentId: z.string() }))
    // .output(fullDeploymentSchema)
    .query(async ({ input, ctx }): Promise<FullDeployment> => {
      return deploymentService.getFullDeployment(input.deploymentId);
    }),
});
