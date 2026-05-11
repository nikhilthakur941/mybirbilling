"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function CancelFailedContent() {
  const params = useSearchParams();
  const router = useRouter();

  const error = params.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        
        <h1 className="text-3xl font-bold text-red-400 mb-4">
          ❌ Cancellation Failed
        </h1>

        <p className="text-gray-300 mb-2">
          We couldn’t cancel your booking.
        </p>

        {error && (
          <p className="text-red-300 font-semibold mb-4">
            Reason: {error}
          </p>
        )}

        <button
          onClick={() => router.push("/")}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default function CancelFailedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CancelFailedContent />
    </Suspense>
  );
}