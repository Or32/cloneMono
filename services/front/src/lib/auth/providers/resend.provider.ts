import { EmailSenderAddress } from "@/server/services/auth/email/email.config";
import { ResendSendVerificationParams } from "@/server/services/auth/email/email.types";
import { MagicLinkEmailService } from "@/server/services/auth/email/magic-link.service";
import Resend from "next-auth/providers/resend";

export const resendProvider = Resend({
    from: EmailSenderAddress,
    sendVerificationRequest: handleSendVerification,
});

async function handleSendVerification(
    params: ResendSendVerificationParams
): Promise<void> {
    const { identifier: receiverEmail, url: loginUrl, provider } = params;

    const from = provider?.from ?? EmailSenderAddress;
    if (!from) throw new Error("Missing sender address");

    await MagicLinkEmailService.send(receiverEmail, loginUrl);
}