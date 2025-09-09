import type { NextAuthConfig } from "next-auth";

export type RedirectCallback = NonNullable<NextAuthConfig["callbacks"]>["redirect"];

export const redirect: RedirectCallback = async ({ url, baseUrl }) => {
  try {
    const parsed = new URL(url, baseUrl);
    const params = Object.fromEntries(parsed.searchParams.entries());

    // ✅ Case 1: internal callback (relative path)
    if (params.callbackUrl) {
      const callbackUrl = params.callbackUrl;
      // Always resolve against baseUrl (stays inside the app)
      const dest = callbackUrl.startsWith("/")
        ? `${baseUrl}${callbackUrl}`
        : `${baseUrl}/${callbackUrl}`;

      return dest;
    }

    // ✅ Case 2: external redirect (absolute url, e.g. CLI localhost)
    if (params.redirect) {
      const redirectUrl = params.redirect;
      if (redirectUrl.startsWith("http://") || redirectUrl.startsWith("https://")) {

        return redirectUrl;
      }
    }

    // ✅ Fallback
    return `${baseUrl}/dashboard`;
  } catch {
    return `${baseUrl}/dashboard`;
  }
};
