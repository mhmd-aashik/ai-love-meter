export type PersonDetails = {
  name: string;
  age: number;
  favoriteNumber: number;
  hobby: string;
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
  ageCompatibility: string;
  numberVibe: string;
  hobbyVibe: string;
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
