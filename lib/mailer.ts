import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { generateInvoice } from "@/lib/invoice";

/* ================================
   SMTP TRANSPORTER (GMAIL)
================================ */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Optional: verify SMTP
transporter
  .verify()
  .then(() => console.log("✅ SMTP Ready"))
  .catch((err) => console.error("❌ SMTP Error:", err));

/* ================================
   EMAIL VERIFICATION
================================ */

export async function sendVerificationEmail(email: string, token: string) {
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;

  await transporter.sendMail({
    from: `"MyBirBilling ✈️" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email – MyBirBilling",
    html: `
      <div style="font-family: Arial; padding:20px">
        <h2>Welcome to MyBirBilling ✈️</h2>
        <p>Please verify your email:</p>

        <a href="${link}"
        style="background:#F97316;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;">
          Verify Email
        </a>

        <p style="margin-top:20px;font-size:12px;color:gray">
          Link expires in 1 hour
        </p>
      </div>
    `,
  });

  console.log("✅ Verification email sent");
}

/* ================================
   PASSWORD RESET EMAIL
================================ */

export async function sendResetEmail(email: string, token: string) {
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"MyBirBilling ✈️" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your password – MyBirBilling",
    html: `
      <div style="font-family: Arial; padding:20px">
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>

        <a href="${link}"
        style="background:#F97316;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;">
          Reset Password
        </a>

        <p style="margin-top:20px;font-size:12px;color:gray">
          If not requested, ignore this email.
        </p>
      </div>
    `,
  });

  console.log("✅ Reset email sent");
}

/* ================================
   BOOKING EMAIL + INVOICE + CANCEL
================================ */

export async function sendBookingEmail(booking: any) {
  try {
    console.log("📧 Sending booking email to:", booking.guestEmail);

    // =========================
    // 🛵 Rentals
    // =========================
    const rentalsList =
      booking.rentals?.length > 0
        ? booking.rentals.map((r: any) => r.rental.name).join(", ")
        : "None";

    // =========================
    // ❌ CANCEL LINK
    // =========================
    const cancelLink = `${process.env.NEXT_PUBLIC_BASE_URL}/cancel-booking?token=${booking.cancelToken}`;

    // =========================
    // 🧾 GENERATE INVOICE (SAFE)
    // =========================
    let fullPath: string | null = null;
    let invoicePath: string | null = null;

    try {
      invoicePath = await generateInvoice(booking);
      fullPath = path.join(process.cwd(), "public", invoicePath);

      if (!fs.existsSync(fullPath)) {
        console.warn("⚠️ Invoice not found:", fullPath);
        fullPath = null;
      }
    } catch (err) {
      console.error("❌ Invoice generation failed:", err);
      fullPath = null;
    }

    // =========================
    // 📧 SEND EMAIL
    // =========================
    await transporter.sendMail({
      from: `"MyBirBilling ✈️" <${process.env.EMAIL_USER}>`,
      to: booking.guestEmail,
      subject: "🎉 Booking Confirmed – MyBirBilling",

      html: `
        <div style="font-family: Arial; padding:20px">
          <h2>🎉 Booking Confirmed</h2>

          <p>Hello <b>${booking.guestName || "Guest"}</b>,</p>
          <p>Your booking is confirmed ✅</p>

          <hr/>

          <h3>📦 Package</h3>
          <p>${booking.package?.name || "N/A"}</p>

          <h3>👥 Guests</h3>
          <p>${booking.guestCount}</p>

          <h3>🏨 Stay</h3>
          <p>${booking.stay?.name || "Not selected"}</p>

          <h3>🛵 Rentals</h3>
          <p>${rentalsList}</p>

          <hr/>

          <h3>💰 Payment</h3>
          <p>Total: ₹${booking.totalAmount}</p>
          <p>Status: <b style="color:green;">${booking.paymentStatus}</b></p>

          <p>🧾 Payment ID: ${booking.razorpayPaymentId}</p>

          ${
            invoicePath
              ? `
          <hr/>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}${invoicePath}"
          style="color:#F97316;font-weight:bold;">
            Download Invoice
          </a>
          `
              : ""
          }

          <hr/>

          <h3>❌ Need to cancel?</h3>

          <a href="${cancelLink}"
          style="
            background:#ef4444;
            color:white;
            padding:10px 20px;
            border-radius:6px;
            text-decoration:none;
            display:inline-block;
            margin-top:10px;
          ">
            Cancel Booking
          </a>

          <p style="margin-top:20px;font-size:12px;color:gray">
            Cancellation may be subject to policy.
          </p>

          <p style="margin-top:20px">
            Thank you for choosing <b>MyBirBilling ✈️</b> ❤️
          </p>
        </div>
      `,

      // =========================
      // 📎 ATTACHMENT (SAFE)
      // =========================
      attachments: fullPath
        ? [
            {
              filename: `invoice-${booking.id}.pdf`,
              path: fullPath,
            },
          ]
        : [],
    });

    console.log("✅ Booking email sent successfully");

  } catch (error) {
    console.error("❌ EMAIL FAILED:", error);
  }
}