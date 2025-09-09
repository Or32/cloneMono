import { integer, pgTable, timestamp, varchar, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./auth/user.table";

export const liveDebugSessionsTable = pgTable("live_debug_session_tbl", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  userId: uuid("user_id") // 🔹 consistent with usersTable.id
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  frontendRoute: varchar("frontend_route", { length: 255 }),
  localRoute: varchar("local_route", { length: 255 }).unique(),

  ttl: integer("ttl").notNull().default(3600),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  modifiedAt: timestamp("modified_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
