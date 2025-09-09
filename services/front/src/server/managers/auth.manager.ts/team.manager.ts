import "reflect-metadata";
import type { CreateTeamRequestContract, CreateTeamResponseContract } from "@/lib/contracts/auth/createTeam.contract";
import { Transactional } from "@/lib/decorators/transactional";
import { TeamsService } from "@/server/services/auth/teams.service";
import { UserService } from "@/server/services/auth/user.service";
import { injectable } from "tsyringe";

@injectable()
export class TeamManager {
    constructor(
        private readonly userService: UserService,
        private readonly teamsService: TeamsService,
    ) { }

    @Transactional()
    async createTeamForUser(request: CreateTeamRequestContract): Promise<CreateTeamResponseContract> {
        const teamId = await this.teamsService.createTeamWithOwner(request);
        return {
            success: true,
            teamId,
            role: "owner" as const,
        };
    }
}
