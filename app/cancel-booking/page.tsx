"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CancelBookingPage() {
  const params = useSearchParams();
  const token = params.get("token");

  const [message, setMessage] = useState("");

  const cancelBooking = async () => {
    const res = await fetch("/api/cancel-booking", {
      method: "POST",
      body: JSON.stringify({ token }),
    });

    if (res.ok) {
      setMessage("Booking cancelled successfully.");
    } else {
      setMessage("Invalid or expired link.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow rounded-xl text-center">
        <h1 className="text-xl font-bold mb-4">Cancel Booking</h1>
        <button
          onClick={cancelBooking}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Cancel My Booking
        </button>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
}