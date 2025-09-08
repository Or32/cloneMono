// OpenRouterModelService.ts
import type { ChatMessage, ModelService } from "../types";
import { CONFIG } from "../config";

// Minimal OpenRouter response shape we care about
type ORMessage = { role: string; content: string | null };
type ORChoice = { index: number; message: ORMessage };
type ORResponse = { choices?: ORChoice[] };

export type OpenRouterModelOptions = {
  apiUrl: string;           // e.g., "https://openrouter.ai/api/v1/chat/completions"
  apiKey: string;           // required
  model: string;            // e.g., "openai/gpt-4o-mini"
  responseFormatJson?: boolean; // when true, ask OpenRouter for JSON output
};


/**
 * A tiny, focused service that ONLY talks to the model.
 * Implements ModelService.complete(messages) -> raw model string.
 */
export class OpenRouterModelService implements ModelService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly model: string;
  private readonly responseFormatJson: boolean;

  constructor(opts: Partial<OpenRouterModelOptions> = {}) {
    this.apiUrl = opts.apiUrl ?? CONFIG.openRouter.apiUrl ?? "https://openrouter.ai/api/v1/chat/completions";
    this.apiKey = opts.apiKey ?? CONFIG.openRouter.apiKey ?? "";
    this.model  = opts.model  ?? CONFIG.openRouter.model  ?? "";
    this.responseFormatJson = !!opts.responseFormatJson;

    if (!this.apiKey) throw new Error("OpenRouterModelService: apiKey is required");
    if (!this.model) throw new Error("OpenRouterModelService: model is required");
  }

  async complete(messages: ChatMessage[]): Promise<string> {
    const body: Record<string, unknown> = {
      model: this.model,
      messages,
    };

    if (this.responseFormatJson) {
      body.response_format = { type: "json_object" };
    }

    const res = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`OpenRouter HTTP ${res.status}: ${text}`);
    }

    const data = (await res.json().catch(() => ({}))) as ORResponse;
    const content = data?.choices?.[0]?.message?.content ?? "";
    return typeof content === "string" ? content : "";
  }
}
