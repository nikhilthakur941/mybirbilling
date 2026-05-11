import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const body = await req.json();

  const booking = await prisma.booking.update({
    where: { id: Number(id) },
    data: {
      status: body.status,
      paymentStatus: body.paymentStatus,
    },
  });

  return NextResponse.json(booking);
}