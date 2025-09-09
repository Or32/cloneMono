import * as React from 'react';
import {Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Tailwind, Text} from '@react-email/components';
import {interFont} from "@/lib/constants/constants";

export interface MagicLinkEmailTemplateProps {
    url: string;
    host: string;
}

export function MagicLinkEmailTemplate({ url, host }: MagicLinkEmailTemplateProps) {
    return (
            <Html>
                <Preview>Log in with this magic link to {host}</Preview>
                <Head />
                <Tailwind>
                    <Body className={`${interFont.className} bg-white`}>
                        <Section className="my-6 rounded-2xl bg-[#CE8B5C]/10 bg-[radial-gradient(circle_at_bottom_right,#CE8B5C_0%,transparent_60%)] p-8 text-center">
                            <Heading className="m-0 font-medium text-3xl text-[#ECCCB4]">
                                Your magic link
                            </Heading>
                            <Link className="my-4 font-bold text-5xl text-gray-900 leading-none" href={url}>
                                👉 Click here to sign in 👈
                            </Link>
                        </Section>
                        <Section className="pb-6 text-center">
                            <Text className="text-gray-900 text-xl leading-8">
                                Your friends over at the Latte Security team :)
                            </Text>
                            <Link
                                href={`https://${host}/dashboard`}
                                className="mt-4 block items-center text-center font-bold text-gray-900 text-sm no-underline"
                            >
                                Go to your dashboard
                            </Link>
                        </Section>
                    </Body>
                </Tailwind>
            </Html>
    );
}
