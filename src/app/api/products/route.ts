import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/data/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: Record<
      string,
      string | number | string[] | [number, number]
    > = {};

    // Parse query parameters
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const colors = searchParams.get("colors")?.split(",");
    const sizes = searchParams.get("sizes")?.split(",");

    if (category && category !== "all") {
      filters.category = category;
    }

    if (search) {
      filters.search = search;
    }

    if (minPrice && maxPrice) {
      filters.priceRange = [parseFloat(minPrice), parseFloat(maxPrice)];
    }

    if (colors) {
      filters.colors = colors;
    }

    if (sizes) {
      filters.sizes = sizes;
    }

    const products = await getProducts(filters);

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
