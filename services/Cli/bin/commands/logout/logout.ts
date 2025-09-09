#!/usr/bin/env node
import { LogoutHandler } from "./logoutHandler.js";

const handler = new LogoutHandler();
handler.run().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
