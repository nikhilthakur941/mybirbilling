import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function DELETE(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { message: "Password required" },
        { status: 400 }
      );
    }

    // ✅ FIX: await cookies()
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json(
        { message: "Invalid session" },
        { status: 401 }
      );
    }

    // ✅ Get user
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // 🔐 Verify password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 }
      );
    }

    // ✅ Transaction (safe delete)
    await prisma.$transaction([
      prisma.session.deleteMany({
        where: { userId: user.id },
      }),
      prisma.user.delete({
        where: { id: user.id },
      }),
    ]);

    // 🧹 Clear cookie
    cookieStore.set("sessionId", "", {
      expires: new Date(0),
      path: "/",
    });

    return NextResponse.json({
      message: "Account deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}