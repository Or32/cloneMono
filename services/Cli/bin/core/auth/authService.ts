import { authConfig, UserMeta } from "./authConfig.js";

export class AuthService {
  isAuthenticated(): boolean {
    return !!authConfig.getToken();
  }

  /** Returns the locally cached user metadata (safe JSON, not encrypted JWE). */
  getSession(): UserMeta {
    const meta = authConfig.getMeta();
    if (!meta) {
      throw new Error("Not authenticated. Run `nevo login` first.");
    }
    return meta;
  }

  /** Returns the raw encrypted JWE token (for API requests). */
  getToken(): string {
    const token = authConfig.getToken();
    if (!token) throw new Error("Not authenticated. Run `nevo login` first.");
    return token;
  }

  logout(): void {
    authConfig.clear();
    console.log("👋 Logged out");
  }

  requireAuth(): void {
    if (!this.isAuthenticated()) {
      console.error("❌ Authentication required. Run `nevo login` first.");
      process.exit(1);
    }
  }
}

export const authService = new AuthService();
