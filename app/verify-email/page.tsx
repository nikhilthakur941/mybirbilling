"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function VerifyEmailContent() {
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
  }, [params]);

  return <p className="p-6">Verifying email...</p>;
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<p className="p-6">Loading...</p>}>
      <VerifyEmailContent />
    </Suspense>
  );
}