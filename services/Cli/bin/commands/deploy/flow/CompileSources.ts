import util from "util";
import { exec } from "child_process";
import { DeployPaths } from "../utils/paths.js";
import path from "path";
import fs from "fs";

const execAsync = util.promisify(exec);

export async function CompileSources(paths: DeployPaths): Promise<void> {
  const tsConfig = paths.userProjectPath.tsConfigFile;
  const outDir = paths.userProjectPath.buildOutputDir;

  // Prefer local tsc over npx
  const localTsc = path.resolve(process.cwd(), "node_modules/.bin/tsc");
  const tscCmd = fs.existsSync(localTsc) ? `"${localTsc}"` : "npx tsc";
  console.log("📦 Compiling TypeScript...");

  try {
    const { stdout, stderr } = await execAsync(
      `${tscCmd} --project "${tsConfig}" --outDir "${outDir}"`,
      { maxBuffer: 10 * 1024 * 1024 }
    );

    if (stdout.trim()) console.log(stdout);
    if (stderr.trim()) console.error(stderr);

    console.log("✅ TypeScript compilation complete");
  } catch (error: any) {
    if (error.stdout?.trim()) console.error(error.stdout);
    if (error.stderr?.trim()) console.error(error.stderr);

    console.error("❌ TypeScript compilation failed");
    process.exit(1);
  }
}
