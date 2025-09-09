import path from "path";
import fs from "fs";
import { DeployPaths } from "../utils/paths.js";

export async function CopyEntrypoints(paths: DeployPaths): Promise<void> {
  const buildDir = paths.userProjectPath.buildOutputDir;

  copyFile(
    paths.cliProjectPath.cliEntrypointSrc,
    path.join(buildDir, "entrypoint.js"),
    "CLI Entrypoint"
  );
}

function copyFile(src: string, dest: string, label: string) {
  if (!fs.existsSync(src)) {
    throw new Error(`${label} not found at ${src}`);
  }

  fs.copyFileSync(src, dest);
  console.log(`📄 Copied ${label}: ${src} → ${dest}`);
}
