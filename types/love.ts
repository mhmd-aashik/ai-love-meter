export type PersonDetails = {
  name: string;
  dateOfBirth: string;
  favoriteNumber: number;
  favoriteColor?: string;
  zodiacSign?: string;
  hobby?: string;
  personality?: string;
};

export type AnalyzeLovePayload = {
  personA: PersonDetails;
  personB: PersonDetails;
  relationshipType: string;
  extraContext?: string;
};

export type LoveAiResult = {
  score: number;
  status: string;
  summary: string;
  nameCompatibility: string;
  birthCompatibility: string;
  numberVibe: string;
  colorVibe: string;
  zodiacVibe: string;
  strengths: string[];
  warnings: string[];
  funnyLine: string;
  disclaimer: string;
};

export type AnalyzeLoveResponse = {
  id: string;
  result: LoveAiResult;
  createdAt: string | Date;
};
