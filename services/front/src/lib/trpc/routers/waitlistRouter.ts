import {waitlistEntryRequestSchema} from '@/lib/contracts/waitList/waitlistEntry.contract'
import { joinWaitlist } from '@/server/services/waitlist.service';
import {TRPCError} from "@trpc/server";
import { publicProcedure, router } from '../trpc';

export const waitlistRouter = router({
    joinWaitlist: publicProcedure
        .input(waitlistEntryRequestSchema)
        .mutation(async ({ input }) => {
            const {success} = await joinWaitlist(input);

            if (!success) {
                throw new TRPCError({code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong, please try again.'});
            }
        }),
});
