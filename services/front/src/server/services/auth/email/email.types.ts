import Resend from "next-auth/providers/resend";

export type SendEmailInput = {
  from: string;
  to: string;
  subject: string;
  html?: string;
  react?: React.ReactElement;
};


type ResendConfig = Parameters<typeof Resend>[0];
type SendVerification = NonNullable<ResendConfig["sendVerificationRequest"]>;
export type ResendSendVerificationParams = Parameters<SendVerification>[0];