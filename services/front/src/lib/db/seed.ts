// src/lib/db/seed.ts
import "dotenv/config";
import { db } from ".";
import { usersTable } from "./schemas/auth/user.table";
import { deploymentsTable } from "./schemas/deployments/deployments.table";
import { deploymentStepsTable } from "./schemas/deployments/deploymentSteps.table";
import { DeploymentStepStatusEnum } from "./schemas/deployments/deploymentStepStatus.enum";
import { deploymentStepTypeEnum } from "./schemas/deployments/deploymentStepType.enum";


/* ---------- tiny time helpers ---------- */
const minutesFrom = (base: Date, minutes: number) => new Date(base.getTime() + minutes * 60_000);

/* ---------- factories (avoid repetition) ---------- */
type StepPlan = {
  type: deploymentStepTypeEnum;
  status: DeploymentStepStatusEnum;
  offsetMin: number; // when this step starts relative to base
  log: string;
};

const makeSteps = (deploymentId: number, base: Date, plan: StepPlan[]) =>
  plan.map((s) => ({
    deploymentId,
    stepType: s.type,
    status: s.status,
    log: s.log,
    startedAt: minutesFrom(base, s.offsetMin)
  }));

/* ---------- scenarios ---------- */
const successfulRelease = (deploymentId: number, base: Date) =>
  makeSteps(deploymentId, base, [
    // Build
    { type: "build", status: "starting", offsetMin: 0, log: "Build started." },
    { type: "build", status: "succeeded", offsetMin: 2, log: "Build completed. Tests passed." },

    // Deploy
    { type: "deploy", status: "starting", offsetMin: 7, log: "Deploy step started." },
    { type: "deploy", status: "succeeded", offsetMin: 9, log: "Deployed to production." },

    // Validate
    { type: "validate", status: "starting", offsetMin: 12, log: "Running health checks…" },
    { type: "validate", status: "succeeded", offsetMin: 13, log: "Health checks OK." },

    // Cleanup
    { type: "cleanup", status: "starting", offsetMin: 15, log: "Cleaning temporary artifacts…" },
    { type: "cleanup", status: "succeeded", offsetMin: 16, log: "Cleanup finished." }
  ]);

const failedWithRollback = (deploymentId: number, base: Date) =>
  makeSteps(deploymentId, base, [
    // Build
    { type: "build", status: "starting", offsetMin: 0, log: "Build started." },
    { type: "build", status: "succeeded", offsetMin: 2, log: "Build completed." },

    // Deploy
    { type: "deploy", status: "starting", offsetMin: 6, log: "Deploy step started." },
    { type: "deploy", status: "warning", offsetMin: 7, log: "Slow image pull; continuing." },

    // Validate fails
    { type: "validate", status: "starting", offsetMin: 9, log: "Running integration checks…" },
    { type: "validate", status: "failed", offsetMin: 10, log: "DB timeout. Rolling back." },
  ]);

/** Active run to exercise live UI (status = starting). */
/** Active run to exercise live UI (status = starting). */
const currentlyRunning = (deploymentId: number, base: Date) =>
  makeSteps(deploymentId, base, [
    // Build step (completed)
    { type: "build", status: "starting", offsetMin: 0, log: "Build started." },
    { type: "build", status: "succeeded", offsetMin: 3, log: "Build completed successfully." },

    // Deploy step (still running)
    { type: "deploy", status: "starting", offsetMin: 6, log: "Deploying… streaming logs." },
  ]);


/** Showcase: every status visible together for UI testing. */
const statusShowcase = (deploymentId: number, base: Date) =>
  makeSteps(deploymentId, base, [
    { type: "build", status: "starting", offsetMin: 0, log: "Build queued / running…" },
    { type: "build", status: "succeeded", offsetMin: 1, log: "Build finished (mock)." },

    { type: "deploy", status: "starting", offsetMin: 2, log: "Deploy initiated (mock)." },
    { type: "deploy", status: "warning", offsetMin: 3, log: "Retrying image layer…" },

    { type: "validate", status: "starting", offsetMin: 6, log: "Smoke tests running…" },
    { type: "validate", status: "succeeded", offsetMin: 7, log: "Smoke tests OK (mock)." },

    { type: "cleanup", status: "starting", offsetMin: 9, log: "Cleanup in progress…" },
    { type: "cleanup", status: "failed", offsetMin: 10, log: "Cleanup script missing permission." }
  ]);


/* ---------- seed ---------- */
async function seed() {
  console.log("🌱 Seeding…");

  try {
    console.log("🧹 Clearing…");
    await db.delete(deploymentStepsTable);
    await db.delete(deploymentsTable);
    await db.delete(usersTable);

    console.log("👤 User…");
    const [user] = await db
      .insert(usersTable)
      .values({
        id: "demo-user",
        name: "Demo User",
        email: "or@gurinv.com",
        emailVerified: new Date(),
        image: "https://avatars.githubusercontent.com/u/demo?v=4"
      })
      .returning();

    console.log("🚀 Deployments…");
    const now = new Date();
    const [dOk, dFail, dRun, dShow] = await db
      .insert(deploymentsTable)
      .values([
        {
          userId: user.id,
          name: "Successful Production Release",
          description: "All steps completed (happy path).",
          createdAt: minutesFrom(now, -60),
          updatedAt: minutesFrom(now, -40),
          version: '1.0.1',
          status: "succeeded"
        },
        {
          userId: user.id,
          name: "Rollback After Failure",
          description: "Validate failed; rollback succeeded.",
          createdAt: minutesFrom(now, -35),
          updatedAt: minutesFrom(now, -20),
          version: '1.0.1',
          status: "failed"
        },
        {
          userId: user.id,
          name: "Currently Running Nightly",
          description: "Deployment running with live logs.",
          createdAt: minutesFrom(now, -10),
          updatedAt: minutesFrom(now, -2),
          version: '1.0.1',
          status: "running"
        },
        {
          userId: user.id,
          name: "Status Showcase (UI Test)",
          description: "Shows starting / warning / succeeded / failed at once.",
          createdAt: minutesFrom(now, -5),
          updatedAt: minutesFrom(now, -1),
          version: '1.0.1',
          status: "succeeded"
        }
      ])
      .returning();

    console.log("📋 Steps…");
    const steps = [
      ...successfulRelease(dOk.id, minutesFrom(now, -60)),
      ...failedWithRollback(dFail.id, minutesFrom(now, -35)),
      ...currentlyRunning(dRun.id, minutesFrom(now, -10)),
      ...statusShowcase(dShow.id, minutesFrom(now, -5))
    ];
    await db.insert(deploymentStepsTable).values(steps);

    console.log("🎉 Done.");
  } catch (e) {
    console.error("❌ Seed error:", e);
    process.exit(1);
  }

  process.exit(0);
}

seed();
