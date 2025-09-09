#!/usr/bin/env node
import { ContxtCLI } from "./core/cli.js";

const cli = new ContxtCLI();
cli.run().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
