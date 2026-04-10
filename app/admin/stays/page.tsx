"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ImageType = {
  title: string;
  url: string;
};

type Stay = {
  id: number;
  name: string;
  price: number;
  images?: ImageType[];
};

export default function StaysPage() {
  const [stays, setStays] = useState<Stay[]>([]);

  const load = async () => {
    const res = await fetch("/api/admin/stays");
    const data = await res.json();
    setStays(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-10 bg-white min-h-screen text-black">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hotels / Stay</h1>

        <Link
          href="/admin/stays/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
        >
          + Add Hotel
        </Link>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {stays.map((s) => (
          <div
            key={s.id}
            className="border rounded-xl shadow-sm p-4 bg-gray-50"
          >

            {/* MAIN IMAGE */}
            {s.images?.[0]?.url && (
              <img
                src={s.images[0].url}
                className="h-40 w-full object-cover rounded-lg"
              />
            )}

            {/* NAME + PRICE */}
            <h2 className="font-semibold text-lg mt-3">{s.name}</h2>
            <p className="text-gray-700">₹{s.price} / day</p>

            {/* IMAGE LABELS */}
            <div className="flex flex-wrap gap-2 mt-3">
              {s.images?.map((img, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 px-2 py-1 rounded"
                >
                  {img.title}
                </span>
              ))}
            </div>

            {/* SMALL PREVIEW GALLERY */}
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {s.images?.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  className="h-16 w-20 object-cover rounded border"
                />
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}