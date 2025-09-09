import { CreateTeamRequestContract } from "@/lib/contracts/auth/createTeam.contract";
import { Team } from "@/lib/db";
import { TeamsRepository } from "@/server/repositories/teams/teams.repository";
import "reflect-metadata";
import { injectable } from "tsyringe";

@injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository) { }

  async getTeam(teamId: string): Promise<Team> {
    const team = await this.teamsRepository.findById(teamId);

    if (!team) {
      throw new Error("team not found");
    }

    return team
  }

  async createTeamWithOwner(request: CreateTeamRequestContract) {
    const team = await this.teamsRepository.createTeam({ name: request.teamName });

    await this.teamsRepository.addMember(team.id, "owner");

    return team.id;
  }

  async addUserToTeamFromInvite(inviteToken: string) {
    const invite = await this.teamsRepository.findInviteByToken(inviteToken);

    await this.teamsRepository.addMember(invite.teamId, "member");

    return invite.teamId;
  }

  async getAllTeamByUser(){
    return await this.teamsRepository.findAllByUser() 
  }
}
