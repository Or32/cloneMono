import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { deploymentsTable } from "./deployments.table";
import { deploymentStepStatusEnumPg } from "./deploymentStepStatus.enum";
import { deploymentStepTypeEnumPg } from "./deploymentStepType.enum";

export const deploymentStepsTable = pgTable("deployment_steps_tbl", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
  deploymentId: uuid("deployment_id") // 🔹 match deploymentsTable.id
    .notNull()
    .references(() => deploymentsTable.id, { onDelete: "cascade" }),
    stepType: deploymentStepTypeEnumPg("step_type").notNull(),
    status: deploymentStepStatusEnumPg("status").notNull(),
    log: text("log"),
    startedAt: timestamp("started_at")
});


export type DeploymentStep = InferSelectModel<typeof deploymentStepsTable>;
export type NewDeploymentStep = InferInsertModel<typeof deploymentStepsTable>;