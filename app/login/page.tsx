"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function LoginContent() {
  const params = useSearchParams();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // auto-hide session message
  const [showMsg, setShowMsg] = useState(true);

  useEffect(() => {
    if (params.get("expired")) {
      const timer = setTimeout(() => {
        setShowMsg(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          rememberMe,
        }),
      });

      const data = await res.json();

      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // redirect
      if (data.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }

    } catch (err) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  const inputClass = `
    w-full
    border border-gray-600
    px-4 py-3
    rounded-lg
    text-black
    bg-white
    focus:ring-2 focus:ring-orange-400
    focus:border-orange-400
    outline-none
  `;

  return (
    <div className="min-h-screen bg-[#FFF8ED] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-5"
      >
        <h1 className="text-3xl font-bold text-center">
          Login ✈️
        </h1>

        {/* SESSION EXPIRED MESSAGE */}
        {params.get("expired") && showMsg && (
          <p className="text-red-500 text-center text-sm">
            Session expired, please login again
          </p>
        )}

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className={inputClass}
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className={inputClass}
        />

        {/* Remember Me + Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-orange-500 w-4 h-4"
            />

            <span className="text-gray-700 font-medium">
              Remember me
            </span>
          </label>

          <Link
            href="/forgot-password"
            className="text-orange-500 font-semibold hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm text-center">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          disabled={loading}
          className="w-full bg-[#0F1C2E] text-white py-3 rounded-lg hover:bg-[#F97316] transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup */}
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-orange-500 font-semibold"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}