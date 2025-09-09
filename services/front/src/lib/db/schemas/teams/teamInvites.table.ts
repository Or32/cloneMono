import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { teamsTable } from "./teams.table";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const teamInvitesTable = pgTable("team_invites_tbl", {
    id: uuid("id").defaultRandom().primaryKey(),
    teamId: uuid("team_id")
        .notNull()
        .references(() => teamsTable.id, { onDelete: "cascade" }),
    token: varchar("token", { length: 255 }).notNull().unique(),
    email: varchar("email", { length: 255 }), // optional: specific email invite
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TeamInvite = InferSelectModel<typeof teamInvitesTable>;
export type NewTeamInvite = InferInsertModel<typeof teamInvitesTable>;