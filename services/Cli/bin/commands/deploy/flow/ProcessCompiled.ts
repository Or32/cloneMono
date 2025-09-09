import fs from "fs";
import path from "path";
import { DeployPaths } from "../utils/paths.js";

export function ProcessCompiled(paths: DeployPaths): void {
  const buildDir = paths.userProjectPath.buildOutputDir;
  const compiledLogic = path.join(buildDir, "index.js");
  const targetLogic = path.join(buildDir, "logic.js");

  if (!fs.existsSync(compiledLogic)) {
    throw new Error(`❌ Compiled logic file not found: ${compiledLogic}`);
  }

  fs.renameSync(compiledLogic, targetLogic);
  console.log(`📦 Renamed entrypoint: index.js → logic.js`);
}
