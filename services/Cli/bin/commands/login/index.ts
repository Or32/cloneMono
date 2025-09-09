#!/usr/bin/env node
import { LoginHandler } from "./LoginHandler.js";

const handler = new LoginHandler();
handler.run().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
