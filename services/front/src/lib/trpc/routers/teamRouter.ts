import { protectedProcedure, router } from '../trpc';
import { teamsService } from '@/lib/utils/container';

export const teamRouter = router({
    getAll: protectedProcedure
        .query(async ({ ctx }) => {
            return await teamsService.getAllTeamByUser()
        })
});
