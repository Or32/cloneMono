import { CheckExistingAuth } from "./flow/CheckExistingAuth.js";
import { PromptSwitchTeam } from "./flow/PromptSwitchTeam.js";
import { OpenLoginPage } from "./flow/OpenLoginPage.js";
import { SaveAuth } from "./flow/SaveAuth.js";
import { PrintLoginHeader, PrintLoginSuccess } from "../../core/messages.js";


export class LoginHandler {
  async run(): Promise<void> {
    try {
      // 1️⃣ Print header
      PrintLoginHeader();

      // 2️⃣ Check if already logged in
      const session = CheckExistingAuth();

      if (session) {
        const shouldSwitch = await PromptSwitchTeam();
        if (!shouldSwitch) return;
      }

      // 3️⃣ Open login page
      const token = await OpenLoginPage();
      if (!token) throw new Error("Failed to login");

      // 4️⃣ Save token + metadata
      SaveAuth(token);

      // 5️⃣ Print success
      PrintLoginSuccess(token.metadata);

    } catch (error) {
      console.error(`❌ Login failed: ${(error as Error).message}`);
      process.exit(1);
    }
  }
}
