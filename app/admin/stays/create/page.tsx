"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateStay() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.target);

    const formData = new FormData();

    formData.append("name", fd.get("name") as string);
    formData.append("price", fd.get("price") as string);

    // 👇 append files with labels
    const bedroom = fd.get("bedroom") as File;
    const bathroom = fd.get("bathroom") as File;
    const view = fd.get("view") as File;

    if (bedroom && bedroom.size > 0) {
       formData.append("bedroom", bedroom);
       }

     if (bathroom && bathroom.size > 0) {
     formData.append("bathroom", bathroom);
     }

     if (view && view.size > 0) {
     formData.append("view", view);
     }

    await fetch("/api/admin/stays", {
      method: "POST",
      body: formData, // ✅ send as formData
    });

    router.push("/admin/stays");
  };

  return (
    <div className="min-h-screen bg-white flex justify-center p-6">

      <form
        onSubmit={submit}
        className="w-full max-w-2xl border-2 border-gray-300 rounded-xl shadow-xl p-8 space-y-6"
      >

        <h1 className="text-2xl font-bold text-black">
          Add Hotel / Stay
        </h1>

        {/* NAME */}
        <input
          name="name"
          placeholder="Hotel Name"
          required
          className="w-full border-2 border-gray-400 text-black p-3 rounded-md"
        />

        {/* PRICE */}
        <input
          name="price"
          type="number"
          placeholder="Price per day"
          required
          className="w-full border-2 border-gray-400 text-black p-3 rounded-md"
        />

        {/* IMAGES */}
        <div className="space-y-4">

          <div>
            <label className="text-black">Bedroom</label>
            <input type="file" name="bedroom" accept="image/*" />
          </div>

          <div>
            <label className="text-black">Bathroom</label>
            <input type="file" name="bathroom" accept="image/*" />
          </div>

          <div>
            <label className="text-black">View / Balcony</label>
            <input type="file" name="view" accept="image/*" />
          </div>

        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-md">
          {loading ? "Uploading..." : "Save Hotel"}
        </button>

      </form>
    </div>
  );
}