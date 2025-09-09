import { CreateProjectRequest } from "@contxthub/contracts";
import { authService } from "../../../core/auth/authService.js";
import { Endpoints } from "../../../core/fetch/endpoints.config.js";
import { server } from "../../../core/fetch/server.client.js";


export async function RegisterProject(projectName: string): Promise<string> {
  const { activeTeam } = authService.getSession();

  const body: CreateProjectRequest = {
    name: projectName,
    team: activeTeam.id,
  };

  const res = await server.request(Endpoints.projects.create, body);

  return res.projectId;  
}