-- Step 1: Backfill gitCommit and gitMessage
UPDATE "deployments_tbl"
SET "gitCommit" = 'N/A'
WHERE "gitCommit" IS NULL;

UPDATE "deployments_tbl"
SET "gitMessage" = 'N/A'
WHERE "gitMessage" IS NULL;

-- Step 2: Add created_by with default value
ALTER TABLE "deployments_tbl"
ADD COLUMN "created_by" uuid DEFAULT '73693a40-1109-4248-abbe-1aaa6ab1b4ff';

-- Step 3: Backfill existing rows
UPDATE "deployments_tbl"
SET "created_by" = '73693a40-1109-4248-abbe-1aaa6ab1b4ff'
WHERE "created_by" IS NULL;

-- Step 4: Enforce NOT NULL & drop default (if you don’t want automatic assignment later)
ALTER TABLE "deployments_tbl"
ALTER COLUMN "created_by" SET NOT NULL,
ALTER COLUMN "created_by" DROP DEFAULT;

-- Step 5: Add foreign key constraint
ALTER TABLE "deployments_tbl"
ADD CONSTRAINT "deployments_tbl_created_by_user_tbl_id_fk"
FOREIGN KEY ("created_by")
REFERENCES "public"."user_tbl"("id")
ON DELETE CASCADE
ON UPDATE NO ACTION;

-- Step 6: Enforce NOT NULL for gitCommit and gitMessage
ALTER TABLE "deployments_tbl"
ALTER COLUMN "gitCommit" SET NOT NULL,
ALTER COLUMN "gitMessage" SET NOT NULL;
