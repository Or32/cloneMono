import fs from "fs";
import { DeployPaths } from "../utils/paths.js";

export async function CleanDist(paths: DeployPaths): Promise<void> {
  const buildDir = paths.userProjectPath.buildOutputDir;

  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
  }

  fs.mkdirSync(buildDir, { recursive: true });
  console.log(`🧹 Reset build output: ${buildDir}`);
}
