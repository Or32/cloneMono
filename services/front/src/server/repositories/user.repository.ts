import "reflect-metadata";
import { injectable } from "tsyringe";
import { eq } from "drizzle-orm";
import { Team, TeamMember, teamMembersTable, teamsTable, User, usersTable } from "@/lib/db";
import { BaseRepository } from "./base.repository";

@injectable()
export class UserRepository extends BaseRepository {
  async findUserById(userId: string): Promise<User | undefined> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));
    return user;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return user;
  }


async getUserTeams(userId: string) {
    const rows = await this.db
    .select()
    .from(teamMembersTable)
    .innerJoin(teamsTable, eq(teamsTable.id, teamMembersTable.teamId))
    .where(eq(teamMembersTable.userId, userId));

    return rows.map(row => ({
       ...row.team_members_tbl,
       ...row.teams_tbl,
  }))
  }

  async createUser(email: string, name: string, image: string): Promise<User> {
    const [user] = await this.db
      .insert(usersTable)
      .values({ email, name, image })
      .returning();
    return user;
  }
}
