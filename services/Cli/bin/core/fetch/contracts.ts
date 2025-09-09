/** ========== Auth ========== */

import { UserMeta } from "../auth/authConfig.js";

export interface LoginResponse {
  token: string;
  metadata: UserMeta;
}

export interface VerifyTokenRequest {
  token: string;
}

export interface VerifyTokenResponse {
  success: boolean;
  message: string;
  token?: string; // JWT returned
}

