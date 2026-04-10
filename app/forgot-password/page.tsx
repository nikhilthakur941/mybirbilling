
"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    setMessage(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8ED]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Reset Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-3 rounded"
          required
        />

        <button className="w-full bg-black text-white py-3 rounded">
          Send Reset Link
        </button>

        {message && (
          <p className="text-center text-green-600">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
