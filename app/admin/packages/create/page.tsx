"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePackage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ NEW STATE
  const [details, setDetails] = useState([
    { title: "", points: [""] }
  ]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);

    // duration → minutes
    const value = Number(fd.get("durationValue") || 0);
    const unit = fd.get("durationUnit");

    let minutes = value;
    if (unit === "hours") minutes = value * 60;
    if (unit === "days") minutes = value * 1440;

    fd.set("duration", String(minutes));
    fd.set("price", String(Number(fd.get("price") || 0)));

    // ✅ ADD DETAILS
    fd.append("details", JSON.stringify(details));

    await fetch("/api/admin/packages", {
      method: "POST",
      body: fd,
    });

    router.push("/admin/packages");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-lg bg-white border-2 border-gray-300 rounded-xl shadow-lg p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold text-black">
          Create Package
        </h1>

        {/* NAME */}
        <input name="name" required className="w-full border-2 p-3" placeholder="Name" />

        {/* DESCRIPTION */}
        <textarea name="description" className="w-full border-2 p-3" placeholder="Description" />

        {/* DURATION */}
        <div className="flex gap-3">
          <input name="durationValue" type="number" required className="flex-1 border-2 p-3" />
          <select name="durationUnit" className="border-2 p-3">
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>

        {/* PRICE */}
        <input name="price" type="number" required className="w-full border-2 p-3" />

        {/* MEDIA */}
        <input type="file" name="files" multiple />

        {/* ================= DETAILS ================= */}
        <div>
          <h2 className="font-semibold">Package Details</h2>

          {details.map((section, index) => (
            <div key={index} className="border p-3 mb-3">

              <input
                placeholder="Section Title"
                value={section.title}
                onChange={(e) => {
                  const updated = [...details];
                  updated[index].title = e.target.value;
                  setDetails(updated);
                }}
                className="w-full border p-2 mb-2"
              />

              {section.points.map((point, pIndex) => (
                <input
                  key={pIndex}
                  placeholder="Point"
                  value={point}
                  onChange={(e) => {
                    const updated = [...details];
                    updated[index].points[pIndex] = e.target.value;
                    setDetails(updated);
                  }}
                  className="w-full border p-2 mb-2"
                />
              ))}

              <button
                type="button"
                onClick={() => {
                  const updated = [...details];
                  updated[index].points.push("");
                  setDetails(updated);
                }}
              >
                + Add Point
              </button>

              <button
                type="button"
                onClick={() => {
                  setDetails(details.filter((_, i) => i !== index));
                }}
                className="ml-3 text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setDetails([...details, { title: "", points: [""] }])
            }
          >
            + Add Section
          </button>
        </div>

        {/* BUTTONS */}
        <button disabled={loading} className="bg-green-600 text-white p-3 w-full">
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}