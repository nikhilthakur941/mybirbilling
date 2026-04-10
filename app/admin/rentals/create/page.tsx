"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateRental() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);

    const formData = new FormData();

    formData.append("name", fd.get("name") as string);
    formData.append("price", fd.get("price") as string);
    formData.append("type", fd.get("type") as string);

    // files
    const front = fd.get("front") as File;
    const side = fd.get("side") as File;

    if (front && front.size > 0) formData.append("front", front);
    if (side && side.size > 0) formData.append("side", side);

    await fetch("/api/admin/rentals", {
      method: "POST",
      body: formData, // ✅ send FormData
    });

    router.push("/admin/rentals");
  };

  return (
    <div className="min-h-screen bg-white text-black p-10 flex justify-center">
      <form
        onSubmit={submit}
        className="w-full max-w-xl border rounded-xl shadow p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold">Add Rental</h1>

        <input name="name" placeholder="Name" className="border p-2 w-full rounded" />

        <input name="price" type="number" placeholder="Price" className="border p-2 w-full rounded" />

        <select name="type" className="border p-2 w-full rounded">
          <option value="SCOOTY">Scooty</option>
          <option value="CAMERA">Camera</option>
        </select>

        {/* FILE UPLOAD */}
        <div className="space-y-2">
          <p className="font-semibold">Upload Images</p>

          <input type="file" name="front" className="border p-2 w-full rounded" />
          <input type="file" name="side" className="border p-2 w-full rounded" />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          {loading ? "Saving..." : "Save Rental"}
        </button>
      </form>
    </div>
  );
}