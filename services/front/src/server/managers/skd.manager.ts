import { DeploymentService } from "../services/deployment.service";
import { S3Service } from "../services/s3.service";
import { TektonService } from "../services/tekton.service";
import { injectable } from "tsyringe";
import { ProjectsService } from "../services/projects/projects.service";
import { CreateProjectRequest, CreateDeploymentRequest, CreateDeploymentResponse, createDeploymentResponseSchema } from "@contxthub/contracts/Cli";

@injectable()
export class SdkManager {
  constructor(
    private readonly deploymentService: DeploymentService,
    private readonly projectsService: ProjectsService,
  ) { }

  async createProject(
    input: CreateProjectRequest
  ) {
    return await this.projectsService.createProject(input);
  }

  async deploy(
    userId: string,
    input: CreateDeploymentRequest
  ): Promise<CreateDeploymentResponse> {

    const deployment = await this.deploymentService.createDeployment(input);

    const s3Url = await S3Service.uploadFile({
      file: input.file,
      fileName: input.deploymentName,
    });

    await TektonService.trigger({
      mcpServerName: input.deploymentName,
      s3Url,
      userId,
      deploymentId: deployment.deploymentId,
    });

    return createDeploymentResponseSchema.parse({
      deploymentId: deployment.deploymentId,
    });
  }
}
