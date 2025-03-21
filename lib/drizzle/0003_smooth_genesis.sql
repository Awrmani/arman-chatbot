CREATE TABLE IF NOT EXISTS "Project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(256),
	"logoUrl" varchar(256),
	"startDate" date NOT NULL,
	"endDate" date
);
