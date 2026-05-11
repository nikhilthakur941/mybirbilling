import { NextResponse } from "next/server";
import { razorpay } from "@/lib/payment/razorpay";

export async function POST(req: Request) {
  try {
    // ✅ Check Razorpay instance
    if (!razorpay) {
      return NextResponse.json(
        { error: "Razorpay not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();

    let { amount, receipt } = body;

    console.log("Incoming amount (₹):", amount);

    if (!amount) {
      return NextResponse.json(
        { error: "Amount required" },
        { status: 400 }
      );
    }

    // ✅ Treat input as rupees
    const amountInRupees = Number(amount);

    if (isNaN(amountInRupees) || amountInRupees <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // ✅ Convert to paise
    const amountInPaise = amountInRupees * 100;

    console.log("Final amount (paise):", amountInPaise);

    // ✅ Razorpay max limit
    if (amountInPaise > 50000000) {
      return NextResponse.json(
        { error: "Amount exceeds ₹5 lakh limit" },
        { status: 400 }
      );
    }

    // ✅ Create order
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