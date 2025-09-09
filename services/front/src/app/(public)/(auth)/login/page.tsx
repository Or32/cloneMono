"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleGitHubLogin = async () => {
    setSubmitting(true);
    setErrorText("");

    try {
      await signIn("github");
    } catch {
      setErrorText("Failed to sign in with GitHub. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to Latte Security</CardTitle>
          <CardDescription>Login securely using your GitHub account</CardDescription>
        </CardHeader>

        <CardContent>
          {errorText && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{errorText}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleGitHubLogin}
            className="w-full"
            disabled={submitting}
          >
            {submitting ? "Redirecting..." : "Sign in with GitHub"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
