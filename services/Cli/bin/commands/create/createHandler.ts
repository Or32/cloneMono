import { InstallDependencies } from "./flow/DependencyInstaller.js"
import { PromptProjectName } from "./flow/PromptProjectName.js";
import { RegisterProject } from "./flow/RegisterProject.js";
import { ScaffoldProject } from "./flow/ScaffoldProject.js";
import { ShowSuccess } from "./flow/ShowSuccess.js";
import { WriteConfig } from "./flow/WriteConfig.js";

export class CreateHandler {
  private projectName: string;
  private targetDir: string;

  constructor(projectName?: string) {
    this.projectName = projectName || "";
    this.targetDir = "";
  }

  async create(): Promise<void> {
    // 1️⃣ Ensure name
    this.projectName = this.projectName || await PromptProjectName();

    // 2️⃣ Scaffold locally
    this.targetDir = ScaffoldProject(this.projectName);

    // 3️⃣ Register remote project
    const projectId = await RegisterProject(this.projectName);

    // 4️⃣ Write local config
    WriteConfig(this.projectName, this.targetDir, projectId);

    // 5️⃣ Install deps
    await InstallDependencies(this.targetDir);

    // 6️⃣ Success
    ShowSuccess(this.projectName)
  }
}
