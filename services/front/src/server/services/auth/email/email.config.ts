import { getRequiredEnv, SYSTEM_ENVS } from "@/lib/utils/env";

export const EmailSenderAddress = getRequiredEnv(SYSTEM_ENVS.DOMAIN_EMAIL) ?? "onboarding@resend.dev";
export const ResendApiKey = getRequiredEnv(SYSTEM_ENVS.RESEND_API_KEY);
