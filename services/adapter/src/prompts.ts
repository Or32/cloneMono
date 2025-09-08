// prompts.ts
import {
  ChatMessage,
  ResourceDescriptor,
  ToolDescriptor,
} from "./types";

export const RESPONSE_SCHEMA_TEXT = `
Respond with *only* this JSON (no Markdown fences, no extra text):

{
  "action": "final" | "use_tool" | "use_resource",

  // when action = "final":
  "finalAnswer": string,

  // when action = "use_tool":
  "tool": string,
  "arguments": object | null,

  // when action = "use_resource":
  "uri": string,

  // optional (any action):
  "rationale": string,
  "progress": string
}
`.trim();

export function buildHandshakeSystemMessage(): ChatMessage {
  const instructions = [
    "You are a STRICT ACTION PLANNER. You execute tasks, not conversations.",
    "NEVER reply in natural language or give advice.",
    "You reply with ONE JSON object that exactly matches the schema below.",
    "Do not add Markdown, code fences, explanations, or extra text.",
    "",
    "BEHAVIOR RULES:",
    "- Take immediate action when possible",
    "- If user mentions completing/finishing something, use tools to mark it done",
    "- If user requests information, use tools to fetch it",
    "- If user adds tasks, use tools to create them",
    "- Only use 'final' action for direct confirmations or when no tools help",
    "",
    "Allowed actions:",
    "- { \"action\": \"final\", \"finalAnswer\": string } // ONLY for confirmations",
    "- { \"action\": \"use_tool\", \"tool\": string, \"arguments\": object|null }",
    "- { \"action\": \"use_resource\", \"uri\": string }",
    "",
    "STRICT Rules:",
    "- Always prefer tool actions over final answers",
    "- If you can do something with a tool, DO IT",
    "- Final answers should be brief status updates only",
    "- Never give advice, suggestions, or explanations",
    "- Never invent tool names or resources",
    "- Never write text outside JSON",
    "- Stop once you output a final answer",
    "",
    "Response schema (must always match exactly):",
    RESPONSE_SCHEMA_TEXT,
  ].join("\n");

  return { role: "system", content: instructions };
}

export function buildContextMessage(
  tools: ToolDescriptor[],
  resources: ResourceDescriptor[]
): ChatMessage {
  const context = {
    behavior: {
      loopPolicy: "Execute one action at a time. Prefer tools over final answers. Only finalize for confirmations.",
      responseStyle: "Action-first. No advice. No explanations. Execute immediately.",
    },
    responseSchema: {
      action: ["final", "use_tool", "use_resource"],
      final: { finalAnswer: "Brief confirmation only" },
      use_tool: { tool: "string", arguments: "object|null" },
      use_resource: { uri: "string" },
      optional: ["rationale", "progress"],
    },
    available: {
      tools: tools.map((t) => ({
        name: t.name,
        description: t.description,
        input: t.input ?? null,
      })),
      resources: resources.map((r) => ({
        uri: r.uri,
        name: r.name ?? null,
        description: r.description ?? null,
        mimeType: r.mimeType ?? null,
      })),
    },
  };

  return { role: "system", content: JSON.stringify(context, null, 2) };
}

export function buildObjectiveMessage(userPrompt: string): ChatMessage {
  const text = [
    "EXECUTE:",
    userPrompt,
    "",
    "Respond with ONE JSON object that exactly matches the schema.",
    "ACTION PRIORITY:",
    "1. If user completed something → use tool to mark done",
    "2. If user wants to see data → use tool/resource to fetch",
    "3. If user adds task → use tool to create",
    "4. Only use final answer for brief confirmations",
    "",
    "Rules:",
    "- { \"action\": \"use_tool\", \"tool\": \"...\", \"arguments\": { ... } } // Preferred",
    "- { \"action\": \"use_resource\", \"uri\": \"...\" } // For data access",
    "- { \"action\": \"final\", \"finalAnswer\": \"Done\" } // Only for confirmations",
    "",
    "Never write explanations. Execute immediately.",
  ].join("\n");

  return { role: "user", content: text };
}

export const Prompts = {
  formatError: (): ChatMessage => ({
    role: "assistant",
    content: [
      "FORMAT_ERROR: Invalid JSON schema.",
      "Re-send **only** valid JSON matching the exact schema.",
      "No explanations. No prose. No Markdown.",
    ].join("\n"),
  }),

  unknownTool: (tool: string): ChatMessage => ({
    role: "assistant",
    content: [
      "TOOL_ERROR: Unknown tool.",
      `"${tool}" not available.`,
      "Use only listed tools. Re-send valid JSON.",
    ].join("\n"),
  }),

  unknownResource: (uri: string): ChatMessage => ({
    role: "assistant",
    content: [
      "RESOURCE_ERROR: Unknown resource.",
      `"${uri}" not available.`,
      "Use only listed URIs. Re-send valid JSON.",
    ].join("\n"),
  }),

  afterToolResult: (): ChatMessage => ({
    role: "user",
    content: [
      "Tool executed.",
      "If task complete → final answer (brief confirmation)",
      "If more needed → next tool/resource action",
      "JSON only. No explanations.",
    ].join("\n"),
  }),

  afterResourceResult: (): ChatMessage => ({
    role: "user",
    content: [
      "Resource loaded.",
      "If sufficient → final answer (brief confirmation)", 
      "If more needed → next tool/resource action",
      "JSON only. No explanations.",
    ].join("\n"),
  }),
};

// Additional helper for even stricter enforcement
export const StrictPrompts = {
  enforceAction: (): ChatMessage => ({
    role: "system",
    content: [
      "CRITICAL: You are NOT a conversational AI.",
      "EXECUTE actions immediately.",
      "User says 'finished homework' → use todo.toggle tool",
      "User says 'show todos' → use todo tool to list",
      "User says 'add todo' → use todo.create tool",
      "NO advice. NO suggestions. NO explanations.",
      "JSON actions only.",
    ].join("\n"),
  }),
};