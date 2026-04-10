import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");
    const origin = req.nextUrl.origin; // ✅ for redirect

    if (!token) {
      return NextResponse.redirect(`${origin}/login?error=token-missing`);
    }

    const existingToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!existingToken) {
      return NextResponse.redirect(`${origin}/login?error=invalid-token`);
    }

    // ⏰ Check expiry
    if (new Date() > existingToken.expiresAt) {
      return NextResponse.redirect(`${origin}/login?error=expired`);
    }

    // ✅ Verify user using email
    await prisma.user.update({
      where: { email: existingToken.email },
      data: {
        emailVerified: new Date(),
      },
    });

    // 🧹 Delete token
    await prisma.verificationToken.delete({
      where: { token },
    });

    // ✅ Redirect success
    return NextResponse.redirect(`${origin}/login?verified=true`);

  } catch (error) {
    console.error(error);

    return NextResponse.redirect(`/login?error=server`);
  }
}