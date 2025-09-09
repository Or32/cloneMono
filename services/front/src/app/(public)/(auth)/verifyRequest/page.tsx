"use client";
import AuthCard from "@/components/auth/AuthCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Mail, ExternalLink, ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const COMMON_WEBMAIL_LINKS = [
  { label: "Gmail", href: "https://mail.google.com" },
  { label: "Outlook", href: "https://outlook.live.com/mail" },
  { label: "Yahoo Mail", href: "https://mail.yahoo.com" },
];

export default function VerifyRequest() {
    const [isResending, setIsResending] = useState(false);

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => setIsResending(false), 2000);
  };

  
  return (
<AuthCard
      title="Check your email"
      description="We sent you a sign-in link. Follow it to continue."
    >

      <div className="space-y-4">
        <div className="text-sm text-muted-foreground text-center">
          Open your email provider:
        </div>
        
        <div className="flex gap-2">
          {COMMON_WEBMAIL_LINKS.map(({ label, href }) => (
            <Button
              key={label}
              asChild
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1"
              >
                {label}
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t">
        <Button variant="ghost" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <Button 
          onClick={handleResend}
          disabled={isResending}
        >
          {isResending ? (
            <>
              <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            "Send again"
          )}
        </Button>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Having trouble? <button className="text-primary hover:underline">Contact support</button>
      </div>
    </AuthCard>
  );
}
