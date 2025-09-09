"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

function getPathSegments(pathname: string): string[] {
  return pathname.split("/").filter(Boolean);
}

export function DynamicBreadcrumbs() {
  const pathname = usePathname();
  const segments = getPathSegments(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem key={href}>
                {index === segments.length - 1 ? (
                  <BreadcrumbPage className="text-muted-foreground">{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
