"use client";

import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    let data = null;

try {
  data = await res.json();
} catch {
  data = {};
}

setLoading(false);

    if (!res.ok) {
      setError(data.message || "Something went wrong");
      return;
    }

    setSuccess("Account created successfully 🎉");
    setForm({
      name: "",
      email: "",
      phoneNo: "",
      password: "",
    });
  };

  const inputClass = `
    w-full
    border border-gray-600
    px-4 py-3
    rounded-lg
    text-black
    placeholder-gray-500
    bg-white
    focus:ring-2 focus:ring-orange-400
    focus:border-orange-400
    outline-none
  `;

  return (
    <div className="min-h-screen bg-[#FFF8ED] flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md
          bg-white
          shadow-2xl
          rounded-2xl
          p-8
          border border-orange-200
          space-y-5
        "
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">
            Create Account ✈️
          </h1>
          <p className="text-gray-600 mt-1">
            Join the platform
          </p>
        </div>

        {/* Name */}
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className={inputClass}
        />

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

        {/* Phone */}
        <input
          name="phoneNo"
          placeholder="Phone Number"
          value={form.phoneNo}
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

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        {/* Success */}
        {success && (
          <p className="text-green-600 text-sm text-center">{success}</p>
        )}

        {/* Button */}
        <button
          disabled={loading}
          className="
            w-full
            bg-[#0F1C2E]
            text-white
            py-3
            rounded-lg
            font-semibold
            hover:bg-[#F97316]
            transition
            disabled:opacity-50
          "
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#F97316] font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}