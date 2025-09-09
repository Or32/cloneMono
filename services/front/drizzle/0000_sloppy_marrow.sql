CREATE TYPE "public"."deployment_step_type" AS ENUM('build', 'deploy', 'validate', 'cleanup');--> statement-breakpoint
CREATE TYPE "public"."deployment_step_status" AS ENUM('warning', 'starting', 'succeeded', 'failed');--> statement-breakpoint
CREATE TABLE "user_tbl" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account_tbl" (
	"user_id" uuid NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_tbl_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "session_tbl" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification_token_tbl" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verification_token_tbl_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE "live_debug_session_tbl" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "live_debug_session_tbl_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" uuid NOT NULL,
	"frontend_route" varchar(255),
	"local_route" varchar(255),
	"ttl" integer DEFAULT 3600 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "live_debug_session_tbl_local_route_unique" UNIQUE("local_route")
);
--> statement-breakpoint
CREATE TABLE "deployments_tbl" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"version" varchar(50) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "deployment_steps_tbl" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "deployment_steps_tbl_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"deployment_id" uuid NOT NULL,
	"step_type" "deployment_step_type" NOT NULL,
	"status" "deployment_step_status" NOT NULL,
	"log" text,
	"started_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "team_invites_tbl" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"team_id" uuid NOT NULL,
	"token" varchar(255) NOT NULL,
	"email" varchar(255),
	"expires_at" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "team_invites_tbl_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "team_members_tbl" (
	"team_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" varchar(50) DEFAULT 'member' NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "team_members_tbl_team_id_user_id_pk" PRIMARY KEY("team_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "teams_tbl" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_teams_tbl" (
	"user_id" uuid NOT NULL,
	"team_id" uuid NOT NULL,
	"role" varchar(50) DEFAULT 'member' NOT NULL,
	CONSTRAINT "user_teams_tbl_user_id_team_id_pk" PRIMARY KEY("user_id","team_id")
);
--> statement-breakpoint
CREATE TABLE "projects_tbl" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"team_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account_tbl" ADD CONSTRAINT "account_tbl_user_id_user_tbl_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_tbl"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_tbl" ADD CONSTRAINT "session_tbl_user_id_user_tbl_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_tbl"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "live_debug_session_tbl" ADD CONSTRAINT "live_debug_session_tbl_user_id_user_tbl_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_tbl"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deployments_tbl" ADD CONSTRAINT "deployments_tbl_project_id_projects_tbl_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects_tbl"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deployment_steps_tbl" ADD CONSTRAINT "deployment_steps_tbl_deployment_id_deployments_tbl_id_fk" FOREIGN KEY ("deployment_id") REFERENCES "public"."deployments_tbl"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_invites_tbl" ADD CONSTRAINT "team_invites_tbl_team_id_teams_tbl_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams_tbl"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members_tbl" ADD CONSTRAINT "team_members_tbl_team_id_teams_tbl_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams_tbl"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members_tbl" ADD CONSTRAINT "team_members_tbl_user_id_user_tbl_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_tbl"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_teams_tbl" ADD CONSTRAINT "user_teams_tbl_user_id_user_tbl_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_tbl"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_teams_tbl" ADD CONSTRAINT "user_teams_tbl_team_id_teams_tbl_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams_tbl"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_tbl" ADD CONSTRAINT "projects_tbl_team_id_teams_tbl_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams_tbl"("id") ON DELETE cascade ON UPDATE no action;