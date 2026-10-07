CREATE TABLE "appointment_requests" (
	"id" serial PRIMARY KEY,
	"name" varchar(120) NOT NULL,
	"phone" varchar(40) NOT NULL,
	"service" varchar(140) NOT NULL,
	"preferred_date" varchar(40) NOT NULL,
	"time_window" varchar(40) NOT NULL,
	"message" text,
	"status" varchar(24) DEFAULT 'requested' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
