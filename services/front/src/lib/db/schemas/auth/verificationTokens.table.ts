import { text, timestamp, integer, pgTable, primaryKey } from "drizzle-orm/pg-core";


export const verificationTokensTable = pgTable(
    "verification_token_tbl",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);
