import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // ✅ Get sessionId from cookie
    const sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ Get session
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

    // 🧹 Delete old tokens (by email)
    await prisma.verificationToken.deleteMany({
      where: { email: user.email },
    });

    // ✅ Create secure token
    const token = crypto.randomBytes(32).toString("hex");

    await prisma.verificationToken.create({
      data: {
        token,
        email: user.email,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
      },
    });

    // ✅ Verification link
    const verifyLink = `http://localhost:3000/verify-email?token=${token}`;

    // ✅ Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Send email
    await transporter.sendMail({
      from: `"MyApp" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Verify your email",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Email Verification</h2>
          <p>Click the button below to verify your email:</p>

          <a href="${verifyLink}" 
             style="
              display:inline-block;
              padding:12px 20px;
              background:#0F1C2E;
              color:white;
              text-decoration:none;
              border-radius:6px;
              font-weight:bold;
             ">
            Verify Email
          </a>

          <p style="margin-top:10px;">
            This link will expire in 10 minutes.
          </p>
        </div>
      `,
    });

    console.log("Verification email sent to:", user.email);

    return NextResponse.json({
      message: "Verification email sent",
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}