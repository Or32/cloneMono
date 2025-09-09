import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { watch } from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { ProductionServer } from "../../../core/server/productionServer.js";
import { startTunnel, TunnelInfo } from "./tunnel.js";
import { StartingDevServer, DevServerRestarting, DevServerRunning } from "../../../core/messages.js";

export class HotReloadServer {
  private port: number;
  private entryFile: string;
  private currentServer: ProductionServer | null = null;
  private isRestarting = false;
  private tunnelInfo: TunnelInfo | null = null;

  constructor(port = 3000, entryFile = "src/index.ts") {
    this.port = port;
    this.entryFile = path.resolve(process.cwd(), entryFile);
  }

  async start(): Promise<void> {
    StartingDevServer();

    // 🔗 start tunnel once, keep stable across reloads
    if (!this.tunnelInfo) {
      this.tunnelInfo = startTunnel(this.port);
    }

    await this.restartServer();
    this.watchFiles();
  }

  private watchFiles(): void {
    const watchPath = path.dirname(this.entryFile);
    console.log(`🔥 Hot reload is enabled`);

    watch(watchPath, { recursive: true }, (_, filename) => {
      if (!filename) return;
      if (!filename.endsWith(".ts") && !filename.endsWith(".js")) return;

      this.debounceRestart(filename);
    });
  }

  private debounceRestart(filename: string): void {
    if (this.isRestarting) return;

    this.isRestarting = true;
    DevServerRestarting(filename);

    setTimeout(async () => {
      try {
        await this.restartServer();
      } finally {
        this.isRestarting = false;
      }
    }, 500);
  }

  private async loadUserLogic(): Promise<McpServer> {
    const { default: createServer } = await import(
      pathToFileURL(this.entryFile).href + `?update=${Date.now()}`
    );

    if (typeof createServer !== "function") {
      console.error("❌ Entry file must export a default async function (createServer)");
      process.exit(1);
    }

    return await createServer();
  }

  private async restartServer(): Promise<void> {
    if (this.currentServer) {
      await this.currentServer.stop();
      this.currentServer = null;
    }

    const mcpServer: McpServer = await this.loadUserLogic();

    this.currentServer = new ProductionServer(mcpServer);
    await this.currentServer.start();

    DevServerRunning();
  }

  async stop(): Promise<void> {
    await this.currentServer?.stop();
    this.currentServer = null;
    // 🔑 keep tunnel stable across reloads, only close if process exits
  }
}
