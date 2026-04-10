import Razorpay from "razorpay";
import crypto from "crypto";

/* =====================================================
   Environment Variables Validation
===================================================== */

const {
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
} = process.env;

if (!RAZORPAY_KEY_ID) {
  throw new Error("RAZORPAY_KEY_ID is missing in environment variables");
}

if (!RAZORPAY_KEY_SECRET) {
  throw new Error("RAZORPAY_KEY_SECRET is missing in environment variables");
}

// Make TS happy (strict mode safe)
const razorpayKeyId: string = RAZORPAY_KEY_ID;
const razorpaySecret: string = RAZORPAY_KEY_SECRET;

/* =====================================================
   Singleton Razorpay Instance
===================================================== */

declare global {
  // Prevent multiple instances during hot reload
  var _razorpayInstance: Razorpay | undefined;
}

const razorpay =
  global._razorpayInstance ??
  new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpaySecret,
  });

if (process.env.NODE_ENV !== "production") {
  global._razorpayInstance = razorpay;
}

export { razorpay };

/* =====================================================
   Helper: Create Razorpay Order
===================================================== */

export async function createRazorpayOrder({
  amount,
  receipt,
  notes,
}: {
  amount: number; // in rupees
  receipt: string;
  notes?: Record<string, string>;
}) {
  if (!amount || amount <= 0) {
    throw new Error("Invalid order amount");
  }

  return await razorpay.orders.create({
    amount: Math.round(amount * 100), // convert to paise
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
  amount: number; // in rupees
}) {
  if (!paymentId) {
    throw new Error("Payment ID is required for refund");
  }

  if (!amount || amount <= 0) {
    throw new Error("Invalid refund amount");
  }

  return await razorpay.payments.refund(paymentId, {
    amount: Math.round(amount * 100), // convert to paise
  });
}

/* =====================================================
   Helper: Verify Payment Signature
   (Used After Checkout Success)
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
  const body = `${orderId}|${paymentId}`;

  const expectedSignature = crypto
    .createHmac("sha256", razorpaySecret)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
}

/* =====================================================
   Helper: Verify Webhook Signature
===================================================== */

export function verifyWebhookSignature({
  rawBody,
  signature,
}: {
  rawBody: string;
  signature: string;
}) {
  const expectedSignature = crypto
    .createHmac("sha256", razorpaySecret)
    .update(rawBody)
    .digest("hex");

  return expectedSignature === signature;
}