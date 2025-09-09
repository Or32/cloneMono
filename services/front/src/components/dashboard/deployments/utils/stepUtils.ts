import { DeploymentStep, DeploymentStepStatusEnum, deploymentStepTypeEnum } from "@/lib/db";
import { StepGroup } from "../types/stepTypes";

export function normalizeStatus(s?: string | null): DeploymentStepStatusEnum {
    const v = (s ?? "").toLowerCase();
    if (v === "failed" || v === "error") return "failed";
    if (v === "succeeded" || v === "success" || v === "completed" || v === "finished") return "succeeded";
    if (v === "warning") return "warning";
    return "starting"; // default to starting if we have a record but no final status yet
}

export function isRunningStatus(status?: string | null) {
    const v = normalizeStatus(status);
    return v === "starting" || v === "warning";
}

export function isSuccess(status?: string | null) {
    return normalizeStatus(status) === "succeeded";
}

export function isFail(status?: string | null) {
    return normalizeStatus(status) === "failed";
}

export function toDate(v?: string | Date | null) {
    if (!v) return null;
    const d = typeof v === "string" ? new Date(v) : v;
    return isNaN(d.getTime()) ? null : d;
}

export function msBetween(a?: string | Date | null, b?: string | Date | null) {
    const da = toDate(a);
    const db = toDate(b);
    if (!da || !db) return null;
    return Math.max(0, db.getTime() - da.getTime());
}

export function formatDateTime(v?: string | Date | null) {
    const d = toDate(v);
    return d ? d.toLocaleString() : "—";
}

export function formatDuration(ms: number | null) {
    if (ms == null) return "—";
    const s = Math.floor(ms / 1000);
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ${s % 60}s`;
    const h = Math.floor(m / 60);
    return `${h}h ${m % 60}m`;
}

export function badgeClasses(status?: string | null) {
    const s = normalizeStatus(status);
    if (s === "succeeded") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (s === "failed") return "bg-rose-50 text-rose-700 border-rose-200";
    if (s === "warning" || s === "starting") return "bg-sky-50 text-sky-700 border-sky-200";
    return "bg-gray-50 text-gray-600 border-gray-200";
}


export function toStepGroups(steps: DeploymentStep[]): StepGroup[] {
  const groups: StepGroup[] = [];

  for (const [type, groupSteps] of groupByType(steps)) {
    const sorted = sortSteps(groupSteps);
    const { startedAt, endedAt, lastStatus, isRunning, lastLog } = deriveGroupFields(sorted);

    groups.push({
      type,
      derivedStatus: lastStatus,
      isRunning,
      startedAt,
      endedAt,
      log: lastLog,
    });
  }

  return groups;
}

function groupByType(steps: DeploymentStep[]): Map<deploymentStepTypeEnum, DeploymentStep[]> {
  const byType = new Map<deploymentStepTypeEnum, DeploymentStep[]>();
  for (const step of steps) {
    if (!step.stepType) continue;
    const arr = byType.get(step.stepType) ?? [];
    arr.push(step);
    byType.set(step.stepType, arr);
  }
  return byType;
}

function sortSteps(steps: DeploymentStep[]): DeploymentStep[] {
  return [...steps].sort((a, b) =>
    new Date(a.startedAt ?? 0).getTime() - new Date(b.startedAt ?? 0).getTime()
  );
}

function deriveGroupFields(steps: DeploymentStep[]) {
  const first = steps[0];
  const last = steps.at(-1)!; // safe, steps not empty

  const startedAt = first?.startedAt ? new Date(first.startedAt) : null;
  const lastStartedAt = last?.startedAt ? new Date(last.startedAt) : null;

  const lastStatus = last?.status ?? "starting";
  const isRunning = lastStatus === "starting";
  const endedAt = isRunning ? new Date() : lastStartedAt;

  return {
    startedAt,
    endedAt,
    lastStatus,
    isRunning,
    lastLog: last?.log ?? "",
  };
}
