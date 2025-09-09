import Link from "next/link";
import { ArrowRight, CheckCircle2, Code2, Rocket  } from "lucide-react";
import { TypingAnimation, AnimatedSpan, Terminal } from "../magicui/terminal";

function KeywordBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="badge">
      {icon}
      {label}
    </span>
  );
}

/** simple code card + phone mock to echo Expo visual */
export function Visual() {
  return (
    <div className="relative isolate">
      {/* background blobs */}
      <div className="absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-[rgba(27,100,242,0.15)] blur-3xl" />
      <div className="absolute -right-10 top-14 h-[240px] w-[240px] rounded-full bg-[rgba(67,224,196,0.20)] blur-3xl" />

      <div className="relative mx-auto w-full max-w-4xl px-4">        {/* animated terminal */}
        <Terminal className="w-full max-w-full overflow-hidden border-4 rounded-2xl min-h-[300px] sm:min-h-[360px] md:min-h-[400px]">          <TypingAnimation>
            {"> npx latte create my-mcp-server"}
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
            {"> cd my-mcp-server && npm run dev"}
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

          <AnimatedSpan delay={7000} className="font-bold text-primary">
            ✨ Your MCP server is live & secured!
          </AnimatedSpan>
        </Terminal>
      </div>
    </div>
  );
}

export function Hero() {
  const headline = "Expo and EAS are";
  const subline = "an ecosystem of tools that help you";
  const paragraph =
    "Create universal native apps with React that run on Android, iOS, and the web. Iterate with confidence.";

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-20 lg:grid-cols-2">
        {/* left */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {headline}
            <br />
            {subline}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <KeywordBadge icon={<Code2 className="size-4" />} label="develop" />
            <KeywordBadge icon={<Rocket className="size-4" />} label="review" />
            <KeywordBadge icon={<Rocket className="size-4" />} label="deploy" />
          </div>

          <p className="mt-6 max-w-prose text-lg text-muted-foreground">{paragraph}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#" className="cta bg-primary text-primary-foreground hover:opacity-90">
              Get Started for Free
              <ArrowRight className="size-4" />
            </Link>
            <Link href="#" className="cta bg-muted text-foreground hover:bg-muted/80">
              Read the Docs
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* right */}
        <Visual />
      </div>

      {/* subtle progress bars like Expo */}
      <div className="mx-auto mb-16 flex max-w-6xl items-center gap-6 px-4 opacity-60">
        <div className="h-1 w-36 rounded-full bg-muted" />
        <div className="h-1 w-24 rounded-full bg-muted" />
        <div className="h-1 w-20 rounded-full bg-muted" />
      </div>
    </section>
  );
}
