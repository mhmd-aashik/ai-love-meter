import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/database";
import { loveResults } from "@/database/love_results";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const [result] = await db
      .select()
      .from(loveResults)
      .where(eq(loveResults.id, id))
      .limit(1);

    if (!result) {
      return NextResponse.json(
        {
          error: "Love result not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch love result",
      },
      { status: 500 },
    );
  }
}
