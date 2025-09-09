import { ProjectConfigManager } from "../../../core/config/projectConfigManager.js";

export function WriteConfig(projectName: string, team: string, projectId: string) {
  process.chdir(projectName);

  ProjectConfigManager.update({
    projectName,
    team,
    nextVersion: "0.0.1",
    projectId: projectId,
  });
}