import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { HttpTransport } from "../transport/httpTransport.js";
import { McpTransport } from "../transport/types/TransportModule.js";

const DEFAULT_PORT = 3010;

export class ProductionServer {
  private port: number;
  private mcpServer: McpServer;
  private transportLayer: McpTransport | null = null;

  constructor(mcpServer: McpServer) {
    this.port = this.parsePort(process.env.PORT ?? DEFAULT_PORT.toString());
    this.mcpServer = mcpServer;
  }

  async start(): Promise<void> {
    try {
      this.transportLayer = await this.loadTransportModule();

      await this.transportLayer.start(this.mcpServer);
    } catch (err: any) {
      console.error("❌ Failed to start server:", err);
      process.exit(1);
    }
  }

  async stop(): Promise<void> {
    if (this.transportLayer && typeof this.transportLayer.stop === "function") {
      try {
        await this.transportLayer.stop();
      } catch (err: any) {
        console.warn("⚠️ Error while stopping server:", err);
      } finally {
        this.transportLayer = null;
      }
    } else {
      console.log("ℹ️ No running server to stop");
    }
  }

  private parsePort(portStr: string): number {
    const port = parseInt(portStr, 10);
    return isNaN(port) ? DEFAULT_PORT : port;
  }

  private async loadTransportModule(type?: string): Promise<McpTransport> {
    return new HttpTransport(this.port);
  }
}
