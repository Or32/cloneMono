import { db } from '@/lib/db';
import { auth } from '../auth/auth.config';
import { RequestContext } from '../context/requestContext';

export async function createContext({ req }: { req: Request }) {
const session = await auth();
  const store = RequestContext.get();

  if (session?.user) {
    store.userId = session.user.id;
    store.teamId = session.activeTeam.id;
  }

    return { session, db, req };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

export type ProtectedContext = Context & {
  session: NonNullable<Context["session"]> & {
    user: {
      id: string;
    };
    activeTeam: {
      id: string;
    };
  };
};