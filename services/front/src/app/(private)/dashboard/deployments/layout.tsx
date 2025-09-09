"use client";

import { trpc } from "@/lib/trpc/client";
import { Inbox, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";

/* ---------- helpers ---------- */

function buildDeploymentHref(pathname: string, id: string): string {
  const url = new URL(pathname, "http://dummy"); // dummy origin for URL parsing
  url.searchParams.set("id", String(id));
  return url.pathname + "?" + url.searchParams.toString();
}

function formatDate(value?: string | Date | null): string {
  if (!value) return "—";
  const d = typeof value === "string" ? new Date(value) : value;
  return isNaN(d.getTime()) ? "—" : d.toLocaleString();
}

/* ---------- layout ---------- */

export default function DeploymentsLayout({ children }: { children: ReactNode }) {
  const { data: deployments, isLoading } = trpc.deployment.getAll.useQuery();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeId = useMemo(() => {
    const id = searchParams.get("id");
    return id ? id : null;
  }, [searchParams]);

  const hasDeployments = deployments && deployments.length > 0;

  let sidebarContent: ReactNode;
  if (isLoading) {
    sidebarContent = (
      <div className="flex items-center justify-center h-20 text-muted-foreground">
        <Loader2 className="animate-spin" size={20} />
      </div>
    );
  } else if (!hasDeployments) {
    sidebarContent = (
    <Card className="flex h-full w-full items-center justify-center shadow-none border-none">
      <CardContent className="flex flex-col items-center justify-center gap-2 py-10 text-center text-muted-foreground">
        <Inbox className="h-10 w-10 opacity-50" />
        <p className="text-sm">No deployments found</p>
      </CardContent>
    </Card>
    );
  } else {
    sidebarContent = (
      <ul>
        {deployments!.map((d) => {
          const href = buildDeploymentHref(pathname, d.id);
          const isActive = activeId === d.id;

          return (
            <li key={d.id} className="border-b border-sidebar-border">
              <Link
                href={href}
                prefetch
                className={[
                  "flex items-center gap-3 px-4 py-3 transition-colors truncate",
                  "text-sidebar-foreground",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent-hover",
                ].join(" ")}
              >
                {/* Status Icon */}
                {/* <DeploymentStatusIcon status={d.status} /> */}

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate text-foreground">
                    {d.name}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-medium text-muted-foreground">
                      v{d.version || "1.0.4"}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {formatDate(d.createdAt)}
                    </span>
                      <span className="text-[11px] text-muted-foreground">
                      {d.projectName}
                    </span>
                  </div>
                </div>

                {/* Active marker */}
                {isActive && (
                  <span className="h-2 w-2 rounded-full bg-muted-foreground shrink-0" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="w-80 overflow-y-auto border-r border-sidebar-border bg-sidebar">
        {sidebarContent}
      </aside>

      <main className="flex-1 overflow-y-auto bg-background text-foreground">
        {children}
      </main>
    </div>
  );
}
