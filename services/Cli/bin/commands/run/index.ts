import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ProductionServer } from "../../core/server/productionServer.js";


async function loadUserLogic(): Promise<McpServer> {
  const distPath = path.resolve(process.cwd(), "dist/index.js");

  if (!fs.existsSync(distPath)) {
    console.error("❌ dist/index.js not found. Run `contxt deploy` first.");
    process.exit(1);
  }

  const { default: createServer } = await import(pathToFileURL(distPath).href);

  if (typeof createServer !== "function") {
    console.error("❌ dist/index.js must export a default async function (createServer).");
    process.exit(1);
  }

  // ✅ await async factory
  const mcpServer: McpServer = await createServer();

  return mcpServer;
}

async function main() {
  const mcpServer = await loadUserLogic();

  const server = new ProductionServer(mcpServer);
  await server.start();

  console.log("✨ Server ready!");
}

main().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
