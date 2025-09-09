"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/Loader";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {session.user?.email}!</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Welcome</CardTitle>
              <CardDescription>Youre successfully authenticated with a magic link.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              This is your protected dashboard. Only authenticated users can see this page.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Info</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">Email:</span>
                <p>{session.user?.email}</p>
              </div>
              {session.user?.name && (
                <div>
                  <span className="font-medium">Name:</span>
                  <p>{session.user.name}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Quick navigation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/deployments">
                <Button variant="default" className="w-full">
                  View Deployments
                </Button>
              </Link>
              <Button onClick={() => signOut({ callbackUrl: "/login" })} variant="outline" className="w-full">
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Content</CardTitle>
              <CardDescription>This area is ready for your application-specific features</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              Add widgets, charts, or links here once your app is ready.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
