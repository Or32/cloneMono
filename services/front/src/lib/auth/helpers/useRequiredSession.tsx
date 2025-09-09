import { useSession as useNextAuthSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function useRequiredSession() {
  const { data: session, update, status } = useNextAuthSession();

  if (!session) {
    const callbackUrl = encodeURIComponent(window.location.pathname + window.location.search);
    redirect(`/login?callbackUrl=${callbackUrl}`);
  }

  return { session, update , status};
}
