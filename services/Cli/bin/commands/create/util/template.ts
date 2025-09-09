import { mkdirSync, readdirSync, statSync, readFileSync, writeFileSync, copyFileSync } from "fs";
import { join } from "path";

export function copyTemplate(srcDir: string, destDir: string, projectName: string): void {
  mkdirSync(destDir, { recursive: true });

  for (const file of readdirSync(srcDir)) {
    const srcPath = join(srcDir, file);
    const destPath = join(destDir, file);

    if (statSync(srcPath).isDirectory()) {
      copyTemplate(srcPath, destPath, projectName);
    } else {
      copyTemplateFile(srcPath, destPath, projectName);
    }
  }
}

function copyTemplateFile(srcPath: string, destPath: string, projectName: string): void {
  const isTextFile = /\.(json|js|ts|md|txt)$/i.test(srcPath);

  if (isTextFile) {
    const content = processTemplate(readFileSync(srcPath, "utf8"), projectName);
    writeFileSync(destPath, content);
  } else {
    copyFileSync(srcPath, destPath);
  }
}

function processTemplate(content: string, projectName: string): string {
  return content
    .replace(/{{PROJECT_NAME}}/g, projectName)
    .replace(/{{PROJECT_TITLE}}/g, titleCase(projectName));
}

function titleCase(str: string): string {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
