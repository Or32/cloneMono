// core/App.ts
import readline from "readline";
import chalk from "chalk";

import { Lifecycle } from "./Lifecycle";
import type { ToolDescriptor, ResourceDescriptor } from "../types";
import { HttpMcpClient } from "../services/McpClient";
import { OpenRouterModelService } from "../services/OpenRouterService";

// read once from env
const DEBUG = process.env.DEBUG === "1";

export class App {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.blueBright("You> "),
  });

  private readonly lifecycle: Lifecycle;
  private readonly mcp: HttpMcpClient;

  constructor() {
    const model = new OpenRouterModelService();
    this.mcp = new HttpMcpClient();
    this.lifecycle = new Lifecycle(model, this.mcp, { maxTurns: 6 });
  }

  async start(): Promise<void> {
    console.log(chalk.green("💬 Adapter started (Ctrl+C to exit)"));
    await logCapabilities(this.mcp);

    this.rl.prompt();

    this.rl.on("line", async (line: string) => {
      const input = line.trim();
      if (!input) {
        this.rl.prompt();
        return;
      }

      try {
        const result = await this.lifecycle.handle(input);

        // pretty print
        console.log(chalk.yellowBright(`AI> ${result.finalAnswer}`));

        if (true) {
          console.log(chalk.gray("\n--- DEBUG TRACE ---"));
          result.trace.forEach((step) => {
            console.log(chalk.gray(`Turn ${step.index}:`));
            console.log(chalk.gray(`  Raw: ${step.modelRaw}`));
            if (step.decision) {
              console.log(chalk.gray(`  Decision: ${JSON.stringify(step.decision)}`));
            }
            if (step.toolResult) {
              console.log(chalk.gray(`  ToolResult: ${JSON.stringify(step.toolResult)}`));
            }
            if (step.resourceResult) {
              console.log(chalk.gray(`  ResourceResult: ${JSON.stringify(step.resourceResult)}`));
            }
          });
          console.log(chalk.gray("--- END DEBUG ---\n"));
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(chalk.red("❌ Error:"), msg);
      }

      this.rl.prompt();
    });

    this.rl.on("close", () => {
      console.log(chalk.cyan("👋 Goodbye!"));
      process.exit(0);
    });
  }
}

export async function logCapabilities(mcp: {
  listTools(): Promise<ToolDescriptor[]>;
  listResources(): Promise<ResourceDescriptor[]>;
}) {
  const [tools, resources] = await Promise.all([mcp.listTools(), mcp.listResources()]);

  console.log(chalk.magenta("\n🔧 Available Tools:"));
  if (tools.length === 0) {
    console.log("  (none)");
  } else {
    for (const t of tools) {
      console.log(chalk.magenta(`- ${t.name}`));
      if (t.description) console.log(`    📖 ${t.description}`);
    }
  }

  console.log(chalk.magenta("\n📚 Available Resources:"));
  if (resources.length === 0) {
    console.log("  (none)");
  } else {
    for (const r of resources) {
      console.log(chalk.magenta(`- ${r.uri}`));
      if (r.name)        console.log(`    📖 ${r.name}`);
      if (r.description) console.log(`    📝 ${r.description}`);
      if (r.mimeType)    console.log(`    📦 Type: ${r.mimeType}`);
    }
  }
}
