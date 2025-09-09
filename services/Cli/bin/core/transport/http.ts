import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import { Server } from "http";
import path from "path";
import { pathToFileURL } from "url";
import { StartTransportFn } from "./types/TransportModule.js";

type CreateServerFn = () => Promise<McpServer> | McpServer;

class HttpTransportServer {
  private app: Express;
  private createServer!: CreateServerFn;
  private httpServer?: Server;

  constructor(private userEntry: string, private port: number) {
    this.app = express();
    this.setupMiddleware();
  }

  async start(): Promise<Server> {
    await this.loadUserServer();
    this.setupRoutes();
    return this.startListening();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private async loadUserServer(): Promise<void> {
    const logicPath = path.resolve(this.userEntry);
    
    try {
      // Add cache-busting timestamp for hot reload
      const moduleUrl = pathToFileURL(logicPath).toString() + `?t=${Date.now()}`;
      const logicModule = await import(moduleUrl);
      this.createServer = this.extractCreateServerFunction(logicModule);
    } catch (error) {
      throw new Error(`Failed to load user module: ${(error as Error).message}`);
    }
  }

  private extractCreateServerFunction(logicModule: any): CreateServerFn {
    const createServer = logicModule.createServer || logicModule.default || logicModule.default?.default;
    
    if (typeof createServer !== "function") {
      throw new Error("User module must export a createServer function");
    }
    
    return createServer as CreateServerFn;
  }

  private setupRoutes(): void {
    this.app.post("/mcp", this.handleMcpRequest.bind(this));
    this.app.get("/mcp", this.handleHealthCheck.bind(this));
  }

  private async handleMcpRequest(req: Request, res: Response): Promise<void> {
    const server = await this.createServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });

    res.on("close", () => {
      transport.close();
      server.close();
    });

    try {
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (err) {
      this.handleError(res, err);
    }
  }

  private handleHealthCheck(_req: Request, res: Response): void {
    res.status(200).json({ ok: true });
  }

  private handleError(res: Response, err: unknown): void {
    console.error("[nevo] Error in /mcp:", err);
    
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal error" },
        id: null,
      });
    }
  }

  private startListening(): Promise<Server> {
    return new Promise((resolve, reject) => {
      this.httpServer = this.app.listen(this.port, () => {
        console.log(`🚀 HTTP server listening on port ${this.port}`);
        resolve(this.httpServer!);
      });

      this.httpServer.on("error", (err: any) => {
        if (err.code === 'EADDRINUSE') {
          console.error(`❌ Port ${this.port} is already in use. Please stop the existing server or use a different port.`);
          reject(new Error(`Port ${this.port} is already in use`));
        } else {
          console.error(`❌ Server error:`, err.message);
          reject(err);
        }
      });

      // Store server reference for potential cleanup during hot reload
      (global as any).__nevo_server = this.httpServer;
    });
  }

  async close(): Promise<void> {
    if (this.httpServer) {
      return new Promise((resolve) => {
        let resolved = false;
        
        const resolveOnce = () => {
          if (!resolved) {
            resolved = true;
            console.log("🔄 HTTP server closed");
            this.httpServer = undefined;
            resolve();
          }
        };

        // Close all connections immediately if method exists
        if (this.httpServer && 'closeAllConnections' in this.httpServer) {
          (this.httpServer as any).closeAllConnections();
        }
        
        this.httpServer!.close((err) => {
          if (err) {
            console.warn("⚠️  Error closing server:", err.message);
          }
          resolveOnce();
        });
        
        // Force close after shorter timeout
        setTimeout(() => {
          if (!resolved) {
            console.log("🔄 Force closing HTTP server after timeout");
            resolveOnce();
          }
        }, 1000);
      });
    }
  }
}

export const startTransport: StartTransportFn = async (
  userEntry: string,
  port: number,
  tunnelOrigin: string
): Promise<void> => {
  const server = new HttpTransportServer(userEntry, port);
  const httpServer = await server.start();
  
  // Store both the HTTP server and the transport server instance for cleanup
  (global as any).__nevo_transport_server = server;
};
