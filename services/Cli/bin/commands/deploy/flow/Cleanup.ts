import fs from "fs";
import { DeployPaths } from "../utils/paths.js";

export async function Cleanup(paths: DeployPaths): Promise<void> {
  const zipPath = paths.userProjectPath.zipBundleFile;

  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
    console.log(`🗑️ Deleted zip file: ${zipPath}`);
  }
}
