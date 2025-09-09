import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export default async function createServer() {
  const server = new McpServer({
    name: "{{PROJECT_NAME}}",
    version: "1.0.0",
    capabilities: {
      resources: {},
      tools: {},
      prompt: {},
    },
  });

  server.tool(
    "hello",
    "Say hello",
    { name: z.string().describe("Who to greet") },
    async ({ name }) => ({
      content: [{ type: "text", text: `Hello, ${name}!` }],
    })
  );

  return server;
}
