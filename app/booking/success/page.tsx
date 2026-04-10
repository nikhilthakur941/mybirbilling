"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingSuccessPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(15);

  // ⏳ Countdown + redirect
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/packages");
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md w-full animate-fade-in">

        {/* ✅ SUCCESS ICON */}
        <div className="text-6xl mb-4 animate-bounce">✅</div>

        {/* ✅ TITLE */}
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Successful
        </h1>

        {/* ✅ MESSAGE */}
        <p className="text-gray-500 mt-2">
          Your booking has been confirmed 🎉
        </p>

        {/* ⏳ COUNTDOWN */}
        <p className="mt-6 text-lg text-gray-700">
          Redirecting to packages in{" "}
          <span className="font-bold text-green-600">
            {seconds}s
          </span>
        </p>

        {/* 🔘 BUTTON */}
        <button
          onClick={() => router.push("/packages")}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Go Now
        </button>
      </div>
    </div>
  );
}