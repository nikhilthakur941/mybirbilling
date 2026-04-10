import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

// ===============================
// TYPES
// ===============================
type DetailSection = {
  title: string;
  points: string[];
};

// ===============================
// FORMAT DURATION
// ===============================
function formatDuration(minutes: number) {
  if (minutes % 1440 === 0) return `${minutes / 1440} Day`;
  if (minutes % 60 === 0) return `${minutes / 60} Hr`;
  return `${minutes} Min`;
}

// ===============================
// PAGE
// ===============================
export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const packageId = Number(id);

  if (isNaN(packageId)) return notFound();

  // ================= FETCH DATA =================
  const [pkg, stays, rentals] = await Promise.all([
    prisma.package.findUnique({
      where: { id: packageId },
      include: { media: true },
    }),
    prisma.stay.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.rental.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  if (!pkg) return notFound();

  const details = (pkg.details || []) as DetailSection[];
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919805060775";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* ================= MEDIA ================= */}
        {pkg.media?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-2">
            {pkg.media.map((m, i) =>
              m.type === "VIDEO" ? (
                <video
                  key={i}
                  src={m.url}
                  controls
                  className="w-full h-[300px] object-cover"
                />
              ) : (
                <img
                  key={i}
                  src={m.url}
                  alt={pkg.name}
                  className="w-full h-[300px] object-cover"
                />
              )
            )}
          </div>
        ) : (
          <img
            src="/no-image.png"
            className="w-full h-[300px] object-cover"
          />
        )}

        {/* ================= CONTENT ================= */}
        <div className="p-8">

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {pkg.name}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {pkg.description || "No description available"}
          </p>

          {/* PRICE + DURATION */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">

            <div className="text-3xl font-bold text-purple-600">
              ₹{pkg.price ? Number(pkg.price) : 0}
            </div>

            <div className="text-gray-700 text-lg">
              ⏱ {formatDuration(pkg.duration)}
            </div>

          </div>

          {/* ================= DETAILS ================= */}
          {details.length > 0 && (
            <div className="space-y-6 mb-10">

              <h2 className="text-2xl font-semibold text-gray-900">
                Package Details
              </h2>

              {details.map((section, i) => (
                <div key={i} className="border rounded-xl p-5 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    {section.title}
                  </h3>

                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {section.points?.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}

            </div>
          )}

          {/* ================= STAYS ================= */}
          {stays.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6">Hotel Stay</h2>

              <div className="grid md:grid-cols-3 gap-6">
                {stays.map((s: any) => (
                  <div key={s.id} className="border rounded-xl p-4 bg-gray-50">

                    <img
                      src={
                        Array.isArray(s.images)
                          ? s.images[0]?.url
                          : typeof s.images === "string"
                          ? s.images
                          : s.images?.url
                        || "/no-image.png"
                      }
                      className="h-40 w-full object-cover rounded-lg"
                    />

                    <h3 className="font-semibold mt-3">{s.name}</h3>

                    <p className="text-gray-700">
                      ₹{s.price ? Number(s.price) : 0} / night
                    </p>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= RENTALS ================= */}
          {rentals.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6">
                Add-ons (Scooty / Camera)
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {rentals.map((r: any) => (
                  <div key={r.id} className="border rounded-xl p-4 bg-gray-50">

                    <img
                      src={
                        Array.isArray(r.image)
                          ? r.image[0]?.url
                          : typeof r.image === "string"
                          ? r.image
                          : r.image?.url
                        || "/no-image.png"
                      }
                      className="h-40 w-full object-cover rounded-lg"
                    />

                    <h3 className="font-semibold mt-3">{r.name}</h3>

                    <p className="text-gray-700">
                      ₹{r.price ? Number(r.price) : 0} /{" "}
                      {r.priceType === "DAY" ? "day" : "fly"}
                    </p>

                    <p className="text-sm text-gray-500">{r.type}</p>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= BUTTONS ================= */}
          <div className="flex flex-wrap gap-4">

            <a
              href={`/booking?packageId=${pkg.id}`}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition"
            >
              Book Now
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `Hi, I am interested in the ${pkg.name} package.`
              )}`}
              target="_blank"
              className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-600 hover:text-white transition"
            >
              Enquiry
            </a>

          </div>

        </div>
      </div>
    </div>
  );
}