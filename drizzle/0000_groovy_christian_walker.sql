CREATE TABLE IF NOT EXISTS "categories" (
	"name" varchar(20) PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"amount" integer NOT NULL,
	"provider" varchar(40) NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"specifications" json,
	"user_id" uuid
);

CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"price" integer NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"cloudinary_ids" varchar(120)[] NOT NULL,
	"specifications" json NOT NULL,
	"user_id" uuid,
	"category" varchar(20),
	"phone" varchar(20) NOT NULL,
	"sub_category" varchar(20) NOT NULL,
	"state" varchar(20) NOT NULL,
	"city" varchar(20) NOT NULL,
	"negotiable" varchar(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"phone" varchar(120),
	"address" varchar(120),
	"country" varchar(120),
	"city" varchar(120),
	"postal_code" varchar(120) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(120) NOT NULL,
	"last_name" varchar(120) NOT NULL,
	"password_hash" varchar(120) NOT NULL,
	"email" varchar(120) NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"phone" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_categories_name_fk" FOREIGN KEY ("category") REFERENCES "categories"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
