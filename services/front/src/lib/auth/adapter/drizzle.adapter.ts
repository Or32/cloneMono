import { accountsTable, db, sessionsTable, usersTable, verificationTokensTable } from "@/lib/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const drizzleAdapter = DrizzleAdapter(db, {
    usersTable: usersTable,
    accountsTable: accountsTable,
    sessionsTable: sessionsTable,
    verificationTokensTable: verificationTokensTable,
})