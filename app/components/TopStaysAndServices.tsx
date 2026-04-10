"use client";

export default function TopStaysAndServices() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-2">
          Our Top Stays & Services
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12">
          Choose your perfect accommodation and get the best local service deals.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1 */}
          <Card
            title="Bunks"
            price="@ 499"
            subtitle="Per Person / Night"
            image="https://images.pexels.com/photos/7061730/pexels-photo-7061730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />

          {/* Card 2 */}
          <Card
            title="Double Room"
            price="@ 1500"
            subtitle="Per Room / Night"
            image="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />

          {/* Card 3 */}
          <Card
            title="Deluxe Camps"
            price="@ 2500"
            subtitle="Per Room / Night"
            image="https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          />

          {/* Card 4 */}
          <Card
            title="Premium Room"
            price="@ 3000"
            subtitle="Per Room / Night"
            image="https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          />
        </div>

        {/* Bottom Offer Section */}
        <div className="mt-12 p-6 sm:p-8 rounded-lg shadow-2xl bg-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="text-white space-y-3">
              <p className="text-xl sm:text-2xl font-bold border-b pb-2 border-slate-600 mb-4">
                Additional Services:
              </p>
              <p className="text-lg sm:text-xl font-semibold">
                Per Meal:{" "}
                <span className="text-orange-500 font-bold">@ 149</span>
              </p>
              <p className="text-lg sm:text-xl font-semibold">
                Scooty Per Day:{" "}
                <span className="text-orange-500 font-bold">@ 599</span>
              </p>
            </div>

            <div className="bg-orange-500 p-4 sm:p-6 rounded-lg shadow-xl text-center">
              <p className="text-lg sm:text-xl font-extrabold text-white tracking-wider">
                EXCLUSIVE PACKAGE OFFER!
              </p>
              <p className="text-3xl sm:text-4xl font-black text-white mt-1 mb-1 sm:mb-2">
                10% OFF
              </p>
              <p className="text-xs sm:text-sm font-semibold text-white">
                on Total package if booked all Through Us!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Card Component ---------------- */

function Card({
  title,
  price,
  subtitle,
  image,
}: {
  title: string;
  price: string;
  subtitle: string;
  image: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300">
      <div className="h-32 sm:h-40 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3 sm:p-4 text-center">
        <div className="bg-orange-500 w-6 h-6 sm:w-8 sm:h-8 rounded-full mx-auto -mt-6 sm:-mt-8 mb-2 relative shadow-md"></div>

        <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1">
          {title}
        </h3>

        <p className="text-xl sm:text-3xl font-extrabold text-orange-600">
          {price}
        </p>

        <p className="text-xs sm:text-sm text-gray-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
