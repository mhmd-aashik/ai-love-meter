import { GoogleGenAI } from "@google/genai";
import { AnalyzeLovePayload, LoveAiResult } from "@/types/love";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export async function generateLoveAnalysis(
  input: AnalyzeLovePayload,
): Promise<LoveAiResult> {
  const prompt = buildLovePrompt(input);

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  const rawText = response.text || "";
  const cleanText = cleanJson(rawText);

  const parsed = JSON.parse(cleanText) as LoveAiResult;

  return {
    ...parsed,
    score: Math.max(0, Math.min(100, parsed.score)),
    strengths: parsed.strengths || [],
    warnings: parsed.warnings || [],
    disclaimer:
      parsed.disclaimer ||
      "This result is for entertainment only and should not be used for serious relationship decisions.",
  };
}

function buildLovePrompt(input: AnalyzeLovePayload): string {
  return `
You are an entertaining AI Love Meter.

Analyze compatibility between two people using their details.
This is only for fun and entertainment.

Person A:
- Name: ${input.personA.name}
- Date of Birth: ${input.personA.dateOfBirth}
- Favorite Number: ${input.personA.favoriteNumber}
- Favorite Color: ${input.personA.favoriteColor || "Not provided"}
- Zodiac Sign: ${input.personA.zodiacSign || "Not provided"}
- Hobby: ${input.personA.hobby || "Not provided"}
- Personality: ${input.personA.personality || "Not provided"}

Person B:
- Name: ${input.personB.name}
- Date of Birth: ${input.personB.dateOfBirth}
- Favorite Number: ${input.personB.favoriteNumber}
- Favorite Color: ${input.personB.favoriteColor || "Not provided"}
- Zodiac Sign: ${input.personB.zodiacSign || "Not provided"}
- Hobby: ${input.personB.hobby || "Not provided"}
- Personality: ${input.personB.personality || "Not provided"}

Relationship Type: ${input.relationshipType}
Extra Context: ${input.extraContext || "Not provided"}

Return only valid JSON.
No markdown.
No explanation outside JSON.

Required JSON:
{
  "score": 85,
  "status": "Strong Match",
  "summary": "Short romantic but fun explanation",
  "nameCompatibility": "Fun explanation based on names",
  "birthCompatibility": "Fun explanation based on birth dates",
  "numberVibe": "Fun explanation based on favorite numbers",
  "colorVibe": "Fun explanation based on favorite colors",
  "zodiacVibe": "Fun zodiac-style compatibility explanation",
  "strengths": ["point 1", "point 2", "point 3"],
  "warnings": ["point 1", "point 2"],
  "funnyLine": "One funny viral-style line",
  "disclaimer": "This result is for entertainment only and should not be used for serious relationship decisions."
}

Rules:
- score must be between 0 and 100
- status must be one of: "Low Match", "Possible Match", "Good Match", "Strong Match", "Soulmate Energy"
- keep tone fun, romantic, positive, and shareable
- do not claim scientific accuracy
- do not make serious relationship decisions
`;
}

function cleanJson(text: string): string {
  return text
    .trim()
    .replace(/^```json/i, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();
}
