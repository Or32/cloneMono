import "reflect-metadata";
import { injectable } from "tsyringe";
import { eq } from "drizzle-orm";
import { Team, NewTeam, teamsTable } from "@/lib/db/schemas/teams/teams.table";
import { TeamInvite, teamInvitesTable } from "@/lib/db/schemas/teams/teamInvites.table";
import { teamMembersTable } from "@/lib/db/schemas/teams/teamMembers.table";
import { BaseRepository } from "../base.repository";

@injectable()
export class TeamsRepository extends BaseRepository {
  async createTeam(team: NewTeam): Promise<Team> {
    const [created] = await this.db.insert(teamsTable).values(team).returning();
    return created;
  }

  async findById(id: string): Promise<Team | undefined> {
    const [team] = await this.db.select().from(teamsTable).where(eq(teamsTable.id, id));
    return team;
  }

  async findAll(): Promise<Team[]> {
    return this.db.select().from(teamsTable);
  }

    async findAllByUser() {
    return await this.db
      .select({
        id: teamsTable.id,
        name: teamsTable.name,
        createdAt: teamsTable.createdAt,
        // add any other fields you need
      })
      .from(teamsTable)
      .innerJoin(
        teamMembersTable,
        eq(teamMembersTable.teamId, teamsTable.id)
      )
      .where(eq(teamMembersTable.userId, this.userId));
  }

  async addMember(teamId: string, role: "owner" | "member" = "member") {
    
    await this.db.insert(teamMembersTable).values({ teamId, userId: this.userId, role });
  }

  async findInviteByToken(token: string): Promise<TeamInvite> {
    const [teamInvite] = await this.db
      .select()
      .from(teamInvitesTable)
      .where(eq(teamInvitesTable.token, token));

    if (!teamInvite) throw new Error("Invalid invite token");
    return teamInvite;
  }
}
