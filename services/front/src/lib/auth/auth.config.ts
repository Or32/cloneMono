import NextAuth from "next-auth";

import { db, teamMembersTable, teamsTable } from "../db";
import { drizzleAdapter } from "./adapter/drizzle.adapter";
import { authorized } from "./callbacks/authorized";
import { jwt } from "./callbacks/jwt";
import { redirect } from "./callbacks/redirect";
import { session } from "./callbacks/session";
import { githubProvider } from "./providers/github.provider";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: drizzleAdapter,
    providers: [githubProvider],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized,
        session,
        redirect,
        jwt,
    },
    session: {
        strategy: "jwt", // ✅ keeps session in JWT, avoids DB lookups
        maxAge: 60 * 60 * 24 * 7, // 7 days
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 7, // 7 days
    },
    events: {
        async createUser({ user }) {

            if (!user.id) {
                throw new Error("Cannot create user without ID");
            }

            const [newTeam] = await db.insert(teamsTable).values({
                name: `${user.name} team's`
            }).returning();


            await db.insert(teamMembersTable).values({ teamId: newTeam.id, userId: user.id, role: "owner" });

        },
    }
})
