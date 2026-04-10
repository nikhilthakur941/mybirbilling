import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // ✅ NEW NEXTJS FIX
  const { id } = await context.params;

  const packageId = Number(id);

  if (!packageId || isNaN(packageId)) {
    return NextResponse.json(
      { error: "Invalid package id" },
      { status: 400 }
    );
  }

  const pkg = await prisma.package.findUnique({
    where: { id: packageId },
  });

  if (!pkg) {
    return NextResponse.json(
      { error: "Package not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(pkg);
}