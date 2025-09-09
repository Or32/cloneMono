import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";

import CloudHostingIllustration from "@/../public/cloud-hosting-illustration.svg";
import AIIllustration from "@/../public/ai-illustration.svg";
import AIChatIllustration from "@/../public/ai-chat-illustration.svg";

type Feature = {
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
};

const features: Feature[] = [
  {
    title: "Build your own",
    description: "Build your MCP server using our SDK",
    image: AIIllustration,
    alt: "AI Illustration",
  },
  {
    title: "Host your own",
    description: "Host your own MCP server where all the fun is",
    image: CloudHostingIllustration,
    alt: "Cloud Hosting Illustration",
  },
  {
    title: "Use your own",
    description: "Use your server with any major AI chat",
    image: AIChatIllustration,
    alt: "AI Chat Illustration",
  },
];

export const Features = () => {
  return (
    <section className="py-28 overflow-clip relative bg-muted">
      <div className="container flex flex-col items-center justify-center text-center relative">
        {/* Section Heading */}
        <h2 className="title-heading tracking-tight text-4xl md:text-6xl mt-8 pb-3 font-bold">
          How does it work?
        </h2>
        <p className="normal-paragraph max-w-lg text-lg md:text-xl">
          Everything you need to build the perfect, tailor-made MCP server for your business.
        </p>

        {/* Feature Cards */}
        <div className="relative mt-16 flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="w-full max-w-sm drop-shadow-lg rounded-2xl border-2 flex items-center justify-center"
            >
              <CardContent className="w-72 h-72 flex items-center justify-center">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  className="drop-shadow-lg rounded-lg"
                />
              </CardContent>
              <CardFooter className="flex-col gap-2 text-center">
                <h3 className="tracking-tight text-2xl font-semibold">
                  {feature.title}
                </h3>
                <p className="normal-paragraph text-lg">
                  {feature.description}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
