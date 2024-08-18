ALTER TABLE "todos" RENAME COLUMN "author" TO "author_id";--> statement-breakpoint
ALTER TABLE "todos" DROP CONSTRAINT "todos_author_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos" ADD CONSTRAINT "todos_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
