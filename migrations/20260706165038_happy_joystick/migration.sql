CREATE SEQUENCE "public"."tag_order_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE TABLE "completions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"username" text NOT NULL,
	"dect" text NOT NULL,
	"completedAt" timestamp DEFAULT now() NOT NULL,
	"lastLoadedAt" timestamp DEFAULT now() NOT NULL,
	"path" json,
	"claimed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "friends" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"friendToken" text UNIQUE,
	"name" text NOT NULL,
	"dect" numeric
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" text NOT NULL,
	"uuid" text NOT NULL,
	"hint" text,
	"authorId" uuid,
	"order" numeric DEFAULT nextval('tag_order_seq') NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE UNIQUE INDEX "completions_username_dect_idx" ON "completions" ("username","dect");--> statement-breakpoint
CREATE UNIQUE INDEX "friends_id_idx" ON "friends" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "friends_friendToken_idx" ON "friends" ("friendToken");--> statement-breakpoint
CREATE UNIQUE INDEX "tags_id_idx" ON "tags" ("id");--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_authorId_friends_id_fkey" FOREIGN KEY ("authorId") REFERENCES "friends"("id");