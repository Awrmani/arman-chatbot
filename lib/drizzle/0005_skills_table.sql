CREATE TABLE IF NOT EXISTS "Skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(64) NOT NULL,
	"rating" integer DEFAULT 0 NOT NULL,
	"logoUrl" varchar(256) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);