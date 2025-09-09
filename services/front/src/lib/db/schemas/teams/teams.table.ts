import { pgTable, varchar, timestamp, primaryKey, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "../auth/user.table";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const teamsTable = pgTable("teams_tbl", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(), // 🔹 snake_case
});

export const userTeams = pgTable(
  "user_teams_tbl",
  {
    userId: uuid("user_id") // 🔹 match usersTable.id
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),

    teamId: uuid("team_id") // 🔹 match teamsTable.id
      .notNull()
      .references(() => teamsTable.id, { onDelete: "cascade" }),

    role: varchar("role", { length: 50 }).default("member").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.teamId] }),
  })
);

export type Team = InferSelectModel<typeof teamsTable>;
export type NewTeam = InferInsertModel<typeof teamsTable>;
