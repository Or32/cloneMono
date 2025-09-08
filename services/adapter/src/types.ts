// types.ts

export type ChatRole = "system" | "user" | "assistant" | "tool";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ToolDescriptor {
  name: string;
  description: string;
  input?: Record<string, unknown>;
}

export interface ResourceDescriptor {
  uri: string;
  name?: string;
  description?: string;
  mimeType?: string;
}

export interface ToolCallResult {
  toolName: string;
  success: boolean;
  outputText?: string;
  outputJson?: unknown;
  errorText?: string;
}

export interface ResourceFetchResult {
  uri: string;
  success: boolean;
  contentText?: string;
  contentJson?: unknown;
  errorText?: string;
}

// Abstract model service – implement this to talk to your LLM.
export interface ModelService {
  complete(messages: ChatMessage[]): Promise<string>;
}

// Abstract MCP client – implement this to talk to your MCP server(s).
export interface McpClient {
  listTools(): Promise<ToolDescriptor[]>;
  listResources(): Promise<ResourceDescriptor[]>;
  callTool(toolName: string, args: unknown): Promise<ToolCallResult>;
  readResource(uri: string): Promise<ResourceFetchResult>;
}

// Strict JSON contract the model must output.
export type ModelDecision =
  | {
      action: "final";
      finalAnswer: string;
      rationale?: string;
      progress?: string;
    }
  | {
      action: "use_tool";
      tool: string;
      arguments: Record<string, unknown> | null;
      rationale?: string;
      progress?: string;
    }
  | {
      action: "use_resource";
      uri: string;
      rationale?: string;
      progress?: string;
    };

export interface LifecycleOptions {
  maxTurns?: number;
  includeProgressInTrace?: boolean;
}

export interface LifecycleTraceStep {
  index: number;
  decision: ModelDecision | null;
  modelRaw: string;
  toolResult?: ToolCallResult;
  resourceResult?: ResourceFetchResult;
}

export interface LifecycleResult {
  finalAnswer: string;
  turns: number;
  usedTools: string[];
  usedResources: string[];
  trace: LifecycleTraceStep[];
}
