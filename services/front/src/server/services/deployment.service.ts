import "reflect-metadata";
import { injectable } from "tsyringe";
import { DeploymentRepository } from "@/server/repositories/deployment/deployment.repository";
import { DeploymentStepRepository } from "@/server/repositories/deployment/deploymentStep.repository";
import { FullDeployment } from "@/types/deployment/fullDeployment";
import {AddDeploymentStepRequest, AddDeploymentStepResponse, CreateDeploymentRequest, CreateDeploymentResponse} from "@contxthub/contracts"

@injectable()
export class DeploymentService {
  constructor(
    private readonly deploymentRepository: DeploymentRepository,
    private readonly deploymentStepRepository: DeploymentStepRepository
  ) {}

  async createDeployment(data: CreateDeploymentRequest): Promise<CreateDeploymentResponse> {
    const deployment = await this.deploymentRepository.insertDeployment({
        version: data.version,
        name: data.deploymentName,
        projectId: data.projectId,
        gitCommit: data.gitCommit,
        gitMessage: data.gitMessage,
        createdBy: data.createdBy
    });

    if (!deployment) throw new Error("Failed to create deployment");

    return { deploymentId: deployment.id };
  }

  async addDeploymentStep(request: AddDeploymentStepRequest): Promise<AddDeploymentStepResponse> {
    const step = await this.deploymentRepository.insertDeploymentStep({
        deploymentId: "",
        stepType: "build",
        status: "warning"
    });

    if (!step) throw new Error("Failed to create deployment step");

    return {};
  }

  async getTeamDeployments() {
    const rows = await this.deploymentRepository.getDeploymentsByTeam();
    
    return rows.map((row) => ({...row.deployments_tbl, projectName: row.projects_tbl.name}))
  }

  async getFullDeployment(deploymentId: string): Promise<FullDeployment> {
    const deployment = await this.deploymentRepository.getDeploymentById(deploymentId);
    const steps = await this.deploymentStepRepository.findByDeploymentId(deploymentId);

    return { ...deployment.deployments_tbl, createdBy: deployment.user_tbl.name, steps};
  }
}
