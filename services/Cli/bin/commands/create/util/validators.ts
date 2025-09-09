import { existsSync } from "fs";

export function checkProjectName(name: string): void {
  if (!name) {
    console.error("❌ Project name is required");
    process.exit(1);
  }

  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    console.error("❌ Invalid project name. Use only letters, numbers, hyphens, and underscores.");
    process.exit(1);
  }
}

export function checkDirectoryExists(targetDir: string, projectName: string): void {
  if (existsSync(targetDir)) {
    console.error(`❌ Directory "${projectName}" already exists.`);
    process.exit(1);
  }
}
