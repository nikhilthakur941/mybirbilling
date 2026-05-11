import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

// 🔐 Razorpay webhook secret (from dashboard)
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Get raw body
    const body = await req.text();

    // 2️⃣ Get signature from headers
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // 3️⃣ Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Invalid signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // 4️⃣ Parse JSON
    const data = JSON.parse(body);

    console.log("✅ Verified Webhook:", data.event);

    // =========================
    // 🎯 HANDLE EVENTS
    // =========================

    // ✅ PAYMENT SUCCESS
    if (data.event === "payment.captured") {
      const payment = data.payload.payment.entity;

      const orderId = payment.order_id;
      const paymentId = payment.id;
      const amount = payment.amount / 100; // paise → rupees

      console.log("💰 Payment Captured:", paymentId);

      // 🔁 Update booking
      await prisma.booking.updateMany({
        where: {
          razorpayOrderId: orderId,
        },
        data: {
          paymentStatus: "PAID",
          status: "CONFIRMED",
          razorpayPaymentId: paymentId,
          advancePaid: amount,
        },
      });
    }

    // ❌ PAYMENT FAILED
    if (data.event === "payment.failed") {
      const payment = data.payload.payment.entity;

      await prisma.booking.updateMany({
        where: {
          razorpayOrderId: payment.order_id,
        },
        data: {
          paymentStatus: "PENDING",
        },
      });
    }

    // 💸 REFUND PROCESSED
    if (data.event === "refund.processed") {
      const refund = data.payload.refund.entity;

      await prisma.booking.updateMany({
        where: {
          razorpayPaymentId: refund.payment_id,
        },
        data: {
          razorpayRefundId: refund.id,
          paymentStatus: "REFUNDED",
        },
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    );
  }
}