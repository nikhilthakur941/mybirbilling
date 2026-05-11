"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function CancelBookingContent() {
  const params = useSearchParams();
  const token = params.get("token");

  const [message, setMessage] = useState("");

  const cancelBooking = async () => {
    try {
      const res = await fetch("/api/cancel-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Booking cancelled successfully.");
      } else {
        setMessage(data.message || "Invalid or expired link.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/10 backdrop-blur-xl p-8 shadow rounded-xl text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-red-400">
          Cancel Booking
        </h1>

        <button
          onClick={cancelBooking}
          className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg w-full"
        >
          Cancel My Booking
        </button>

        {message && (
          <p className="mt-4 text-sm text-gray-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default function CancelBookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CancelBookingContent />
    </Suspense>
  );
}