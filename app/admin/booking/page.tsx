import { prisma } from "@/lib/prisma";

export default async function AdminBookingsPage() {
  // 🔹 Fetch bookings
  const rawBookings = await prisma.booking.findMany({
    include: { package: true },
    orderBy: { createdAt: "desc" },
  });

  // 🔹 Convert Prisma Decimal → Number (IMPORTANT)
  const bookings = rawBookings.map((b) => ({
    ...b,
    totalAmount: Number(b.totalAmount),
    advancePaid: Number(b.advancePaid),
    balanceDue: Number(b.balanceDue),
  }));

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Bookings</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Booking #</th>
              <th className="p-4">Guest</th>
              <th className="p-4">Guests</th>
              <th className="p-4">Package</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-semibold">
                    #{b.id}
                  </td>

                  <td className="p-4">
                    <div className="font-medium text-gray-900">
                      {b.guestName}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {b.guestPhone}
                    </div>
                    {b.guestEmail && (
                      <div className="text-gray-500 text-xs">
                        {b.guestEmail}
                      </div>
                    )}
                  </td>

                  <td className="p-4 font-medium">
                    {b.guestCount}
                  </td>

                  <td className="p-4">
                    {b.package?.name ?? "Custom"}
                  </td>

                  <td className="p-4">
                    <div className="font-medium">
                      ₹{b.totalAmount}
                    </div>
                    <div className="text-xs text-green-600">
                      Paid: ₹{b.advancePaid}
                    </div>
                    <div className="text-xs text-red-600">
                      Due: ₹{b.balanceDue}
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        b.paymentStatus === "PAID"
                          ? "bg-green-100 text-green-700"
                          : b.paymentStatus === "PARTIAL"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        b.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : b.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}