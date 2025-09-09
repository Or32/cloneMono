import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// go up to dist root
export const CLI_ROOT = resolve(__dirname, "..", "..");

// templates folder inside dist
export const TEMPLATES_DIR = join(CLI_ROOT, "template"); 

// Where user ran the command
export const USER_CWD = process.cwd();

// Resolve target project path
export function getTargetDir(projectName: string): string {
  return resolve(USER_CWD, projectName);
}
