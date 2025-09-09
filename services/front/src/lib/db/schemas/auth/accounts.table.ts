import {
  integer,
  pgTable,
  text,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";
import { usersTable } from "./user.table";

export const accountsTable = pgTable(
  "account_tbl",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),

    type: text("type").notNull(), // ✅ required by NextAuth
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),

    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);
