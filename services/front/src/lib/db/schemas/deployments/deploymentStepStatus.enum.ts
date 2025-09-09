import { deploymentStepStatusValues } from "@/lib/db/schemas/deployments/deploymentStepStatus";
import { pgEnum } from "drizzle-orm/pg-core";

export const deploymentStepStatusEnumPg = pgEnum("deployment_step_status", deploymentStepStatusValues);
