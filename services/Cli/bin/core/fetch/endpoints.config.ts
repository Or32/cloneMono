import { CreateDeploymentResponse, CreateProjectRequest, CreateProjectResponse } from "@contxthub/contracts";

type Method = "POST" | "GET";

export type Endpoint<Req, Res> =
  | {
      path: string;
      method: Method;
      req: Req;
      res: Res;
      contentType: "application/json";
    }
  | {
      path: string;
      method: Method;
      req: FormData;
      res: Res;
      contentType: "multipart/form-data";
    };

// Explicit typing fixes the issue
export const Endpoints = {
  projects: {
    create: {
      path: "/projects",
      method: "POST",
      req: {} as CreateProjectRequest,
      res: {} as CreateProjectResponse,
      contentType: "application/json"
    } satisfies Endpoint<CreateProjectRequest, CreateProjectResponse>,
  },
  deployments: {
    create: {
      path: "/deployments",
      method: "POST",
      req: {} as FormData, // 🔒 must be FormData
      res: {} as CreateDeploymentResponse,
      contentType: "multipart/form-data",
    } satisfies Endpoint<FormData, CreateDeploymentResponse>,
  },
};
