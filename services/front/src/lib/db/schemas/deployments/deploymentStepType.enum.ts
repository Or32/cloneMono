import { deploymentStepTypeValues } from "@/lib/db/schemas/deployments/deploymentStepType";
import { pgEnum } from "drizzle-orm/pg-core";

export const deploymentStepTypeEnumPg = pgEnum("deployment_step_type", deploymentStepTypeValues);

