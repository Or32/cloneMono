import { DeploymentStepStatusEnum } from "@/lib/db";
import { CheckCircle2, Clock3, Loader2, TriangleAlert, XCircle } from "lucide-react";

interface DeploymentStepStatusIconProps {
  status: DeploymentStepStatusEnum;
}

const stepIcons: Record<
  DeploymentStepStatusEnum | "default",
  { icon: React.ElementType; className: string; spin?: boolean }
> = {
  starting: { icon: Loader2, className: "text-blue-500", spin: true },
  failed: { icon: XCircle, className: "text-red-500" },
  succeeded: { icon: CheckCircle2, className: "text-green-500" },
  warning: { icon: TriangleAlert, className: "text-orange-500" },
  default: { icon: Clock3, className: "text-muted-foreground" },
};

export function DeploymentStepStatusIcon({ status }: DeploymentStepStatusIconProps) {
  const { icon: Icon, className, spin } = stepIcons[status] ?? stepIcons.default;
  return <Icon className={`h-4 w-4 ${className} ${spin ? "animate-spin" : ""}`} />;
}
