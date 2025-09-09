import { execSync } from "child_process";

export async function InstallDependencies(targetDir: string): Promise<void> {
  console.log("📦 Installing dependencies...");
  try {
    execSync("npm install", { cwd: targetDir, stdio: "inherit" });
  } catch (error) {
    console.error("❌ Failed to install dependencies:", (error as Error).message);
    process.exit(1);
  }
}
