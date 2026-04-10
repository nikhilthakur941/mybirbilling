import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ⏱️ CONFIG
const CANCELLATION_WINDOW_HOURS = 24;
const REFUND_PERCENTAGE = 0.8;

// =========================
// 🔁 COMMON FUNCTION
// =========================
async function handleCancel(token: string) {
  const booking = await prisma.booking.findUnique({
    where: { cancelToken: token },
  });

  if (!booking) {
    throw new Error("INVALID_TOKEN");
  }

  if (booking.cancelledAt) {
    throw new Error("ALREADY_CANCELLED");
  }

  const hoursPassed =
    (Date.now() - new Date(booking.createdAt).getTime()) /
    (1000 * 60 * 60);

  if (hoursPassed > CANCELLATION_WINDOW_HOURS) {
    throw new Error("EXPIRED");
  }

  let refundAmount = 0;

  if (booking.paymentStatus === "PAID") {
    refundAmount =
      Number(booking.totalAmount) * REFUND_PERCENTAGE;
  }

  const updatedBooking = await prisma.booking.update({
    where: { id: booking.id },
    data: {
      status: "CANCELLED",
      cancelledAt: new Date(),
      refundAmount,
      paymentStatus:
        refundAmount > 0 ? "REFUNDED" : booking.paymentStatus,
      cancelToken: null,
    },
  });

  return { updatedBooking, refundAmount };
}

// =========================
// ✅ GET (EMAIL LINK)
// =========================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawToken = searchParams.get("token");

    const token = rawToken?.toString().trim();

    console.log("GET Cancel Token:", token);

    if (!token) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/booking/cancel-failed?error=Token missing`
      );
    }

    const { refundAmount } = await handleCancel(token);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/booking/cancel-success?refund=${refundAmount}`
    );

  } catch (error: any) {
    const errorMap: any = {
      INVALID_TOKEN: "Invalid or expired link",
      ALREADY_CANCELLED: "Booking already cancelled",
      EXPIRED: "Cancellation window expired",
    };

    const message =
      errorMap[error.message] || "Something went wrong";

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/booking/cancel-failed?error=${encodeURIComponent(message)}`
    );
  }
}

// =========================
// ✅ POST (BUTTON / API)
// =========================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Incoming body:", body);

    const token = body?.token?.toString().trim();

    console.log("POST Cancel Token:", token);

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token missing" },
        { status: 400 }
      );
    }

    const { updatedBooking, refundAmount } =
      await handleCancel(token);

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully",
      data: {
        bookingId: updatedBooking.id,
        refundAmount,
      },
    });

  } catch (error: any) {
    console.error("Cancel Error:", error);

    const errorMap: any = {
      INVALID_TOKEN: "Invalid or expired token",
      ALREADY_CANCELLED: "Booking already cancelled",
      EXPIRED: "Cancellation window expired",
    };

    return NextResponse.json(
      {
        success: false,
        error: errorMap[error.message] || "Cancel failed",
      },
      { status: 400 }
    );
  }
}