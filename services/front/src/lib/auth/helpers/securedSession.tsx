import { redirect } from "next/navigation";
import { auth } from "../auth.config";


export async function securedSession() {
  const session = await auth();
  if (!session) redirect("/login");
  return session;
}