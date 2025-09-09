import "reflect-metadata";
import { injectable } from "tsyringe";
import { Project } from "@/lib/db";
import { ProjectsRepository } from "@/server/repositories/projects/projects.repository";
import { CreateProjectRequest, CreateProjectResponse } from "@contxthub/contracts/Cli";

@injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async createProject(input: CreateProjectRequest): Promise<CreateProjectResponse> {
    const project = await this.projectsRepository.create({
        name: input.name,
        teamId: input.team
    });

    return { projectId: project.id };
  }

  async getProjectById(id: string): Promise<Project | null> {
    const project = await this.projectsRepository.getById(id);
    return project ?? null;
  }

  /** Get all projects for a team */
  async getProjectsByTeam(teamId: string): Promise<Project[]> {
    return this.projectsRepository.getByTeam(teamId);
  }

  /** Delete a project by ID */
  async deleteProject(id: string): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
