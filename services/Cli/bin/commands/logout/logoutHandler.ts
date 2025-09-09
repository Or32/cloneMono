import { authService } from "../../core/auth/authService.js";
import { PrintLogoutHeader, PrintNotLoggedIn, PrintLogoutSuccess } from "../../core/messages.js";

export class LogoutHandler {
  async run(): Promise<void> {
    try {
      PrintLogoutHeader();

      if (!authService.isAuthenticated()) {
        PrintNotLoggedIn();
        return;
      }

      authService.logout();

      PrintLogoutSuccess();

    } catch (error) {
      console.error(`❌ Logout failed: ${(error as Error).message}`);
      process.exit(1);
    }
  }
}
