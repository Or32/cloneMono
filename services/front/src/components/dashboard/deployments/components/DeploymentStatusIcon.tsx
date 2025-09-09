// import { Loader2, XCircle, CheckCircle2, Clock3 } from "lucide-react";
// import { DeploymentStatusEnum } from "@/lib/db";

// interface DeploymentStatusIconProps {
//   status: DeploymentStatusEnum;
// }

// const statusIcons: Record<
//   DeploymentStatusEnum | "default",
//   { icon: React.ElementType; className: string; spin?: boolean }
// > = {
//   running: { icon: Loader2, className: "text-blue-500", spin: true },
//   failed: { icon: XCircle, className: "text-red-500" },
//   succeeded: { icon: CheckCircle2, className: "text-green-500" },
//   default: { icon: Clock3, className: "text-muted-foreground" },
// };

// export function DeploymentStatusIcon({ status }: DeploymentStatusIconProps) {
//   const { icon: Icon, className, spin } = statusIcons[status] ?? statusIcons.default;
//   return <Icon className={`h-4 w-4 ${className} ${spin ? "animate-spin" : ""}`} />;
// }
