import { appRouter } from '@/lib/trpc/router';
import { createContext } from '@/lib/trpc/context';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { RequestContext } from '@/lib/context/requestContext';
import { auth } from '@/lib/auth/auth.config';

export const handler = async (req: Request) => {
  const session = await auth();

  if (!session?.user?.id || !session?.activeTeam?.id) {
    throw new Error("User must belong to a team");
  }

  return RequestContext.run(
    { userId: session.user.id, teamId: session.activeTeam.id },
    () =>
      fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext,
      })
  );
};

export { handler as GET, handler as POST };
