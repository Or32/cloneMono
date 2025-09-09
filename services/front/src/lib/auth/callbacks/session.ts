import { Team } from "@/lib/db";
import { userService } from "@/lib/utils/container";
import type { NextAuthConfig, Session } from "next-auth";

export type SessionCallback = NonNullable<NextAuthConfig["callbacks"]>["session"];

export const session: SessionCallback = async ({ session, token }) => {
  token
  return buildSessionFromToken(token.activeTeam , token.sub, token.exp );
}

export async function buildSessionFromToken( activeTeam: Team , tokenSub?: string, tokenExp?: number): Promise<Session> {
  if (!tokenSub) {
    throw new Error("No sub in JWT — cannot build session");
  }

  const user = await userService.getUser(tokenSub);
  if (!user) {
    throw new Error(`User not found for sub ${tokenSub}`);
  }

  return {
    user,
    activeTeam: activeTeam,
    expires: tokenExp
      ? new Date(tokenExp * 1000).toISOString()
      : new Date(Date.now() + 1000 * 60 * 60).toISOString(), // fallback: 1h
  };
}