import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and password are required" },
        { status: 400 }
      );
    }

    // find reset token
    const resetRecord = await prisma.passwordReset.findUnique({
      where: { token },
    });

    if (!resetRecord) {
      return NextResponse.json(
        { message: "Invalid reset token" },
        { status: 400 }
      );
    }

    // check expiry
    if (resetRecord.expiresAt < new Date()) {
      return NextResponse.json(
        { message: "Reset token expired" },
        { status: 400 }
      );
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update user password
    await prisma.user.update({
      where: { email: resetRecord.email },
      data: { password: hashedPassword },
    });

    // delete reset token
    await prisma.passwordReset.delete({
      where: { token },
    });

    return NextResponse.json({
      message: "Password updated successfully",
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}