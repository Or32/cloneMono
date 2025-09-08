import { ModelDecision } from "../types";

/**
 * Narrowly validate that an arbitrary value matches ModelDecision.
 * Kept here (not in types) to avoid coupling types with runtime code.
 */
function isModelDecision(value: unknown): value is ModelDecision {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  const action = v.action;

  if (action === "final") {
    return typeof v.finalAnswer === "string";
  }
  if (action === "use_tool") {
    if (typeof v.tool !== "string") return false;
    const a = v.arguments;
    return a === null || typeof a === "object";
  }
  if (action === "use_resource") {
    return typeof v.uri === "string";
  }
  return false;
}

/**
 * Extract the most likely JSON object from a raw model string.
 * Resilient to code fences or stray prose.
 */
export function extractJsonObject(raw: string): string | null {
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fence?.[1]) return fence[1].trim();

  const start = raw.indexOf("{");
  if (start === -1) return null;

  let depth = 0;
  for (let i = start; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === "{") depth++;
    if (ch === "}") depth--;
    if (depth === 0) return raw.slice(start, i + 1).trim();
  }
  return null;
}

export function tryParseDecision(rawResponse: string):
  | { ok: true; decision: ModelDecision }
  | { ok: false; error: string } {
  const candidate = extractJsonObject(rawResponse) ?? rawResponse.trim();

  try {
    const parsed = JSON.parse(candidate);
    if (!isModelDecision(parsed)) {
      return { ok: false, error: "Parsed JSON does not match required schema." };
    }
    return { ok: true, decision: parsed };
  } catch {
    return { ok: false, error: "Failed to parse JSON from model response." };
  }
}
