"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ImageType = {
  title: string;
  url: string;
};

type Rental = {
  id: number;
  name: string;
  price: number;
  priceType: "DAY" | "FLY";
  type: "SCOOTY" | "CAMERA";
  image?: ImageType[];
};

export default function RentalsPage() {
  const [data, setData] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetch("/api/admin/rentals");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-10 bg-white min-h-screen text-black">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Rentals</h1>

        <Link
          href="/admin/rentals/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          + Add Rental
        </Link>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500 mt-20">
          Loading rentals...
        </p>
      )}

      {/* EMPTY STATE */}
      {!loading && data.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          No rentals added yet
        </p>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {data.map((r) => (
          <div
            key={r.id}
            className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-lg transition flex flex-col gap-3"
          >

            {/* MAIN IMAGE */}
            <div className="h-40 bg-gray-100 rounded-xl overflow-hidden">
              {r.image?.[0]?.url ? (
                <img
                  src={r.image[0].url}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No Image
                </div>
              )}
            </div>

            {/* NAME */}
            <h2 className="font-semibold text-lg">{r.name}</h2>

            {/* PRICE */}
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <span>
                ₹{Number(r.price)} /{" "}
                {r.priceType === "DAY" ? "day" : "fly"}
              </span>

              <span className="bg-gray-200 px-2 py-1 rounded text-xs">
                {r.type}
              </span>
            </div>

            {/* LABEL TAGS */}
            <div className="flex flex-wrap gap-2">
              {r.image?.map((img, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 px-2 py-1 rounded"
                >
                  {img.title}
                </span>
              ))}
            </div>

            {/* MINI GALLERY */}
            <div className="flex gap-2 overflow-x-auto">
              {r.image?.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  className="h-14 w-20 object-cover rounded border"
                />
              ))}
            </div>

            {/* ACTIONS (READY FOR NEXT STEP) */}
            <div className="flex gap-2 pt-3 border-t">
              <Link
                href={`/admin/rentals/edit/${r.id}`}
                className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Edit
              </Link>

              <button
                onClick={async () => {
                  if (!confirm("Delete this rental?")) return;

                  await fetch(`/api/admin/rentals/${r.id}`, {
                    method: "DELETE",
                  });

                  load();
                }}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}