import { getRequiredEnv, SYSTEM_ENVS } from "@/lib/utils/env";
import GitHubProvider from "next-auth/providers/github";

export const githubProvider = GitHubProvider({
      clientId: getRequiredEnv(SYSTEM_ENVS.GITHUB_CLIENT_ID),
      clientSecret: getRequiredEnv(SYSTEM_ENVS.GITHUB_CLIENT_SECRET)
    });

