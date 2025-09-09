export type StartTransportFn = (entryFile: string, port: number, tunnelOrigin: string) => Promise<void> | void;

export interface TransportModule {
  startTransport: StartTransportFn;
}

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export interface McpTransport {
  start(mcpServer: McpServer): Promise<void>;
  stop?(): Promise<void>;
}
