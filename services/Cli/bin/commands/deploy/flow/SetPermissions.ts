import fs from "fs";
import path from "path";
import { DeployPaths } from "../utils/paths.js";

export function SetPermissions(paths: DeployPaths) {
  const buildDir = paths.userProjectPath.buildOutputDir;
  const mainEntrypoint = path.join(buildDir, "entrypoint.js");

  if (!fs.existsSync(mainEntrypoint)) {
    throw new Error(`❌ Cannot set permissions, file not found: ${mainEntrypoint}`);
  }

  fs.chmodSync(mainEntrypoint, 0o755);
  console.log(`🔑 Made executable: ${mainEntrypoint}`);
}
