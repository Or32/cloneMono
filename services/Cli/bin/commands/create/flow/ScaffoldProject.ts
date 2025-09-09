
import { getTargetDir, TEMPLATES_DIR } from "../../../core/paths.js";
import { copyTemplate } from "../util/template.js";
import { checkProjectName, checkDirectoryExists } from "../util/validators.js";

export function ScaffoldProject(projectName: string): string {
  const targetDir = getTargetDir(projectName);
  
  checkProjectName(projectName);
  checkDirectoryExists(targetDir, projectName);

  console.log(`📁 Creating project folder: ${projectName}`);
  console.log(TEMPLATES_DIR)
  copyTemplate(TEMPLATES_DIR, targetDir, projectName);

  return targetDir;
}
