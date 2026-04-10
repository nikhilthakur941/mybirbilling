import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendResetEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({
      message: "If this email exists, a reset link was sent",
    });
  }

  // create reset token
  const token = crypto.randomUUID();

  await prisma.passwordReset.create({
    data: {
      email,
      token,
      expiresAt: new Date(Date.now() + 3600000),
    },
  });

  // send email
  await sendResetEmail(email, token);

  return NextResponse.json({
    message: "Password reset email sent",
  });
}