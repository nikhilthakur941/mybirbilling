import Razorpay from "razorpay";
import crypto from "crypto";

/* =====================================================
   Environment Variables
===================================================== */

const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

/* =====================================================
   Razorpay Instance
===================================================== */

export const razorpay =
  razorpayKeyId && razorpaySecret
    ? new Razorpay({
        key_id: razorpayKeyId,
        key_secret: razorpaySecret,
      })
    : null;

/* =====================================================
   Helper: Create Razorpay Order
===================================================== */

export async function createRazorpayOrder({
  amount,
  receipt,
  notes,
}: {
  amount: number;
  receipt: string;
  notes?: Record<string, string>;
}) {
  if (!razorpay) {
    throw new Error("Razorpay is not configured");
  }

  return await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt,
    notes,
  });
}

/* =====================================================
   Helper: Refund Payment
===================================================== */

export async function refundPayment({
  paymentId,
  amount,
}: {
  paymentId: string;
  amount: number;
}) {
  if (!razorpay) {
    throw new Error("Razorpay is not configured");
  }

  return await razorpay.payments.refund(paymentId, {
    amount: Math.round(amount * 100),
  });
}

/* =====================================================
   Verify Payment Signature
===================================================== */

export function verifyPaymentSignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  if (!razorpaySecret) {
    return false;
  }

  const body = `${orderId}|${paymentId}`;

  const expectedSignature = crypto
    .createHmac("sha256", razorpaySecret)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
}

/* =====================================================
   Verify Webhook Signature
===================================================== */

export function verifyWebhookSignature({
  rawBody,
  signature,
}: {
  rawBody: string;
  signature: string;
}) {
  if (!razorpaySecret) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", razorpaySecret)
    .update(rawBody)
    .digest("hex");

  return expectedSignature === signature;
}