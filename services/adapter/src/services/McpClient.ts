// mcpClient.ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import type {
  McpClient as McpClientContract,
  ToolDescriptor,
  ResourceDescriptor,
  ToolCallResult,
  ResourceFetchResult,
} from "../types";
import { CONFIG } from "../config";


type AnyPart = unknown;

export class HttpMcpClient implements McpClientContract {
  private client?: Client;
  private readonly serverUrl: string;

  constructor(serverUrl: string = CONFIG.mcp.serverUrl) {
    this.serverUrl = serverUrl;
  }

  private async ensureConnected(): Promise<Client> {
    if (this.client) return this.client;

    const transport = new StreamableHTTPClientTransport(new URL(this.serverUrl));
    const client = new Client({ name: "AdapterCLI", version: "1.0.0" });
    await client.connect(transport);
    this.client = client;
    return client;
  }

  async listTools(): Promise<ToolDescriptor[]> {
    const client = await this.ensureConnected();
    try {
      const { tools } = await client.listTools();
      if (!Array.isArray(tools)) return [];
      return tools.map((t) => ({
        name: t.name,
        description: t.description ?? "",
        input: t.inputSchema as Record<string, unknown> | undefined,
      }));
    } catch (err: any) {
      console.error("listTools failed:", err?.message ?? err);
      return [];
    }
  }

  async listResources(): Promise<ResourceDescriptor[]> {
    const client = await this.ensureConnected();
    try {
      const { resources } = await client.listResources();
      if (!Array.isArray(resources)) return [];
      return resources.map((r) => ({
        uri: r.uri,
        name: r.name,
        description: r.description,
        mimeType: r.mimeType,
      }));
    } catch (err: any) {
      console.error("listResources failed:", err?.message ?? err);
      return [];
    }
  }

  async callTool(toolName: string, args?: Record<string, unknown>): Promise<ToolCallResult> {
    const client = await this.ensureConnected();
    try {
      const res = await client.callTool({ name: toolName, arguments: args ?? {} });
      return {
        toolName,
        success: true,
        outputText: this.toText(res?.content),
      };
    } catch (err: any) {
      return { toolName, success: false, errorText: err?.message ?? String(err) };
    }
  }

  async readResource(uri: string): Promise<ResourceFetchResult> {
    const client = await this.ensureConnected();
    try {
      const res = (await client.readResource({ uri })) as
        | { contents?: AnyPart[]; content?: AnyPart[] }
        | undefined;

      const parts = Array.isArray(res?.contents)
        ? res!.contents
        : Array.isArray(res?.content)
        ? res!.content
        : [];

      return {
        uri,
        success: true,
        contentText: this.toText(parts),
      };
    } catch (err: any) {
      return { uri, success: false, errorText: err?.message ?? String(err) };
    }
  }

  /** Minimal, readable normalization to text */
  private toText(content: unknown): string {
    if (!content) return "";
    const parts = Array.isArray(content) ? content : [content];

    const lines = parts.map((p) => {
      // { type: "text", text: string }
      if (p && typeof p === "object" && "type" in (p as any) && (p as any).type === "text" && typeof (p as any).text === "string") {
        return (p as any).text;
      }
      if (typeof p === "string") return p;
      try {
        return JSON.stringify(p);
      } catch {
        return "";
      }
    });

    return lines.filter(Boolean).join("\n").trim();
  }
}
