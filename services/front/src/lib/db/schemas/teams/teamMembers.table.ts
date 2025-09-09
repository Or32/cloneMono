import { pgTable, varchar, integer, timestamp, uuid, primaryKey } from "drizzle-orm/pg-core";
import { usersTable } from "../auth/user.table";
import { teamsTable } from "./teams.table";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const teamMembersTable = pgTable(
  "team_members_tbl",
  {
    teamId: uuid("team_id")
      .notNull()
      .references(() => teamsTable.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    role: varchar("role", { length: 50 }).default("member").notNull(),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.teamId, t.userId] }),
  })
);

export type TeamMember = InferSelectModel<typeof teamMembersTable>;
export type NewTeamMember = InferInsertModel<typeof teamMembersTable>;
