import { authConfig } from "../../../core/auth/authConfig.js";

export function SaveAuth(token: { token: string; metadata: any }) {
  authConfig.setAuth(token.token, token.metadata);
}
