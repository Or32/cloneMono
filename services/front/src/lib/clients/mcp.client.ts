import  {StreamableHTTPClientTransport} from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Client } from "@modelcontextprotocol/sdk/client";

export async function createMcpClient(serverUrl: string) {
    const client = new Client(
      {
        name: "mcp-inspector",
        version: '1.0.0'
      },
      {
        capabilities: {
          sampling: {},
          elicitation: {},
          roots: {
            listChanged: true,
          },
        },
      },
    );

  const transport = new StreamableHTTPClientTransport(new URL(serverUrl));
  await client.connect(transport);

  return client;
}