"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Package = {
  id: number;
  name: string;
  description: string | null;
  duration: number;
  price: number;
  isActive: boolean;
  details?: any[];
  media: { url: string; type: "IMAGE" | "VIDEO" }[];
};

function formatDuration(minutes: number) {
  if (minutes >= 1440) return `${minutes / 1440} day(s)`;
  if (minutes >= 60) return `${minutes / 60} hour(s)`;
  return `${minutes} min`;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);

  const load = async () => {
    const res = await fetch("/api/admin/packages");
    setPackages(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  // =========================
  // DELETE (optimistic UI)
  // =========================
  const remove = async (id: number) => {
    if (!confirm("Delete this package?")) return;

    setPackages((prev) => prev.filter((p) => p.id !== id));

    await fetch(`/api/admin/packages/${id}`, {
      method: "DELETE",
    });
  };

  // =========================
  // TOGGLE (instant UI)
  // =========================
  const toggle = async (p: Package) => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === p.id
          ? { ...pkg, isActive: !pkg.isActive }
          : pkg
      )
    );

    await fetch(`/api/admin/packages/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !p.isActive }),
    });
  };

  return (
    <div className="p-10 bg-white min-h-screen text-gray-900">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-black">
          Packages
        </h1>

        <Link
          href="/admin/packages/create"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700"
        >
          + Create Package
        </Link>
      </div>

      {packages.length === 0 && (
        <p className="text-center text-gray-600 mt-20">
          No packages yet
        </p>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {packages.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-xl transition flex flex-col gap-4"
          >
            {/* MEDIA */}
            <div className="relative h-44 bg-gray-100 rounded-xl overflow-hidden">
              {p.media?.[0] ? (
                p.media[0].type === "IMAGE" ? (
                  <img
                    src={p.media[0].url}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={p.media[0].url}
                    className="w-full h-full object-cover"
                    muted
                  />
                )
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No Media
                </div>
              )}

              {/* MEDIA TYPE BADGE */}
              {p.media?.[0] && (
                <span className="absolute top-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
                  {p.media[0].type}
                </span>
              )}
            </div>

            {/* INFO */}
            <div>
              <h2 className="text-lg font-semibold text-black">
                {p.name}
              </h2>

              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {p.description || "No description"}
              </p>
            </div>

            {/* META */}
            <div className="flex justify-between text-sm font-medium text-gray-800">
              <span>⏱ {formatDuration(p.duration)}</span>
              <span>₹{p.price}</span>
            </div>

            {/* DETAILS COUNT */}
            <div className="text-xs text-gray-600">
              📋 {p.details?.length || 0} sections
            </div>

            {/* STATUS */}
            <button
              onClick={() => toggle(p)}
              className={`w-fit px-3 py-1 text-xs rounded-full font-semibold transition
                ${
                  p.isActive
                    ? "bg-green-600 text-white"
                    : "bg-gray-400 text-white"
                }`}
            >
              {p.isActive ? "Active" : "Inactive"}
            </button>

            {/* ACTIONS */}
            <div className="flex gap-3 pt-3 border-t">
              <Link
                href={`/admin/packages/edit/${p.id}`}
                className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Edit
              </Link>

              <button
                onClick={() => remove(p.id)}
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