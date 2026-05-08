import { NextResponse } from "next/server";
import { generateLoveAnalysis } from "@/lib/ai";
import { analyzeLoveSchema } from "@/lib/validations";
import { db } from "@/database";
import { loveResults } from "@/database/love_results";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = analyzeLoveSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const dto = parsed.data;

    const aiResult = await generateLoveAnalysis(dto);

    const [saved] = await db
      .insert(loveResults)
      .values({
        personAName: dto.personA.name,
        personADateOfBirth: dto.personA.dateOfBirth,
        personAFavoriteNumber: dto.personA.favoriteNumber,
        personAFavoriteColor: dto.personA.favoriteColor,
        personAZodiacSign: dto.personA.zodiacSign,
        personAHobby: dto.personA.hobby,
        personAPersonality: dto.personA.personality,

        personBName: dto.personB.name,
        personBDateOfBirth: dto.personB.dateOfBirth,
        personBFavoriteNumber: dto.personB.favoriteNumber,
        personBFavoriteColor: dto.personB.favoriteColor,
        personBZodiacSign: dto.personB.zodiacSign,
        personBHobby: dto.personB.hobby,
        personBPersonality: dto.personB.personality,

        relationshipType: dto.relationshipType,
        extraContext: dto.extraContext,

        score: aiResult.score,
        status: aiResult.status,
        summary: aiResult.summary,
        nameCompatibility: aiResult.nameCompatibility,
        birthCompatibility: aiResult.birthCompatibility,
        numberVibe: aiResult.numberVibe,
        colorVibe: aiResult.colorVibe,
        zodiacVibe: aiResult.zodiacVibe,
        strengths: aiResult.strengths,
        warnings: aiResult.warnings,
        funnyLine: aiResult.funnyLine,
        disclaimer: aiResult.disclaimer,
      })
      .returning();

    return NextResponse.json({
      id: saved.id,
      result: aiResult,
      createdAt: saved.createdAt,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to analyze love compatibility",
      },
      { status: 500 },
    );
  }
}
