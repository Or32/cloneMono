import "reflect-metadata";
import { injectable } from "tsyringe";
import { and, desc, eq } from "drizzle-orm";
import {
  db,
  Deployment,
  deploymentsTable,
  DeploymentStep,
  deploymentStepsTable,
  NewDeployment,
  NewDeploymentStep,
  projectsTable,
  usersTable,
} from "@/lib/db";
import { BaseRepository } from "../base.repository";

@injectable()
export class DeploymentRepository extends BaseRepository {
  async insertDeployment(newDeployment: NewDeployment): Promise<Deployment | undefined> {
    const [deployment] = await this.db
      .insert(deploymentsTable)
      .values(newDeployment)
      .returning();
    return deployment;
  }

  async getDeploymentsByTeam() {
  return this.db
    .select()
    .from(deploymentsTable)
    .innerJoin(projectsTable, eq(deploymentsTable.projectId, projectsTable.id))
    .where(eq(projectsTable.teamId, this.teamId))
    .orderBy(desc(deploymentsTable.createdAt));
  }

  async getDeploymentById(deploymentId: string) {
    const [deployment] = await this.db
      .select()
      .from(deploymentsTable)
      .where(eq(deploymentsTable.id, deploymentId))
      .innerJoin(usersTable, eq(deploymentsTable.createdBy, usersTable.id))
    return deployment;
  }

  async insertDeploymentStep(newDeploymentStep: NewDeploymentStep): Promise<DeploymentStep | undefined> {
    const [step] = await this.db
      .insert(deploymentStepsTable)
      .values(newDeploymentStep)
      .returning();
    return step;
  }

  async getDeploymentSteps(deploymentId: string): Promise<DeploymentStep[]> {
    return this.db
      .select()
      .from(deploymentStepsTable)
      .where(eq(deploymentStepsTable.deploymentId, deploymentId))
      .orderBy(deploymentStepsTable.startedAt);
  }

  async getStepWithDeployment(
    stepId: number,
    projectId: string,
  ): Promise<{ step: DeploymentStep; deployment: Deployment }[]> {
    return this.db
      .select({
        step: deploymentStepsTable,
        deployment: deploymentsTable,
      })
      .from(deploymentStepsTable)
      .innerJoin(
        deploymentsTable,
        eq(deploymentStepsTable.deploymentId, deploymentsTable.id),
      )
      .where(
        and(
          eq(deploymentStepsTable.id, stepId),
          eq(deploymentsTable.projectId, projectId),
        )
      );
  }

  async getStepsForDeployment(deploymentId: string): Promise<DeploymentStep[]> {
    return this.db
      .select()
      .from(deploymentStepsTable)
      .where(eq(deploymentStepsTable.deploymentId, deploymentId));
  }
}
