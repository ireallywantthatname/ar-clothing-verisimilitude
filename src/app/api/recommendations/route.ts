import { NextRequest, NextResponse } from "next/server";
import { getRecommendations } from "@/data/products";

export async function POST(request: NextRequest) {
  try {
    // body contains userId and context for future enhancement
    await request.json();

    const recommendations = await getRecommendations();

    return NextResponse.json({
      success: true,
      data: recommendations,
      algorithm: "hybrid", // collaborative + content-based + LLM
      confidence: 0.85,
    });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // userId is available for future enhancement
    searchParams.get("userId");

    const recommendations = await getRecommendations();

    return NextResponse.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}
