import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/database";

export async function GET() {
  try {
    await db.execute(sql`SELECT 1`);

    return NextResponse.json({
      status: "ok",
      database: "connected",
      service: "ai-love-meter",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
      },
      { status: 500 },
    );
  }
}
