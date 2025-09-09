
import { CreateDeploymentRequest } from "@contxthub/contracts/index.js";
import fs from "fs";
import { authService } from "../../../core/auth/authService.js";
import { ProjectConfig, ProjectConfigManager } from "../../../core/config/projectConfigManager.js";
import { Endpoints } from "../../../core/fetch/endpoints.config.js";
import { server } from "../../../core/fetch/server.client.js";
import { getGitInfo } from "../utils/git.js";
import { generateUniqueName } from "../utils/nameGenerator.js";
import { DeployPaths } from "../utils/paths.js";


export function getProjectConfig(): ProjectConfig["contxtHub"] {
    return ProjectConfigManager.get().contxtHub;
}

export async function UploadPackage(paths: DeployPaths): Promise<void> {
    const deploymentName = generateUniqueName();
    const { projectId } = getProjectConfig();

    const git = getGitInfo();
    const { user } = authService.getSession();

    const zipFilePath = paths.userProjectPath.zipBundleFile;

    if (!fs.existsSync(zipFilePath)) {
        throw new Error(`❌ Zip file not found: ${zipFilePath}`);
    }

    const fileBuffer = await fs.promises.readFile(paths.userProjectPath.zipBundleFile);
    const blob = new Blob([new Uint8Array(fileBuffer)]);

    const request: CreateDeploymentRequest = {
        file: blob as unknown as File, // thats a cheat
        projectId,
        deploymentName,
        version: ProjectConfigManager.getNextVersion(),
        gitCommit: git.commit,
        gitMessage: git.message,
        createdBy: user.id,
    };

    const form = buildCreateDeploymentContract(request);

    console.log("⬆️  Uploading zip...");

    const res = await server.request(Endpoints.deployments.create, form);
    console.log("✅ Zip uploaded successfully!", res);
}


const buildCreateDeploymentContract = (request: CreateDeploymentRequest): FormData => {
    const form = new FormData();
    form.append("file", request.file, request.deploymentName);
    form.append("projectId", request.projectId);
    form.append("deploymentName", request.deploymentName);
    form.append("version", request.version);

    form.append("gitCommit", request.gitCommit);
    form.append("gitMessage", request.gitMessage);
    form.append("createdBy", request.createdBy);

    return form;
}