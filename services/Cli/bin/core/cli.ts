import { publicCommands, commands } from "./commands.js";
import { showHelp } from "../commands/help/help.js";
import { authService } from "./auth/authService.js"; // ✅ use new slimmed auth

export class ContxtCLI {
  private command: string;
  private args: string[];

  constructor() {
    this.command = process.argv[2];
    this.args = process.argv.slice(3);
  }

  async run(): Promise<void> {
    try {
      await this.executeCommand();
    } catch (error) {
      console.error(`❌ Error: ${(error as Error).message}`);
      process.exit(1);
    }
  }

  private async executeCommand(): Promise<void> {
    // 🔐 Protect all commands except public ones
    if (!publicCommands.includes(this.command)) {
      authService.requireAuth(); // no need to await since it's synchronous
    }

    const cmd = commands[this.command];
    if (!cmd) return this.handleUnknownCommand();

    await cmd.action(this.args);
  }

  private handleUnknownCommand(): void {
    console.error(`❌ Unknown command: ${this.command}`);
    showHelp();
    process.exit(1);
  }
}
