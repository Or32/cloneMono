import { teamsService, userService } from "@/lib/utils/container";
import type { NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";

export type JWTCallback = NonNullable<NextAuthConfig["callbacks"]>["jwt"];

export const jwt: JWTCallback = async ({ token, trigger, session }): Promise<JWT> => {
  // Attach user object once (persisted in token)
  if (!token.user) {
    token.user = await userService.getUser(token.sub!);
  }

  // Default active team if missing
  if (!token.activeTeam) {
    const [firstTeam] = await userService.getUserTeams(token.sub!);
    token.activeTeam = firstTeam;
  }

  // Allow update via client call
  if (trigger === "update" && session?.activeTeam) {
    const team = await teamsService.getTeam(session.activeTeam);
    token.activeTeam = team;
  }

  return token;
};
