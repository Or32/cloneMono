"use client";

import { NavMain } from "@/components/dashboard/layout/sidebar/components/NavMain";
import { NavUser } from "@/components/dashboard/layout/sidebar/components/NavUser";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { TeamSwitcher } from "@/components/ui/TeamSwitcher";
import { Team, User } from "@/lib/db";
import { NavbarItemType } from "@/types/layout/navbarItem";
import { Boxes, Cpu, KeySquare, Settings as SettingsIcon, ShieldCheck } from "lucide-react";

const pages = [
  { title: "Deployments", url: "/dashboard/deployments", icon: Boxes },
  { title: "Settings", url: "/dashboard/settings", icon: SettingsIcon },
  { title: "Security", url: "/dashboard/security", icon: ShieldCheck },
  { title: "API Keys", url: "/dashboard/api-keys", icon: KeySquare },
  { title: "AI Models", url: "/dashboard/ai-models", icon: Cpu },
] as const satisfies NavbarItemType[];

type Props = React.ComponentProps<typeof Sidebar> & {
  user: User;
};

export function AppSidebar({ user, ...props }: Props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher  />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={pages} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
