"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmail() {
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    if (!token) return;

    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    }).then(() => {
      alert("Email verified!");
      window.location.href = "/profile/settings";
    });
  }, []);

  return <p className="p-6">Verifying email...</p>;
}