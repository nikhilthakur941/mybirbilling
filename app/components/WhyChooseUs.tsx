import Link from "next/link";

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-orange-50 via-white to-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Why Choose Us
            </h3>
            <p className="text-gray-600">
              India&apos;s Most Trusted Paragliding Company
            </p>
          </div>

          {/* Desktop Features */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: "🌍", title: "World's 2nd", desc: "Best Site" },
              { icon: "⛰️", title: "2400m", desc: "Take-off Height" },
              { icon: "⏱️", title: "30+ Min", desc: "Flight Time" },
              { icon: "☀️", title: "300+ Days", desc: "Flying Weather" },
              { icon: "👨‍✈️", title: "Certified", desc: "Pilots" },
              { icon: "📹", title: "GoPro", desc: "Free Videos" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <h4 className="text-sm font-bold text-gray-800">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile Features */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            {[
              { icon: "🌍", text: "World's 2nd Best" },
              { icon: "⛰️", text: "2400m High" },
              { icon: "⏱️", text: "30 Min Flight" },
              { icon: "👨‍✈️", text: "Pro Pilots" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-3 shadow text-center"
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <h4 className="text-xs font-bold text-gray-800">
                  {item.text}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
              WE ARE
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-6">
              MYBIRBILLING
            </h3>

            <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
              Your gateway to the skies at India&apos;s paragliding capital.
              We deliver unforgettable flying experiences with safety,
              professionalism, and passion.
            </p>

            <div className="space-y-3">
              {[
                {
                  icon: "🪂",
                  title: "Tandem Paragliding",
                  desc: "Fly with certified pilots, no experience needed",
                },
                {
                  icon: "🎓",
                  title: "Training Courses",
                  desc: "P1–P4 certification programs available",
                },
                {
                  icon: "🏕️",
                  title: "Adventure Combos",
                  desc: "Paragliding + camping & trekking packages",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start bg-white/70 backdrop-blur rounded-lg p-3"
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                      {item.title}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 text-white relative shadow-2xl overflow-hidden">

              <div className="absolute top-4 right-4 bg-orange-500 text-xs px-3 py-1 rounded-full">
                Est. 2010
              </div>

              <h4 className="text-xl font-bold mb-4 text-orange-400">
                About Our Journey
              </h4>

              <p className="text-sm md:text-base leading-relaxed mb-6 text-gray-100">
                Operating at Bir Billing—ranked 2nd globally for paragliding—
                we&apos;ve completed 10,000+ successful flights with zero
                compromise on safety.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { value: "10K+", label: "Happy Flyers" },
                  { value: "15+", label: "Years Exp" },
                  { value: "100%", label: "Safety" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur rounded-lg p-3 text-center"
                  >
                    <div className="text-2xl font-bold text-orange-400">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/packages"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:scale-105 transition shadow-lg"
                >
                  Book Flight →
                </Link>

                <a
                  href="tel:+919882125039"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur rounded-lg border border-white/20 hover:bg-white/20 transition"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}