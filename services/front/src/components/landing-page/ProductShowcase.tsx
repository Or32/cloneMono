import * as React from "react";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

export const ProductShowcase = () => {
  return (
          <Terminal className="bg-white min-w-2xl min-h-[440px] border-4">
            <TypingAnimation>
              &gt; npx latte create my-mcp-server
            </TypingAnimation>
            <AnimatedSpan delay={1000} className="text-primary">
              📁 Creating Project: my-mcp-server
            </AnimatedSpan>
            <AnimatedSpan delay={1500} className="text-primary">
              📦 Installing secure dependencies...
            </AnimatedSpan>
            <AnimatedSpan delay={2000} className="text-primary">
              🔐 Generating API keys & setting up auth...
            </AnimatedSpan>
            <AnimatedSpan delay={2500} className="text-primary">
              ✅ Project Created Successfully
            </AnimatedSpan>

            <br />

            <TypingAnimation delay={3000}>
              &gt; cd my-mcp-server && npm run dev
            </TypingAnimation>
            <AnimatedSpan delay={4000} className="text-primary">
              🚀 Starting MCP development server...
            </AnimatedSpan>
            <AnimatedSpan delay={4500} className="text-primary">
              📡 Local server running on http://localhost:3009
            </AnimatedSpan>
            <AnimatedSpan delay={5000} className="text-primary">
              🔄 Hot reload enabled
            </AnimatedSpan>
            <AnimatedSpan delay={5500} className="text-primary">
              🛡 Query optimization activated
            </AnimatedSpan>
            <AnimatedSpan delay={6000} className="text-primary">
              🌐 Public URL: https://my-mcp-server.lattesecurity.com
            </AnimatedSpan>
            <AnimatedSpan delay={6500} className="text-primary">
              🔗 Dashboard: https://lattesecurity.com/my-mcp-server
            </AnimatedSpan>

            <br />

            <AnimatedSpan delay={7000} className="text-primary font-bold">
              ✨ Your MCP server is live & secured!
            </AnimatedSpan>
          </Terminal>
  );
};
