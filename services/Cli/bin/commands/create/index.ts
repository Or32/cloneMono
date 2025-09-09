#!/usr/bin/env node
import { CreateHandler } from "./createHandler.js";

const projectName = process.argv[2];

const creator = new CreateHandler(projectName);

creator.create().catch((error: any) => {
  console.error("❌ Failed to create project:", (error as Error).message);
  process.exit(1);
});
