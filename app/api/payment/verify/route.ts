import crypto from "crypto";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendBookingEmail } from "@/lib/mailer";

// =========================
// 🧠 Type Safety
// =========================
type TxResult = {
  booking: any;
  isDuplicate: boolean;
};

// =========================
// 🚀 POST API
// =========================
export async function POST(req: Request) {
  try {
    // =========================
    // 🔐 ENV CHECK
    // =========================
    if (
      !process.env.RAZORPAY_KEY_ID ||
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      console.error("❌ Razorpay ENV missing");

      return NextResponse.json(
        { success: false, error: "Server config error" },
        { status: 500 }
      );
    }

    // =========================
    // 🔐 Razorpay Instance
    // =========================
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const body = await req.json();

    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      bookingId,
    } = body;

    // =========================
    // ❌ VALIDATION
    // =========================
    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature ||
      !bookingId
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // =========================
    // 🔐 SIGNATURE VERIFY
    // =========================
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 400 }
      );
    }

    // =========================
    // 🔁 DATABASE TRANSACTION
    // =========================
    const result: TxResult = await prisma.$transaction(async (tx) => {
      // 🔍 FIND BOOKING
      const existingBooking = await tx.booking.findUnique({
        where: { id: Number(bookingId) },
        include: {
          package: true,
          stay: true,
          rentals: {
            include: { rental: true },
          },
        },
      });

      if (!existingBooking) {
        throw new Error("BOOKING_NOT_FOUND");
      }

      // 🛑 DUPLICATE CHECK (IMPORTANT)
      if (existingBooking.razorpayPaymentId === razorpay_payment_id) {
        return {
          booking: existingBooking,
          isDuplicate: true,
        };
      }

      // =========================
      // 💳 FETCH PAYMENT FROM RAZORPAY
      // =========================
      const payment = await razorpay.payments.fetch(
        razorpay_payment_id
      );

      const paidNow = Number(payment.amount) / 100;

      if (paidNow <= 0) {
        throw new Error("INVALID_AMOUNT");
      }

      // =========================
      // 💰 CALCULATIONS
      // =========================
      const totalAmount = Number(existingBooking.totalAmount);
      const currentAdvance = Number(existingBooking.advancePaid || 0);

      const newAdvance = Math.min(
        currentAdvance + paidNow,
        totalAmount
      );

      const newBalance = Math.max(
        totalAmount - newAdvance,
        0
      );

      const paymentStatus =
        newBalance === 0 ? "PAID" : "PARTIAL";

      // =========================
      // 📝 UPDATE BOOKING
      // =========================
      const updatedBooking = await tx.booking.update({
        where: { id: existingBooking.id },
        data: {
          advancePaid: newAdvance,
          balanceDue: newBalance,
          paymentStatus,
          status: "CONFIRMED",
          razorpayPaymentId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
        },
        include: {
          package: true,
          stay: true,
          rentals: {
            include: { rental: true },
          },
        },
      });

      return {
        booking: updatedBooking,
        isDuplicate: false,
      };
    });

    // =========================
    // 📧 SEND EMAIL (NON-BLOCKING)
    // =========================
    if (
      !result.isDuplicate &&
      result.booking?.guestEmail &&
      result.booking.paymentStatus === "PAID"
    ) {
      sendBookingEmail(result.booking).catch((err) => {
        console.error("❌ EMAIL ERROR:", err);
      });
    }

    // =========================
    // ✅ RESPONSE
    // =========================
    return NextResponse.json({
      success: true,
      message: result.isDuplicate
        ? "Payment already processed"
        : "Payment verified successfully",
      paymentStatus: result.booking.paymentStatus,
      bookingId: result.booking.id,
    });

  } catch (error: any) {
    console.error("❌ VERIFY ERROR:", error);

    // =========================
    // 🎯 CLEAN ERRORS
    // =========================
    if (error.message === "BOOKING_NOT_FOUND") {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    if (error.message === "INVALID_AMOUNT") {
      return NextResponse.json(
        { success: false, error: "Invalid payment amount" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Verification failed",
      },
      { status: 500 }
    );
  }
}