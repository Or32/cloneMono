import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, timestamp, varchar, text, uuid } from "drizzle-orm/pg-core";
import { projectsTable } from "../projects/projects.table";
import { usersTable } from "../auth/user.table";

export const deploymentsTable = pgTable("deployments_tbl", {
  id: uuid("id").defaultRandom().primaryKey().notNull(), 

  projectId: uuid("project_id") 
    .notNull()
    .references(() => projectsTable.id, { onDelete: "cascade" }),

  version: varchar("version", { length: 50 }).notNull(), // e.g. "1.0.0" or build hash
  name: varchar("name", { length: 255 }).notNull(),
  gitCommit: text("gitCommit").notNull(),
  gitMessage: text("gitMessage").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export type Deployment = InferSelectModel<typeof deploymentsTable>;
export type NewDeployment = InferInsertModel<typeof deploymentsTable>;
