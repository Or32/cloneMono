"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // const email = searchParams.get("email") ?? "";
  // const inviteToken = searchParams.get("inviteToken") ?? undefined;

  // const [username, setUsername] = useState("");
  // const [teamName, setTeamName] = useState("");
  // const [errorText, setErrorText] = useState("");

  // const registerMutation = trpc.auth.register.useMutation({
  //   onSuccess: () => {
  //     router.push("/dashboard");
  //   },
  // onError: (error) => {
  //   // error has shape TRPCClientError<AppRouter>
  //   console.error("Registration failed:", error);
        
  //     setErrorText("Registration failed. Please try again.");
  //   },
  // });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!username) {
  //     setErrorText("Please choose a username");
  //     return;
  //   }
  //   if (!inviteToken && !teamName) {
  //     setErrorText("Please choose a team name");
  //     return;
  //   }

  //   setErrorText("");

  //   if (inviteToken) {
  //     registerMutation.mutate({
  //       email,
  //       username,
  //       inviteToken,
  //     });
  //   } else {
  //     registerMutation.mutate({
  //       email,
  //       username,
  //       teamName,
  //     });
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      {/* <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold tracking-tight">
            {inviteToken ? "Join your team" : "Create your team"}
          </CardTitle>
          <CardDescription>
            {inviteToken
              ? "Confirm your details to join the team."
              : "We just need a few details to set up your account and team."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {errorText && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{errorText}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={email} disabled className="bg-gray-100" />
            </div>

            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={registerMutation.isPending}
                required
              />
            </div>

            {!inviteToken && (
              <div className="space-y-2">
                <Label>Team Name</Label>
                <Input
                  type="text"
                  placeholder="Your team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  disabled={registerMutation.isPending}
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full mt-4"
              size="lg"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                inviteToken ? "Join Team" : "Complete Registration"
              )}
            </Button>
          </form>
        </CardContent>
      </Card> */}
    </div>
  );
}
