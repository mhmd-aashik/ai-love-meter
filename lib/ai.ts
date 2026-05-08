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

Analyze compatibility between two people using their limited details.
This is only for fun and entertainment.

Person A:
- Name: ${input.personA.name}
- Age: ${input.personA.age}
- Favorite Number: ${input.personA.favoriteNumber}
- Hobby: ${input.personA.hobby}

Person B:
- Name: ${input.personB.name}
- Age: ${input.personB.age}
- Favorite Number: ${input.personB.favoriteNumber}
- Hobby: ${input.personB.hobby}

Relationship Type: ${input.relationshipType}
Extra Context: ${input.extraContext || "Not provided"}

Return only valid JSON.
No markdown.
No explanation outside JSON.

Required JSON Structure:
{
  "score": "A number between 0 and 100",
  "status": "One of the required match statuses",
  "summary": "Short romantic but fun explanation",
  "nameCompatibility": "Fun explanation based on names",
  "ageCompatibility": "Fun explanation based on ages",
  "numberVibe": "Fun explanation based on favorite numbers",
  "hobbyVibe": "Fun explanation based on hobbies",
  "strengths": ["point 1", "point 2", "point 3"],
  "warnings": ["point 1", "point 2"],
  "funnyLine": "One funny viral-style line",
  "disclaimer": "This result is for entertainment only and should not be used for serious relationship decisions."
}

Rules:
- CALCULATE a unique score based on the mathematical and vibrational alignment of the provided details.
- score must be an INTEGER between 0 and 100.
- NEVER use a default score; analyze the input names, ages, and hobbies carefully.
- status must be one of: "Low Match", "Possible Match", "Good Match", "Strong Match", "Soulmate Energy"
- keep tone fun, romantic, positive, and shareable
- do not claim scientific accuracy
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
