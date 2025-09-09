import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type DeployPaths = {
  // User project (where CLI is being run)
  userProjectPath: {
    buildOutputDir: string;
    tsConfigFile: string;
    userEntrypointSrc: string;
    packageJsonFile: string;
    zipBundleFile: string;
  };

  // CLI project (internal to Nevo CLI)
  cliProjectPath: {
    cliEntrypointSrc: string;
    transportEntrypointSrc: string;
  };
};

export function initializePaths(): DeployPaths {
  const userCwd = process.cwd();

  return {
    userProjectPath: {
      buildOutputDir: path.resolve(userCwd, "dist"),
      tsConfigFile: path.resolve(userCwd, "tsconfig.json"),
      userEntrypointSrc: path.resolve(userCwd, "src/index.ts"),
      packageJsonFile: path.resolve(userCwd, "package.json"),
      zipBundleFile: path.resolve(userCwd, "build.zip"),
    },

    cliProjectPath: {
      cliEntrypointSrc: path.resolve(__dirname, "../../../core/server/server.js"),
      transportEntrypointSrc: path.resolve(__dirname, "../../../core/transport/http.js"),
    },
  };
}
