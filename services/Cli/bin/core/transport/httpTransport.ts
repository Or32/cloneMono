import express from "express";
import { McpTransport } from "./types/TransportModule.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

export class HttpTransport implements McpTransport {
  private app = express();
  private port: number;
  private serverInstance?: ReturnType<typeof this.app.listen>;

  constructor(port: number = 3000) {
    this.port = port;
    this.app.use(express.json());
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.app.post("/mcp", this.handleMcpRequest.bind(this));
    this.app.get("/mcp", this.handleHealthCheck.bind(this));
  }

  private async handleMcpRequest(req: express.Request, res: express.Response): Promise<void> {
    const mcpServer = this.mcpServer;
    if (!mcpServer) {
      res.status(500).json({ error: "Server not initialized" });
      return;
    }

    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });

    res.on("close", () => {
      transport.close();
      mcpServer.close();
    });

    try {
      await mcpServer.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (err) {
      console.error("[MCP] Error in /mcp:", err);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          error: { code: -32603, message: "Internal error" },
          id: null,
        });
      }
    }
  }

  private handleHealthCheck(_req: express.Request, res: express.Response): void {
    res.status(200).json({ ok: true });
  }

  // --- McpTransport API ---
  private mcpServer?: McpServer;

  async start(mcpServer: McpServer): Promise<void> {
    this.mcpServer = mcpServer;

    this.serverInstance = this.app.listen(this.port, () => {
    });
  }

  async stop(): Promise<void> {
    if (this.serverInstance) {
      this.serverInstance.close();
      this.serverInstance = undefined;
    }
  }
}
