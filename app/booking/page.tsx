"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

// ===============================
// SAFE IMAGE PARSER
// ===============================
function parseImages(field: any) {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === "string") {
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

// ===============================
// BOOKING FORM
// ===============================
function BookingForm() {
  const params = useSearchParams();
  const packageId = params.get("packageId");

  const [pkg, setPkg] = useState<any>(null);
  const [stays, setStays] = useState<any[]>([]);
  const [rentals, setRentals] = useState<any[]>([]);

  const [selectedStay, setSelectedStay] = useState<any>(null);
  const [selectedRentals, setSelectedRentals] = useState<number[]>([]);

  const [guestCount, setGuestCount] = useState(1);
  const [payType, setPayType] = useState<"FULL" | "TOKEN">("FULL");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const TOKEN_PERCENT = 0.2;

  // ================= FETCH =================
  useEffect(() => {
    if (!packageId) return;

    setDataLoading(true);

    Promise.all([
      fetch(`/api/packages/${packageId}`).then((r) => r.json()),
      fetch(`/api/stays`).then((r) => r.json()),
      fetch(`/api/rentals`).then((r) => r.json()),
    ])
      .then(([pkgData, staysData, rentalsData]) => {
        setPkg(pkgData);
        setStays(Array.isArray(staysData) ? staysData : []);
        setRentals(Array.isArray(rentalsData) ? rentalsData : []);
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setDataLoading(false));
  }, [packageId]);

  // ================= PRICE =================
  const base = pkg ? Number(pkg.price) * guestCount : 0;
  const stayPrice = selectedStay ? Number(selectedStay.price) : 0;
  const rentalPrice = selectedRentals.reduce((sum, id) => {
    const r = rentals.find((x) => x.id === id);
    return sum + (r ? Number(r.price) : 0);
  }, 0);

  const totalAmount = base + stayPrice + rentalPrice;
  const tokenAmount = Math.round(totalAmount * TOKEN_PERCENT);
  const payableAmount = payType === "TOKEN" ? tokenAmount : totalAmount;

  // ================= RAZORPAY =================
  async function loadRazorpay() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  // ================= SUBMIT =================
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!pkg) return;

    setLoading(true);

    try {
      const fd = new FormData(e.currentTarget);

      const bookingRes = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: fd.get("guestName"),
          guestEmail: fd.get("guestEmail"),
          guestPhone: fd.get("guestPhone"),
          guestCount: Number(guestCount),
          packageId: Number(packageId),
          stayId: selectedStay?.id || null,
          rentalIds: selectedRentals,
        }),
      });

      const booking = await bookingRes.json();

      if (!booking?.id) {
        alert("Booking failed. Please try again.");
        setLoading(false);
        return;
      }

      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: payableAmount,
          receipt: `booking_${booking.id}`,
        }),
      });

      const order = await orderRes.json();
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Razorpay failed to load");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: "INR",
        name: "MyBirBilling",
        order_id: order.id,
        handler: async function (response: any) {
          await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              bookingId: booking.id,
              paidAmount: payableAmount,
            }),
          });
          window.location.href = "/booking/success";
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center">
        <p className="text-white text-xl animate-pulse">Loading package...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-pink-500 p-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ===== HEADER ===== */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-white text-center">
          <h1 className="text-3xl font-bold">{pkg.name}</h1>
          <p className="text-white/70 mt-1">Complete your booking below</p>
        </div>

        <form onSubmit={submit} className="space-y-6">

          {/* ===== GUEST DETAILS ===== */}
          <div className="bg-white rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Guest Details</h2>

            <input
              name="guestName"
              required
              placeholder="Full Name *"
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              name="guestEmail"
              type="email"
              placeholder="Email (optional)"
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              name="guestPhone"
              required
              placeholder="Phone *"
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Number of Guests
              </label>
              <input
                type="number"
                min={1}
                value={guestCount}
                onChange={(e) =>
                  setGuestCount(Math.max(1, Number(e.target.value)))
                }
                className="w-full p-3 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* ===== STAYS ===== */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Select Stay
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Optional — click again to deselect
            </p>

            {dataLoading ? (
              <p className="text-gray-400 text-sm animate-pulse">
                Loading stays...
              </p>
            ) : stays.length === 0 ? (
              <p className="text-gray-400 text-sm">No stays available</p>
            ) : (
              <div className="space-y-3">
                {stays.map((s) => {
                  const imgs = parseImages(s.images);
                  const isSelected = selectedStay?.id === s.id;

                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedStay(isSelected ? null : s)}
                      className={`flex items-center gap-4 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-100 hover:border-purple-200"
                      }`}
                    >
                      {imgs[0]?.url ? (
                        <img
                          src={imgs[0].url}
                          alt={s.name}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl">
                          🏨
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800">{s.name}</p>
                        <p className="text-purple-600 text-sm font-medium">
                          ₹{Number(s.price)} /{" "}
                          {s.priceType === "DAY" ? "night" : "fly"}
                        </p>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-purple-500 bg-purple-500"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ===== RENTALS ===== */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Add-ons
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Optional — Scooty or Camera rentals
            </p>

            {dataLoading ? (
              <p className="text-gray-400 text-sm animate-pulse">
                Loading rentals...
              </p>
            ) : rentals.length === 0 ? (
              <p className="text-gray-400 text-sm">No rentals available</p>
            ) : (
              <div className="space-y-3">
                {rentals.map((r) => {
                  const imgs = parseImages(r.image);
                  const isChecked = selectedRentals.includes(r.id);

                  return (
                    <div
                      key={r.id}
                      onClick={() =>
                        setSelectedRentals((prev) =>
                          isChecked
                            ? prev.filter((id) => id !== r.id)
                            : [...prev, r.id]
                        )
                      }
                      className={`flex items-center gap-4 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        isChecked
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-100 hover:border-pink-200"
                      }`}
                    >
                      {imgs[0]?.url ? (
                        <img
                          src={imgs[0].url}
                          alt={r.name}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl">
                          {r.type === "SCOOTY" ? "🛵" : "📷"}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800">{r.name}</p>
                        <p className="text-pink-600 text-sm font-medium">
                          ₹{Number(r.price)} /{" "}
                          {r.priceType === "DAY" ? "day" : "fly"}
                        </p>
                        <p className="text-xs text-gray-400">{r.type}</p>
                      </div>

                      <div
                        className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                          isChecked
                            ? "border-pink-500 bg-pink-500"
                            : "border-gray-300"
                        }`}
                      >
                        {isChecked && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ===== PRICE SUMMARY ===== */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Price Summary
            </h2>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>
                  Package × {guestCount} guest{guestCount > 1 ? "s" : ""}
                </span>
                <span>₹{base}</span>
              </div>

              {selectedStay && (
                <div className="flex justify-between">
                  <span>Stay: {selectedStay.name}</span>
                  <span>₹{stayPrice}</span>
                </div>
              )}

              {selectedRentals.map((id) => {
                const r = rentals.find((x) => x.id === id);
                return r ? (
                  <div key={id} className="flex justify-between">
                    <span>{r.name}</span>
                    <span>₹{Number(r.price)}</span>
                  </div>
                ) : null;
              })}

              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-gray-800 text-base">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>

              {payType === "TOKEN" && (
                <div className="flex justify-between text-orange-500 font-medium">
                  <span>Token Amount (20%)</span>
                  <span>₹{tokenAmount}</span>
                </div>
              )}
            </div>
          </div>

          {/* ===== PAYMENT TYPE ===== */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Payment Option
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPayType("FULL")}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  payType === "FULL"
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 text-gray-600 hover:border-purple-200"
                }`}
              >
                <p className="font-bold text-lg">₹{totalAmount}</p>
                <p className="text-sm">Pay Full</p>
              </button>

              <button
                type="button"
                onClick={() => setPayType("TOKEN")}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  payType === "TOKEN"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 text-gray-600 hover:border-orange-200"
                }`}
              >
                <p className="font-bold text-lg">₹{tokenAmount}</p>
                <p className="text-sm">Pay Token (20%)</p>
              </button>
            </div>
          </div>

          {/* ===== SUBMIT ===== */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : `Pay ₹${payableAmount}`}
          </button>

        </form>
      </div>
    </div>
  );
}

// ===============================
// PAGE (wrapped in Suspense for useSearchParams)
// ===============================
export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center">
          <p className="text-white text-xl animate-pulse">Loading...</p>
        </div>
      }
    >
      <BookingForm />
    </Suspense>
  );
}