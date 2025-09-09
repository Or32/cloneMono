import { EmailSenderAddress } from "./email.config";
import { MagicLinkEmailTemplate } from "@/components/email/MagicLinkEmailTemplate";
import { ResendEmailClient } from "./resend.email-client";

export class MagicLinkEmailService {
  static async send(toEmail: string, loginUrl: string): Promise<void> {
    const host = new URL(loginUrl).host;

    await ResendEmailClient.send({
      from: EmailSenderAddress,
      to: toEmail,
      subject: "Log in to your Latte Security account",
      react: MagicLinkEmailTemplate({ url: loginUrl, host }),
    });
  }
}
