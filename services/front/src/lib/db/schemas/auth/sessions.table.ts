import { pgTable, timestamp, text, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./user.table";

export const sessionsTable = pgTable("session_tbl", {
  sessionToken: text("session_token").primaryKey(), // 🔹 snake_case for DB
  userId: uuid("user_id") // 🔹 consistent with usersTable.id
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});
