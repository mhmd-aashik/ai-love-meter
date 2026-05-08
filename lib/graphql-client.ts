import { request, gql } from "graphql-request";

const GRAPHQL_ENDPOINT = "/api/graphql";

export const ANALYZE_LOVE_MUTATION = gql`
  mutation AnalyzeLove(
    $personA: PersonInput!
    $personB: PersonInput!
    $relationshipType: String!
    $extraContext: String
  ) {
    analyzeLove(
      personA: $personA
      personB: $personB
      relationshipType: $relationshipType
      extraContext: $extraContext
    ) {
      id
      score
      status
      summary
      funnyLine
      strengths
      warnings
      createdAt
    }
  }
`;

export const GET_RECENT_RESULTS_QUERY = gql`
  query GetRecentResults($limit: Int) {
    getRecentResults(limit: $limit) {
      id
      personAName
      personBName
      score
      status
      createdAt
    }
  }
`;

export const graphqlRequest = (document: string, variables?: Record<string, unknown>) =>
  request(GRAPHQL_ENDPOINT, document, variables);
