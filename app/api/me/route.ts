import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  // ❌ No session cookie
  if (!sessionId) {
    return NextResponse.json(
      { message: "Session expired", user: null },
      { status: 401 }
    );
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  // ❌ Session not found
  if (!session) {
    return NextResponse.json(
      { message: "Session expired", user: null },
      { status: 401 }
    );
  }

  // ❌ Session expired (IMPORTANT)
  if (session.expiresAt < new Date()) {
    // 🧹 delete expired session (cleanup)
    await prisma.session.delete({
      where: { id: sessionId },
    });

    return NextResponse.json(
      { message: "Session expired", user: null },
      { status: 401 }
    );
  }

  // ✅ Valid session
  return NextResponse.json({
    user: session.user,
  });
}