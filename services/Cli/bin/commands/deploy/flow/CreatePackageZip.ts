import archiver from "archiver";
import fs from "fs";
import { DeployPaths } from "../utils/paths.js";

export async function CreatePackageZip(paths: DeployPaths): Promise<string> {
  return new Promise((resolve, reject) => {
    const packageJson = paths.userProjectPath.packageJsonFile;
    const distDir = paths.userProjectPath.buildOutputDir;
    const zipFile = paths.userProjectPath.zipBundleFile;

    if (!fs.existsSync(packageJson)) {
      return reject(new Error(`❌ package.json not found at ${packageJson}`));
    }

    const output = fs.createWriteStream(zipFile);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      const size = archive.pointer();
      console.log(`📦 Created zip: ${zipFile} (${size} bytes)`);
      resolve(zipFile);
    });

    output.on("error", reject);
    archive.on("error", reject);

    archive.pipe(output);

    // Include the dist folder as "dist/"
    archive.directory(distDir, "dist");

    // Include package.json at the root
    archive.file(packageJson, { name: "package.json" });

    archive.finalize().catch(reject);
  });
}
