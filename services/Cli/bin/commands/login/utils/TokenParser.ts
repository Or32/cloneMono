import { LoginResponse } from "../../../core/fetch/contracts.js";

export function parseToken(payload: string | null): LoginResponse | null {
  if (!payload) return null;
  try {
    return JSON.parse(payload) as LoginResponse;
  } catch {
    return null;
  }
}
