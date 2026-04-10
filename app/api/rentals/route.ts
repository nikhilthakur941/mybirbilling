import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rentals = await prisma.rental.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(rentals);
  } catch (error) {
    console.error("RENTALS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch rentals" },
      { status: 500 }
    );
  }
}