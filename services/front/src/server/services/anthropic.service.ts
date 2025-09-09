import { anthropicClient } from "@/lib/clients/anthropic.client";


export interface ContextMessage {
  role: "user" | "assistant";
  content: string;
}

export class AntropicsService {
  static async askChat(messages: ContextMessage[], mcpTunnelUrl: string) {
    if (!messages || messages.length === 0) {
      messages = [{ role: "user", content: "Hello" }];
    }

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "user") {
      messages.push({ role: "user", content: "Please continue." });
    }

    try {
      return await anthropicClient.beta.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2000,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        mcp_servers: [
          {
            type: "url",
            url: mcpTunnelUrl,
            name: "mcp-server",
          },
        ],
        betas: ["mcp-client-2025-04-04"],
      });
    } catch (error: any) {
      if (error?.message?.includes("Failed to connect to MCP server")) {
        console.warn(
          "MCP server connection failed, falling back to Claude without MCP:",
          error.message
        );
        return await anthropicClient.beta.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 2000,
          messages: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        });
      }
      throw error;
    }
  }
}
