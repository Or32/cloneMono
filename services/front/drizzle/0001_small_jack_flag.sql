ALTER TABLE "deployments_tbl" ADD COLUMN "gitCommit" text;--> statement-breakpoint
ALTER TABLE "deployments_tbl" ADD COLUMN "gitMessage" text;--> statement-breakpoint
ALTER TABLE "deployments_tbl" DROP COLUMN "description";