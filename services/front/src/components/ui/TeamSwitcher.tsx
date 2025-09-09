"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useRequiredSession } from "@/lib/auth/helpers/useRequiredSession";
import { Team } from "@/lib/db";
import { trpc } from "@/lib/trpc/client";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { CreateTeamModal } from "../dashboard/layout/sidebar/components/CreateTeamModal";

/* ---------- helpers ---------- */

function TeamAvatar({ name }: { name: string }) {
  return (
    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
      <span className="text-xs font-medium">{name[0]}</span>
    </div>
  );
}

/* ---------- main ---------- */

export function TeamSwitcher() {
  const { session, update } = useRequiredSession();
  const { data: teams = [], isLoading } = trpc.auth.getUserTeams.useQuery();
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const router = useRouter();
  const utils = trpc.useUtils();

  const activeTeam = session.activeTeam ? (teams.find((t) => t.id === session.activeTeam.id) ?? null) : null;

  async function handleSwitch(team: Team) {
    await update({ activeTeam: team.id }); // 🔑 rebuild JWT + session
    utils.invalidate();
      const path = window.location.pathname; // keep only path
  router.push(path);
    router.refresh();
  }

  /* ---------- UI ---------- */

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {isLoading ? (
          <SidebarMenuButton size="lg">Loading teams…</SidebarMenuButton>
        ) : !teams.length ? (
          <SidebarMenuButton size="lg" className="flex items-center gap-2" onClick={() => setCreateModalOpen(true)}>
            <span className="text-xs font-medium">No teams yet — create one</span>
          </SidebarMenuButton>
        ) : !activeTeam ? (
          <SidebarMenuButton size="lg" className="flex items-center gap-2" onClick={() => handleSwitch(teams[0])}>
            <span className="text-xs font-medium">Select a team to continue</span>
          </SidebarMenuButton>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <TeamAvatar name={activeTeam.name} />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{activeTeam.name}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                align="start"
                side="right"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-muted-foreground text-xs">Teams</DropdownMenuLabel>

                {teams.map((team, index) => (
                  <DropdownMenuItem key={team.id} onClick={() => handleSwitch(team)} className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      <span className="text-xs font-medium">{team.name[0]}</span>
                    </div>
                    {team.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="gap-2 p-2" onClick={() => setCreateModalOpen(true)}>
                  <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                    <Plus className="size-4" />
                  </div>
                  <div className="text-muted-foreground font-medium">Add team</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <CreateTeamModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
          </>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
