import { z } from "zod";

export const personDetailsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  favoriteNumber: z.coerce.number().int().min(1, "Favorite number is required"),
  favoriteColor: z.string().optional(),
  zodiacSign: z.string().optional(),
  hobby: z.string().optional(),
  personality: z.string().optional(),
});

export const analyzeLoveSchema = z.object({
  personA: personDetailsSchema,
  personB: personDetailsSchema,
  relationshipType: z.string().min(1, "Relationship type is required"),
  extraContext: z.string().optional(),
});
