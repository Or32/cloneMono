// env.ts
export enum SYSTEM_ENVS {
  NODE_ENV = "NODE_ENV",
  NEXT_PUBLIC_API_BASE = "NEXT_PUBLIC_API_BASE",
  AUTH_SECRET = "AUTH_SECRET",
  NOCODB_API_ROUTE = "NOCODB_API_ROUTE",
  NOCODB_API_KEY = "NOCODB_API_KEY",
  RESEND_API_KEY = "RESEND_API_KEY",
  DATABASE_URL = "DATABASE_URL",
  DOMAIN_EMAIL = "DOMAIN_EMAIL",
  AWS_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY",
  AWS_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID",
  AWS_REGION = "AWS_REGION",
  AWS_TEKTON_URL = "AWS_TEKTON_URL",
  ANTROPICS_API_KEY = "ANTROPICS_API_KEY",
  GITHUB_CLIENT_ID="GITHUB_CLIENT_ID",
  GITHUB_CLIENT_SECRET="GITHUB_CLIENT_SECRET",
}

export const getRequiredEnv = (name: SYSTEM_ENVS): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
};

// Validate all required envs on startup
export function ensureAllRequiredEnvVarsPresent(): void {
  for (const key of Object.values(SYSTEM_ENVS)) {
    getRequiredEnv(key); // throws if missing
  }
}

// Run at startup
ensureAllRequiredEnvVarsPresent();
