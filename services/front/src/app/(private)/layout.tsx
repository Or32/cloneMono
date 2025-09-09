import { auth } from "@/lib/auth/auth.config";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
export default async function PrivateLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SessionProvider session={session}>{children}</SessionProvider>
    </ThemeProvider>
  );
}
