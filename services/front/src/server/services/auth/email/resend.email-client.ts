import { Resend } from "resend";
import { ResendApiKey } from "./email.config";
import type { SendEmailInput } from "./email.types";

export class ResendEmailClient {
    static async send(input: SendEmailInput): Promise<void> {
        const client = new Resend(ResendApiKey);

        const result = await client.emails.send({
            from: input.from,
            to: input.to,
            subject: input.subject,
            react: input.react ?? undefined,
            html: input.react ? undefined : input.html,
        });

        if (result.error) {
            throw new Error(`Resend error: ${JSON.stringify(result.error)}`);
        }
    }
}
