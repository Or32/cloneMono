import "reflect-metadata";
import { container } from "tsyringe";

import { UserService } from "@/server/services/auth/user.service";
import { TeamsService } from "@/server/services/auth/teams.service";
import { TeamManager } from "@/server/managers/auth.manager.ts/team.manager";
import { UserRepository } from "@/server/repositories/user.repository";
import { TeamsRepository } from "@/server/repositories/teams/teams.repository";
import { DeploymentRepository } from "@/server/repositories/deployment/deployment.repository";
import { DeploymentService } from "@/server/services/deployment.service";
import { SdkManager } from "@/server/managers/skd.manager";

container.registerSingleton(UserService);
container.registerSingleton(UserRepository);
container.registerSingleton(TeamsRepository);
container.registerSingleton(DeploymentRepository);
container.registerSingleton(DeploymentService);
container.registerSingleton(SdkManager);
container.registerSingleton(TeamsService);
container.registerSingleton(TeamManager);

// export { container };

export const userService = container.resolve(UserService);
export const userRepository = container.resolve(UserRepository);
export const teamsRepository = container.resolve(TeamsRepository);
export const teamsService = container.resolve(TeamsService);
export const teamManager = container.resolve(TeamManager);
export const sdkManager = container.resolve(SdkManager);
export const deploymentService = container.resolve(DeploymentService);
