"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BookingPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [pkg, setPkg] = useState<any>(null);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🔹 Load Razorpay
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 🔹 Fetch package
  useEffect(() => {
    if (!id) return;

    fetch(`/api/packages/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Package not found");
        return res.json();
      })
      .then(setPkg)
      .catch(() => alert("Invalid package"));
  }, [id]);

  if (!pkg) return <div className="p-10">Loading...</div>;

  const totalAmount = pkg.price * guestCount;

  const payNow = async () => {
    if (!guestName || !guestPhone) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      // ✅ 1️⃣ Create booking (NO AMOUNT FROM FRONTEND)
      const bookingRes = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName,
          guestEmail,
          guestPhone,
          guestCount,
          packageId: pkg.id,
        }),
      });

      const booking = await bookingRes.json();
      if (!booking.id) throw new Error("Booking failed");

      // ✅ 2️⃣ Create Razorpay order
      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: booking.totalAmount,
          receipt: `booking_${booking.id}`,
        }),
      });

      const order = await orderRes.json();

      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Razorpay failed");

      // ✅ 3️⃣ Open Razorpay
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "MyBirBilling",
        description: pkg.name,
        order_id: order.id,

        handler: async function (response: any) {
          await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              bookingId: booking.id,
            }),
          });

          window.location.href = "/booking/success";
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h1 className="text-2xl font-bold mb-2">{pkg.name}</h1>
        <p className="mb-4">₹ {pkg.price} / person</p>

        <input
          placeholder="Full Name"
          className="w-full border p-2 mb-3"
          onChange={(e) => setGuestName(e.target.value)}
        />

        <input
          placeholder="Email (optional)"
          className="w-full border p-2 mb-3"
          onChange={(e) => setGuestEmail(e.target.value)}
        />

        <input
          placeholder="Phone"
          className="w-full border p-2 mb-3"
          onChange={(e) => setGuestPhone(e.target.value)}
        />

        <input
          type="number"
          min={1}
          value={guestCount}
          className="w-full border p-2 mb-3"
          onChange={(e) => setGuestCount(Number(e.target.value))}
        />

        <p className="font-bold mb-4">
          Total: ₹ {totalAmount}
        </p>

        <button
          onClick={payNow}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded"
        >
          {loading ? "Processing..." : `Pay ₹ ${totalAmount}`}
        </button>
      </div>
    </div>
  );
}