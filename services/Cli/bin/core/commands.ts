import { showHelp } from "../commands/help/help.js";
import { spawn } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const publicCommands = [
  "login", "logout", "create", "run", "deploy",
  "help", "-h", "--help"
];

export const commands: Record<string, { action: (args: string[]) => Promise<void> | void }> = {
  login:  { action: (args) => runScript("../commands/login/index.js", args) },
  logout: { action: (args) => runScript("../commands/logout/index.js", args) },
  create: { action: (args) => runScript("../commands/create/index.js", args) },
  dev:    { action: (args) => runScript("../commands/dev/index.js", args) },
  deploy: { action: (args) => runScript("../commands/deploy/index.js", args) },
  run: { action: (args) => runScript("../commands/run/index.js", args) },
  help:   { action: () => showHelp() },
  "-h":   { action: () => showHelp() },
  "--help": { action: () => showHelp() },
};


export function runScript(
  scriptPath: string,
  scriptArgs: string[] = [],
  tsx = false
): Promise<void> {
  return new Promise((resolve, reject) => {
    const fullPath = join(__dirname, scriptPath);

    const env = {
      ...process.env,
      ...(tsx ? { NODE_OPTIONS: (process.env.NODE_OPTIONS || "") + " --import tsx/esm" } : {}),
    };

    const child = spawn("node", [fullPath, ...scriptArgs], {
      stdio: "inherit",
      env,
    });

    child.on("error", (err) =>
      reject(new Error(`❌ Failed to run ${scriptPath}: ${err.message}`))
    );

    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${scriptPath} exited with code ${code}`));
    });
  });
}
