import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, timestamp, varchar, text, uuid } from "drizzle-orm/pg-core";
import { teamsTable } from "../teams/teams.table";

export const projectsTable = pgTable("projects_tbl", {
  id: uuid("id").defaultRandom().primaryKey().notNull(), // 🔹 use uuid for consistency

  teamId: uuid("team_id") // 🔹 match teamsTable.id type
    .notNull()
    .references(() => teamsTable.id, { onDelete: "cascade" }),

  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),

  createdAt: timestamp("created_at").defaultNow().notNull(), // 🔹 snake_case
});

export type Project = InferSelectModel<typeof projectsTable>;
export type NewProject = InferInsertModel<typeof projectsTable>;
