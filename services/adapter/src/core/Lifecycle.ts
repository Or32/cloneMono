import {
  ChatMessage,
  LifecycleOptions,
  LifecycleResult,
  LifecycleTraceStep,
  McpClient,
  ModelService,
} from "../types";
import {
  buildContextMessage,
  buildHandshakeSystemMessage,
  buildObjectiveMessage,
  Prompts,
} from "../prompts";
import { tryParseDecision } from "../utils/parser";

export class Lifecycle {
  private readonly model: ModelService;
  private readonly mcp: McpClient;
  private readonly options: Required<LifecycleOptions>;

  constructor(model: ModelService, mcp: McpClient, options?: LifecycleOptions) {
    this.model = model;
    this.mcp = mcp;
    this.options = {
      maxTurns: options?.maxTurns ?? 6,
      includeProgressInTrace: options?.includeProgressInTrace ?? false,
    };
  }

  async handle(userPrompt: string): Promise<LifecycleResult> {
    const [tools, resources] = await Promise.all([
      this.mcp.listTools(),
      this.mcp.listResources(),
    ]);

    const messages: ChatMessage[] = [
      buildHandshakeSystemMessage(),
      buildContextMessage(tools, resources),
      buildObjectiveMessage(userPrompt),
    ];

    const trace: LifecycleTraceStep[] = [];
    const usedTools: string[] = [];
    const usedResources: string[] = [];

    for (let turn = 0; turn < this.options.maxTurns; turn++) {
      const raw = await this.model.complete(messages);
      const parsed = tryParseDecision(raw);

      if (!parsed.ok) {
        messages.push(Prompts.formatError());
        trace.push({ index: turn, decision: null, modelRaw: raw });
        continue;
      }

      const decision = parsed.decision;

      if (decision.action === "final") {
        trace.push({ index: turn, decision, modelRaw: raw });
        return {
          finalAnswer: decision.finalAnswer,
          turns: turn + 1,
          usedTools,
          usedResources,
          trace,
        };
      }

      if (decision.action === "use_tool") {
        const exists = tools.some((t) => t.name === decision.tool);
        if (!exists) {
          messages.push(Prompts.unknownTool(decision.tool));
          trace.push({ index: turn, decision, modelRaw: raw });
          continue;
        }

        const result = await this.mcp.callTool(decision.tool, decision.arguments ?? {});
        usedTools.push(decision.tool);

        messages.push({
          role: "tool",
          content: JSON.stringify({ type: "tool_result", data: result }, null, 2),
        });
        messages.push(Prompts.afterToolResult());
        trace.push({ index: turn, decision, modelRaw: raw, toolResult: result });
        continue;
      }

      if (decision.action === "use_resource") {
        const exists = resources.some((r) => r.uri === decision.uri);
        if (!exists) {
          messages.push(Prompts.unknownResource(decision.uri));
          trace.push({ index: turn, decision, modelRaw: raw });
          continue;
        }

        const result = await this.mcp.readResource(decision.uri);
        usedResources.push(decision.uri);

        messages.push({
          role: "tool",
          content: JSON.stringify({ type: "resource_result", data: result }, null, 2),
        });
        messages.push(Prompts.afterResourceResult());
        trace.push({ index: turn, decision, modelRaw: raw, resourceResult: result });
        continue;
      }

      messages.push(Prompts.formatError());
      trace.push({ index: turn, decision: null, modelRaw: raw });
    }

    return {
      finalAnswer: "Could not reach a final answer within max turns.",
      turns: this.options.maxTurns,
      usedTools,
      usedResources,
      trace,
    };
  }
}
