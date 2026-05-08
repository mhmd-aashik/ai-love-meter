ALTER TABLE "love_results" ALTER COLUMN "person_a_hobby" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "love_results" ALTER COLUMN "person_b_hobby" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "love_results" ADD COLUMN "person_a_age" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "love_results" ADD COLUMN "person_b_age" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "love_results" ADD COLUMN "age_compatibility" text;--> statement-breakpoint
ALTER TABLE "love_results" ADD COLUMN "hobby_vibe" text;--> statement-breakpoint
ALTER TABLE "love_results" DROP COLUMN "person_a_date_of_birth";--> statement-breakpoint
ALTER TABLE "love_results" DROP COLUMN "person_a_favorite_color";--> statement-breakpoint
ALTER TABLE "love_results" DROP COLUMN "person_a_zodiac_sign";--> statement-breakpoint
ALTER TABLE "love_results" DROP COLUMN "person_a_personality";--> statement-breakpoint
ALTER TABLE "love_results" DROP COLUMN "person_b_date_of_birth";--> statement-breakpoint
ALTER TABLE "love_results" DROP COLUMN "person_b_favorite_color";--> statement-breakpoint
ALTER TABLE "love_results" DROP COLUMN "person_b_zodiac_sign";--> statement-breakpoint
ALTER TABLE "love_results" DROP COLUMN "person_b_personality";--> statement-breakpoint
ALTER TABLE "love_results" DROP COLUMN "birth_compatibility";--> statement-breakpoint
ALTER TABLE "love_results" DROP COLUMN "color_vibe";--> statement-breakpoint
ALTER TABLE "love_results" DROP COLUMN "zodiac_vibe";