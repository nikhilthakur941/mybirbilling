import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stays = await prisma.stay.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(stays);
  } catch (error) {
    console.error("STAYS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch stays" },
      { status: 500 }
    );
  }
}