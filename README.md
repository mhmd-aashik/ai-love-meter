# ❤️ AI Love Meter - GraphQL Powered

AI Love Meter is a modern web application that uses Artificial Intelligence to analyze the compatibility between two people based on their names, birth dates, favorite numbers, and more. Built with **Next.js**, **Drizzle ORM**, **PostgreSQL**, and powered by **Google Gemini AI**.

## ✨ Features

- **AI-Powered Analysis**: Uses Gemini 2.5 Flash to generate deep (and fun) compatibility insights.
- **GraphQL API**: Modern GraphQL endpoint for querying and triggering analyses.
- **REST API**: Robust RESTful routes for legacy integrations.
- **Detailed Metrics**: Scores name compatibility, zodiac vibes, color synchronization, and number energy.
- **Funny Insights**: Generates "funny lines" and "warnings" for each result.
- **History Tracking**: Keeps track of recent analysis results.

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **AI Engine**: [Google Gemini AI](https://ai.google.dev/)
- **API**: [GraphQL Yoga](https://the-guild.dev/graphql/yoga) & [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- **Validation**: [Zod](https://zod.dev/)

## 🛠️ Getting Started

### 1. Prerequisites

- Node.js 18+
- Docker (for PostgreSQL)

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/love_meter"
GEMINI_API_KEY="your_google_gemini_api_key"
GEMINI_MODEL="gemini-2.5-flash"
```

### 3. Database Setup

Spin up the database using Docker:

```bash
docker-compose up -d
```

Run migrations:

```bash
npx drizzle-kit push
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

---

## 📡 API Documentation

### 🟢 GraphQL API

The GraphQL endpoint is available at `/api/graphql`. It includes a built-in GraphiQL interface for testing.

#### **Queries**

**Get a specific result:**
```graphql
query GetResult($id: ID!) {
  getLoveResult(id: $id) {
    id
    score
    status
    summary
    funnyLine
    createdAt
  }
}
```

**Get recent results:**
```graphql
query {
  getRecentResults(limit: 5) {
    id
    personAName
    personBName
    score
  }
}
```

#### **Mutations**

**Analyze Compatibility:**
```graphql
mutation {
  analyzeLove(
    personA: {
      name: "Romeo",
      dateOfBirth: "1995-01-01",
      favoriteNumber: 7,
      favoriteColor: "Red",
      zodiacSign: "Leo"
    },
    personB: {
      name: "Juliet",
      dateOfBirth: "1997-02-14",
      favoriteNumber: 13,
      favoriteColor: "Blue",
      zodiacSign: "Pisces"
    },
    relationshipType: "Romantic",
    extraContext: "Met at a party."
  ) {
    id
    score
    status
    summary
    strengths
    warnings
  }
}
```

### 🔵 REST API

#### **POST `/api/love/analyze`**
Analyzes compatibility and saves the result.

**Request Body:**
```json
{
  "personA": { ... },
  "personB": { ... },
  "relationshipType": "Friends",
  "extraContext": "..."
}
```

#### **GET `/api/love/results`**
Fetches recent analysis results.

---

## 📜 License

This project is licensed under the MIT License.

---

Created with ❤️ by Antigravity AI
