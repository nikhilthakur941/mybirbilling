"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function CancelSuccessContent() {
  const params = useSearchParams();
  const router = useRouter();

  const refund = params.get("refund");

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          ✅ Booking Cancelled
        </h1>

        <p className="text-gray-300 mb-2">
          Your booking has been successfully cancelled.
        </p>

        {refund && (
          <p className="text-green-300 font-semibold mb-4">
            Refund: ₹ {refund}
          </p>
        )}

        <button
          onClick={() => router.push("/")}
          className="mt-4 w-full bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded-lg"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default function CancelSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CancelSuccessContent />
    </Suspense>
  );
}