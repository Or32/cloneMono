import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { pgTable, timestamp, text, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("user_tbl", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image").notNull(),
});

export type User = InferSelectModel<typeof usersTable>;
export type NewUser = InferInsertModel<typeof usersTable>;