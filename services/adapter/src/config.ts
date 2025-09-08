import dotenv from "dotenv";
dotenv.config();

type NonEmpty = string & { __brand: "NonEmpty" };
const req = (name: string, v?: string): NonEmpty => {
  if (!v || !v.trim()) {
    console.error(`❌ Missing required env: ${name}`);
    process.exit(1);
  }
  return v.trim() as NonEmpty;
};

export const CONFIG = {
  openRouter: {
    apiUrl: "https://openrouter.ai/api/v1/chat/completions",
    apiKey: req("OPEN_ROUTER_API_KEY", process.env.OPEN_ROUTER_API_KEY),
    model: req("OPENROUTER_MODEL", process.env.OPENROUTER_MODEL),
  },
  mcp: {
    serverUrl: req("MCP_SERVER_URL", process.env.MCP_SERVER_URL)
  }
} as const;
