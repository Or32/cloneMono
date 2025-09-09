import { CreateTeamRequestSchema, CreateTeamResponseSchema } from '@/lib/contracts/auth/createTeam.contract';
import { teamManager, userService } from '@/lib/utils/container';
import { Session } from 'next-auth';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const authRouter = router({
  me: protectedProcedure
    .query(({ ctx }) => {
      return ctx.session as Session;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return { id: input.id, name: 'User ' + input.id };
    }),

  getUserTeams:
    protectedProcedure
      .query(async ({ ctx }) => {
        return await userService.getUserTeams(ctx.session.user.id);
      }),

  createTeam: protectedProcedure
    .input(CreateTeamRequestSchema)
    .output(CreateTeamResponseSchema)
    .mutation(async ({ ctx, input }) => {

      console.log("creating team")
      return await teamManager.createTeamForUser(input);

    })

});
