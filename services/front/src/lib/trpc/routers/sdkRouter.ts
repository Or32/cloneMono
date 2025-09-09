import { getToken } from 'next-auth/jwt';
import { protectedProcedure, router } from '../trpc';
import { CliAuthPayloadSchema } from '@contxthub/contracts/Cli';

export const sdkRouter = router({
    // deploy: protectedProcedure
    //     .input(createDeploymentRequestRequestSchema)
    //     .mutation(async ({ ctx, input }) => {
    //         return SdkManager.deploy(ctx.session.user.id, input);
    //     }),
    getCLIPayload: protectedProcedure
        .output(CliAuthPayloadSchema)
        .query(async ({ ctx }) => {
            const secret = process.env.AUTH_SECRET!;
            const token = await getToken({ req: ctx.req, secret, raw: true });

            return {
                token: token,
                metadata: ctx.session
            };
        })
});
