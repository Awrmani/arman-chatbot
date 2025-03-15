CREATE TABLE IF NOT EXISTS "Company" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(64) NOT NULL,
	"logoUrl" varchar(256)
);
--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "companyId" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "User" ADD CONSTRAINT "User_companyId_Company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
