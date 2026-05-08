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
  personAAge: integer("person_a_age").notNull(),
  personAFavoriteNumber: integer("person_a_favorite_number").notNull(),
  personAHobby: varchar("person_a_hobby", { length: 100 }).notNull(),

  personBName: varchar("person_b_name", { length: 100 }).notNull(),
  personBAge: integer("person_b_age").notNull(),
  personBFavoriteNumber: integer("person_b_favorite_number").notNull(),
  personBHobby: varchar("person_b_hobby", { length: 100 }).notNull(),

  relationshipType: varchar("relationship_type", { length: 50 }).notNull(),
  extraContext: text("extra_context"),

  score: integer("score").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  summary: text("summary").notNull(),

  nameCompatibility: text("name_compatibility"),
  ageCompatibility: text("age_compatibility"),
  numberVibe: text("number_vibe"),
  hobbyVibe: text("hobby_vibe"),

  strengths: jsonb("strengths").$type<string[]>().notNull(),
  warnings: jsonb("warnings").$type<string[]>().notNull(),

  funnyLine: text("funny_line"),
  disclaimer: text("disclaimer"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type LoveResult = typeof loveResults.$inferSelect;
export type NewLoveResult = typeof loveResults.$inferInsert;
