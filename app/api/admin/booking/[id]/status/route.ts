import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const booking = await prisma.booking.update({
    where: { id: Number(params.id) },
    data: {
      status: body.status,
      paymentStatus: body.paymentStatus,
    },
  });

  return NextResponse.json(booking);
}
