import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/payment/razorpay";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Cancel token required" },
        { status: 400 }
      );
    }

    // 🔎 Find booking
    const booking = await prisma.booking.findUnique({
      where: { cancelToken: token },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 404 }
      );
    }

    // ❌ Already cancelled
    if (booking.status === "CANCELLED") {
      return NextResponse.json(
        { success: false, message: "Booking already cancelled" },
        { status: 400 }
      );
    }

    const totalAmount = booking.totalAmount.toNumber();
    const advancePaid = booking.advancePaid.toNumber();

    let refundAmount = 0;

    // 🎯 Refund Policy
    if (booking.paymentStatus === "PAID") {
      refundAmount = totalAmount; // Full refund
    } else if (booking.paymentStatus === "PARTIAL") {
      refundAmount = advancePaid; // Refund only advance
    }

    let refundId: string | null = null;

    // 💰 Razorpay Refund
    if (
      refundAmount > 0 &&
      booking.razorpayPaymentId
    ) {
      const refund = await razorpay.payments.refund(
        booking.razorpayPaymentId,
        {
          amount: Math.round(refundAmount * 100), // convert to paise
        }
      );

      refundId = refund.id;
    }

    // 📝 Update booking
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: "CANCELLED",
        paymentStatus:
          refundAmount > 0 ? "REFUNDED" : booking.paymentStatus,
        refundAmount: refundAmount,
        razorpayRefundId: refundId,
        cancelledAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message:
        refundAmount > 0
          ? `Booking cancelled. ₹${refundAmount} refund initiated.`
          : "Booking cancelled successfully. No payment to refund.",
      refundAmount,
    });

  } catch (error) {
    console.error("Cancel Error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}