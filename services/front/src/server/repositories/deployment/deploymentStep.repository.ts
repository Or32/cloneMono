import "reflect-metadata";
import { injectable } from "tsyringe";
import { eq } from "drizzle-orm";
import { deploymentStepsTable } from "@/lib/db/schemas/deployments/deploymentStep.table";
import { BaseRepository } from "../base.repository";

@injectable()
export class DeploymentStepRepository extends BaseRepository {
  async findByDeploymentId(deploymentId: string) {
    return this.db
      .select()
      .from(deploymentStepsTable)
      .where(eq(deploymentStepsTable.deploymentId, deploymentId));
  }
}
