import { Deployment } from "@/lib/db";


export type FullDeployment = Deployment & {
  steps: DeploymentStep[];
};