import { buildSessionFromToken } from "@/lib/auth/callbacks/session";
import { db } from "@/lib/db";
import { Context, ProtectedContext } from "@/lib/trpc/context";
import { AuthError } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const secret = process.env.AUTH_SECRET!;

export async function getAuthenticatedContext(request: NextRequest): Promise<ProtectedContext> {
  const token = await getToken({ req: request, secret });

  if (!token) {
    throw new AuthError("Unauthorized: Missing or invalid token");
  }

  const builtSession = await buildSessionFromToken(token.activeTeam, token.sub, token.exp);

  return {
    session: builtSession,
    db,
    req: request
  };
}

