import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password, rememberMe } = await req.json();

    // ✅ Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    // ✅ Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // ✅ Check password
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 🧹 DELETE OLD SESSIONS (fix duplicate issue)
    await prisma.session.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // ✅ Expiry based on rememberMe
    const expiryTime = rememberMe
      ? 30 * 24 * 60 * 60 * 1000 // 30 days
      : 24 * 60 * 60 * 1000;    // 24 hours

    const expiresAt = new Date(Date.now() + expiryTime);

    // ✅ Create new session
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        expiresAt,
      },
    });

    // ✅ Set cookie
    const cookieStore = await cookies();

    cookieStore.set("sessionId", session.id, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
    });

    return NextResponse.json({
      message: "Login successful",
      role: user.role,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}