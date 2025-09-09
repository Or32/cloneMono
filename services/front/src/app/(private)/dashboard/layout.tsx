import { ReactNode } from "react";
import { AppSidebar } from "@/components/dashboard/layout/sidebar/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { securedSession } from "@/lib/auth/helpers/securedSession";
import { DynamicBreadcrumbs } from "@/components/dashboard/layout/DynamicBreadcrumbs";
import { trpc } from "@/lib/trpc/client";

interface Props {
  children: ReactNode;
}



export default async function DashboardLayout({ children }: Props) {
  const session = await securedSession();


  return (
    <SidebarProvider className="min-h-screen flex bg-background text-foreground">
      <AppSidebar user={session.user}/>

      <SidebarInset className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2
                     bg-secondary border-b border-border px-4
                     transition-[width,height] ease-linear 
                     group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
        >
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 border-border"
          />

          <DynamicBreadcrumbs/>
        </header>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 pt-0 bg-background text-foreground">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
