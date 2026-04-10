import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// ======================
// UPDATE USER
// ======================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;   // important
    const body = await req.json();

    const data: any = {};

    if (body.name) data.name = body.name;
    if (body.email) data.email = body.email;
    if (body.phoneNo) data.phoneNo = body.phoneNo;
    if (body.role) data.role = body.role;

    // optional password update
    if (body.password && body.password.trim() !== "") {
      data.password = await bcrypt.hash(body.password, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return NextResponse.json(user);

  } catch (err) {
    console.error("Update error:", err);

    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}