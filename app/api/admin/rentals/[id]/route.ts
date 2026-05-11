import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET ONE
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const rental = await prisma.rental.findUnique({
    where: { id: Number(id) },
  });

  return NextResponse.json(rental);
}

// UPDATE
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const body = await req.json();
    const { name, price, type, images } = body;

    const priceType = type === "CAMERA" ? "FLY" : "DAY";

    const rental = await prisma.rental.update({
      where: { id: Number(id) },
      data: {
        name,
        price,
        type,
        priceType,
        image: images,
      },
    });

    return NextResponse.json(rental);
  } catch (err) {
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.rental.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}