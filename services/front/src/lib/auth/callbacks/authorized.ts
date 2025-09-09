import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export type AuthorizedCallback = NonNullable<NextAuthConfig["callbacks"]>["authorized"];

export const authorized: AuthorizedCallback = ({ auth, request }) => {
  const isLoggedIn = Boolean(auth?.user);
  const pathname = request.nextUrl.pathname;

  const onDashboard = pathname.startsWith("/dashboard");
  const onLogin = pathname.startsWith("/login");

  if (onDashboard) return isLoggedIn;

  if (onLogin && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return true;
};
