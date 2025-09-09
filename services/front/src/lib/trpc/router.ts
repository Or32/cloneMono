import { deploymentRouter } from "@/lib/trpc/routers/deploymentRouter";
import { waitlistRouter } from "@/lib/trpc/routers/waitlistRouter";
import { sdkRouter } from './routers/sdkRouter';
import { authRouter } from './routers/authRouter';
import { router } from "./trpc";
import { teamRouter } from "./routers/teamRouter";
import { chatRouter } from "./routers/chatRouter";

export const appRouter = router({
    auth: authRouter,
    waitlist: waitlistRouter,
    deployment: deploymentRouter,
    sdk: sdkRouter,
    teams: teamRouter,
    chat: chatRouter
});

export type AppRouter = typeof appRouter;
