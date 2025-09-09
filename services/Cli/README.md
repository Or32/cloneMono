# Nevo

A CLI tool for creating and developing MCP (Model Context Protocol) servers.

## Installation

```bash
npm install -g nevo
```

Or use it directly with npx:

```bash
npx nevo <command>
```

## Usage

```
🚀 Nevo - MCP Development CLI

Usage:
  nevo create <project-name>  Create a new MCP server project
  nevo dev                    Start development server with inspector
  nevo --help                 Show this help message
  nevo --version              Show version

Examples:
  nevo create my-mcp-server
  nevo dev
```

## Creating a New MCP Server

```bash
nevo create my-mcp-server
cd my-mcp-server
```

This will create a new directory with a basic MCP server template.

## Development

To start the development server with the MCP inspector:

```bash
cd my-mcp-server
npm run dev
```

This will:
1. Start your MCP server using the HTTP transport
2. Launch the MCP inspector in your browser
3. Connect the inspector to your server

## Project Structure

```
my-mcp-server/
  ├── package.json        # Project dependencies and scripts
  ├── tsconfig.json       # TypeScript configuration
  └── src/
      └── index.ts        # Main server implementation
```

## Customizing Your MCP Server

Edit `src/index.ts` to add your own tools and resources to the MCP server.

Example:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function createServer() {
  const server = new McpServer({ name: "custom-server", version: "1.0.0" });

  // Add a simple tool
  server.tool(
    "hello",
    "Say hello",
    { name: z.string().describe("Who to greet") },
    async ({ name }) => ({
      content: [{ type: "text", text: `Hello, ${name}!` }],
    })
  );

  // Add more tools and resources here

  return server;
}
```

## License

MIT
