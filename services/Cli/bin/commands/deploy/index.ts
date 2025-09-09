#!/usr/bin/env node
import { DeployHandler } from "./deployHandler.js";

const deployment = new DeployHandler();

deployment.deploy().catch((error: any) => {
  console.error("❌ Failed to deploy project:", (error as Error).message);
  process.exit(1);
});
