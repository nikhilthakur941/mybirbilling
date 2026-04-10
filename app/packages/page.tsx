import { prisma } from "@/lib/prisma";
import Link from "next/link";


// ===============================
// convert minutes → readable
// ===============================
function formatDuration(minutes: number) {
  if (minutes % 1440 === 0) return `${minutes / 1440} Day`;
  if (minutes % 60 === 0) return `${minutes / 60} Hr`;
  return `${minutes} Min`;
}


// ===============================
// whatsapp enquiry link
// ===============================
function getWhatsappLink(pkg: any) {
  const phone = "919805060775"; // change number if needed

  const message = `
Hi, I am interested in the *${pkg.name}* package.

Price: ₹${pkg.price ? Number(pkg.price) : 0}
Duration: ${formatDuration(pkg.duration)}

Please share more details.
  `;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}


export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    where: { isActive: true },
    include: { media: true },
    orderBy: { id: "desc" },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6">

      {/* ================= HERO ================= */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900">
          Our Packages
        </h1>
        <p className="text-gray-600 mt-2">
          Choose your perfect adventure
        </p>
      </div>


      {/* ================= GRID ================= */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          >

            {/* ================= MEDIA ================= */}
            {pkg.media?.[0] && (
              pkg.media[0].type === "VIDEO" ? (
                <video
                  src={pkg.media[0].url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-56 object-cover"
                />
              ) : (
                <img
                  src={pkg.media[0].url}
                  alt={pkg.name}
                  className="w-full h-56 object-cover"
                />
              )
            )}


            {/* ================= CONTENT ================= */}
            <div className="p-6 flex flex-col flex-1">

              {/* name */}
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {pkg.name}
              </h2>

              {/* description */}
              {pkg.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {pkg.description}
                </p>
              )}

              {/* price + duration row */}
              <div className="flex items-center justify-between mb-6">

                <p className="text-2xl font-bold text-purple-600">
                  ₹{pkg.price ? Number(pkg.price) : 0}
                </p>

                {/* duration with icon */}
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <span>⏱</span>
                  <span>{formatDuration(pkg.duration)}</span>
                </div>

              </div>


              {/* ================= BUTTONS ================= */}
              <div className="grid grid-cols-2 gap-3 mt-auto">

                {/* BOOK */}
                <Link
                  href={`/booking?packageId=${pkg.id}`}
                  className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition"
                >
                  Book Now
                </Link>

                {/* ENQUIRY (WhatsApp) */}
                <Link
                  href={`/packages/${pkg.id}`}
                  className="text-center border-2 border-green-600 text-green-600 py-3 rounded-lg font-medium hover:bg-green-600 hover:text-white transition"
                >
                  Information
                </Link>

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}