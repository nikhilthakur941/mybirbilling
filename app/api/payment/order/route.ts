import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let { amount, receipt } = body;

    console.log("Incoming amount (₹):", amount);

    if (!amount) {
      return NextResponse.json(
        { error: "Amount required" },
        { status: 400 }
      );
    }

    // ✅ ALWAYS treat input as ₹
    const amountInRupees = Number(amount);

    if (isNaN(amountInRupees) || amountInRupees <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // ✅ Convert ONLY ONCE → paise
    const amountInPaise = amountInRupees * 100;

    console.log("Final amount (paise):", amountInPaise);

    // ✅ Razorpay limit (₹5 lakh)
    if (amountInPaise > 50000000) {
      return NextResponse.json(
        { error: "Amount exceeds ₹5 lakh limit" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: receipt || `rcpt_${Date.now()}`,
    });

    return NextResponse.json(order);

  } catch (error: any) {
    console.error("FULL ERROR:", error);

    return NextResponse.json(
      {
        error:
          error?.error?.description ||
          error.message ||
          "Order failed",
      },
      { status: 500 }
    );
  }
}