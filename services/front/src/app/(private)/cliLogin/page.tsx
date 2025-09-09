"use client";

import { useSession } from "next-auth/react";
import { trpc } from "@/lib/trpc/client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CliLoginPage() {
  const { data: session, update, status } = useSession();
  const { data: payload } = trpc.sdk.getCLIPayload.useQuery(undefined, {
    enabled: status === "authenticated",
  });
  const { data: teams } = trpc.teams.getAll.useQuery(undefined, {
    enabled: status === "authenticated",
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const [updating, setUpdating] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const redirectParam = searchParams.get("redirect");

  // Redirect to /login if not authenticated
  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      const encoded = encodeURIComponent(redirectParam ?? "");
      router.push(`/login?callbackUrl=/cli-login?redirect=${encoded}`);
    }
  }, [status, redirectParam, router]);

  async function handleLogin() {
    if (!selectedTeam) return;

    setUpdating(true);
    try {
      await update({ activeTeam: selectedTeam });

      if (redirectParam && payload) {
        setRedirecting(true); // 🔑 lock UI
        const redirectUrl = `${redirectParam}?payload=${encodeURIComponent(
          JSON.stringify(payload)
        )}`;
        window.location.href = redirectUrl;
        return; // don’t fall through to team selection again
      }

      router.refresh();
    } finally {
      setUpdating(false);
    }
  }

  // --- Render ---
  if (redirecting) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md rounded-xl bg-white shadow-md p-6 text-center">
          <h1 className="text-xl font-semibold mb-4">Redirecting…</h1>
          <p className="text-gray-600">
            ✅ Login successful. You can close this window and return to your CLI.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white shadow-md p-6 text-center">
        <h1 className="text-xl font-semibold mb-4">
          {redirectParam ? "Select Team for CLI Login" : "Switch Team"}
        </h1>

        {status === "loading" && <p>Loading session…</p>}

        {status === "authenticated" && teams && (
          <>
            <ul className="space-y-2 mb-4">
              {teams.map((team) => (
                <li key={team.id}>
                  <label
                    className={`flex items-center gap-2 w-full rounded-md border px-4 py-2 text-left cursor-pointer ${
                      selectedTeam === team.id
                        ? "bg-blue-100 border-blue-400 text-blue-800"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="team"
                      value={team.id}
                      checked={selectedTeam === team.id}
                      onChange={() => setSelectedTeam(team.id)}
                    />
                    {team.name}
                  </label>
                </li>
              ))}
            </ul>

            <button
              onClick={handleLogin}
              disabled={!selectedTeam || updating}
              className="w-full rounded-md bg-blue-600 text-white px-4 py-2 font-medium disabled:opacity-50"
            >
              {redirectParam ? "Login" : "Switch Team"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
