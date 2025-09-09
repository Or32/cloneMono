import { execSync } from "child_process";

function run(cmd: string, fallback = "N/A"): string {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return fallback;
  }
}

interface GitInfo {
  commit: string;
  message: string;
}

export const getGitInfo = (): GitInfo => ({
  commit: run("git rev-parse HEAD"),
  message: run("git log -1 --pretty=%B"),
});
