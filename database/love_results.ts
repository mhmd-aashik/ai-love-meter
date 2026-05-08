import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const loveResults = pgTable("love_results", {
  id: uuid("id").defaultRandom().primaryKey(),

  personAName: varchar("person_a_name", { length: 100 }).notNull(),
  personADateOfBirth: varchar("person_a_date_of_birth", {
    length: 20,
  }).notNull(),
  personAFavoriteNumber: integer("person_a_favorite_number").notNull(),
  personAFavoriteColor: varchar("person_a_favorite_color", { length: 50 }),
  personAZodiacSign: varchar("person_a_zodiac_sign", { length: 50 }),
  personAHobby: varchar("person_a_hobby", { length: 100 }),
  personAPersonality: text("person_a_personality"),

  personBName: varchar("person_b_name", { length: 100 }).notNull(),
  personBDateOfBirth: varchar("person_b_date_of_birth", {
    length: 20,
  }).notNull(),
  personBFavoriteNumber: integer("person_b_favorite_number").notNull(),
  personBFavoriteColor: varchar("person_b_favorite_color", { length: 50 }),
  personBZodiacSign: varchar("person_b_zodiac_sign", { length: 50 }),
  personBHobby: varchar("person_b_hobby", { length: 100 }),
  personBPersonality: text("person_b_personality"),

  relationshipType: varchar("relationship_type", { length: 50 }).notNull(),
  extraContext: text("extra_context"),

  score: integer("score").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  summary: text("summary").notNull(),

  nameCompatibility: text("name_compatibility"),
  birthCompatibility: text("birth_compatibility"),
  numberVibe: text("number_vibe"),
  colorVibe: text("color_vibe"),
  zodiacVibe: text("zodiac_vibe"),

  strengths: jsonb("strengths").$type<string[]>().notNull(),
  warnings: jsonb("warnings").$type<string[]>().notNull(),

  funnyLine: text("funny_line"),
  disclaimer: text("disclaimer"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type LoveResult = typeof loveResults.$inferSelect;
export type NewLoveResult = typeof loveResults.$inferInsert;
