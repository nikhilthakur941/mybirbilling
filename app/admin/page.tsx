"use client";

import { useEffect, useState } from "react";

type DataType = {
  stats: {
    totalUsers: number;
    totalBookings: number;
    revenue: number;
  };
  recentBookings: any[];
};

export default function AdminDashboard() {
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="text-white text-center mt-20">
        Loading Dashboard...
      </div>
    );
  }

  const { stats, recentBookings } = data;

  return (
    <div className="space-y-8 text-white">

      {/* Title */}
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        <Card
          title="Total Users"
          value={stats.totalUsers}
          color="bg-blue-600"
        />

        <Card
          title="Total Bookings"
          value={stats.totalBookings}
          color="bg-green-600"
        />

        <Card
          title="Revenue"
          value={`₹ ${stats.revenue.toLocaleString()}`}
          color="bg-purple-600"
        />

      </div>

      {/* Recent Bookings */}
      <div className="bg-[#0f172a] rounded-xl border border-gray-800 p-6">

        <h2 className="text-xl font-semibold mb-4">
          Recent Bookings
        </h2>

        <table className="w-full text-left text-sm">

          <thead className="border-b border-gray-700 text-gray-300">
            <tr>
              <th className="pb-3">User</th>
              <th className="pb-3">Package</th>
              <th className="pb-3">Amount</th>
            </tr>
          </thead>

          <tbody>

            {recentBookings.length === 0 && (
              <tr>
                <td colSpan={3} className="py-6 text-center text-gray-400">
                  No bookings yet
                </td>
              </tr>
            )}

            {recentBookings.map((b) => (
              <tr
                key={b.id}
                className="border-b border-gray-800 hover:bg-[#1e293b]"
              >
                <td className="py-3">{b.guestName}</td>

                <td className="py-3">
                  {b.package?.name || "Unknown"}
                </td>

                <td className="py-3 font-semibold text-green-400">
                  ₹ {Number(b.totalAmount).toLocaleString()}
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className={`${color} p-6 rounded-xl shadow-lg`}>
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}