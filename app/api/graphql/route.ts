import { createYoga, createSchema } from "graphql-yoga";
import { generateLoveAnalysis } from "@/lib/ai";
import { db } from "@/database";
import { loveResults } from "@/database/love_results";
import { eq, desc } from "drizzle-orm";
import { AnalyzeLovePayload } from "@/types/love";

const typeDefs = `
  type LoveResult {
    id: ID!
    personAName: String!
    personADateOfBirth: String!
    personAFavoriteNumber: Int!
    personAFavoriteColor: String
    personAZodiacSign: String
    personAHobby: String
    personAPersonality: String
    
    personBName: String!
    personBDateOfBirth: String!
    personBFavoriteNumber: Int!
    personBFavoriteColor: String
    personBZodiacSign: String
    personBHobby: String
    personBPersonality: String
    
    relationshipType: String!
    extraContext: String
    
    score: Int!
    status: String!
    summary: String!
    
    nameCompatibility: String
    birthCompatibility: String
    numberVibe: String
    colorVibe: String
    zodiacVibe: String
    
    strengths: [String!]!
    warnings: [String!]!
    
    funnyLine: String
    disclaimer: String
    createdAt: String!
  }

  input PersonInput {
    name: String!
    dateOfBirth: String!
    favoriteNumber: Int!
    favoriteColor: String
    zodiacSign: String
    hobby: String
    personality: String
  }

  type Query {
    getLoveResult(id: ID!): LoveResult
    getRecentResults(limit: Int): [LoveResult!]!
  }

  type Mutation {
    analyzeLove(
      personA: PersonInput!
      personB: PersonInput!
      relationshipType: String!
      extraContext: String
    ): LoveResult!
  }
`;

const resolvers = {
  Query: {
    getLoveResult: async (_: unknown, { id }: { id: string }) => {
      const results = await db
        .select()
        .from(loveResults)
        .where(eq(loveResults.id, id));
      return results[0];
    },
    getRecentResults: async (_: unknown, { limit = 10 }: { limit: number }) => {
      const results = await db
        .select()
        .from(loveResults)
        .orderBy(desc(loveResults.createdAt))
        .limit(limit);
      return results.map((r) => ({
        ...r,
        createdAt: r.createdAt.toISOString(),
      }));
    },
  },
  Mutation: {
    analyzeLove: async (_: unknown, args: AnalyzeLovePayload) => {
      const { personA, personB, relationshipType, extraContext } = args;

      const aiResult = await generateLoveAnalysis({
        personA,
        personB,
        relationshipType,
        extraContext,
      });

      const [saved] = await db
        .insert(loveResults)
        .values({
          personAName: personA.name,
          personADateOfBirth: personA.dateOfBirth,
          personAFavoriteNumber: personA.favoriteNumber,
          personAFavoriteColor: personA.favoriteColor,
          personAZodiacSign: personA.zodiacSign,
          personAHobby: personA.hobby,
          personAPersonality: personA.personality,

          personBName: personB.name,
          personBDateOfBirth: personB.dateOfBirth,
          personBFavoriteNumber: personB.favoriteNumber,
          personBFavoriteColor: personB.favoriteColor,
          personBZodiacSign: personB.zodiacSign,
          personBHobby: personB.hobby,
          personBPersonality: personB.personality,

          relationshipType,
          extraContext,

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

      return {
        ...saved,
        createdAt: saved.createdAt.toISOString(),
      };
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
