import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";

export default function CommunitySection() {
  return (
    <section className="w-full bg-gradient-to-br from-amber-50 to-orange-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-slate-800">
            MYBIRBILLING{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600">
              COMMUNITY
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Get the latest updates, breathtaking visuals, and exclusive offers
            directly from the source. Following our verified accounts is the
            best way to protect yourself from scams and fake pages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Card */}
          <div className="bg-slate-900 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Our Digital{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">
                  Footprint
                </span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Dive into the world of paragliding with daily flight videos,
                stunning photos from Bir Billing, and educational content for
                aspiring pilots.
              </p>

                {/* Social Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Instagram */}
                <Link
                    href="https://www.instagram.com/mybirbilling/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-pink-500 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                    <div className="text-4xl font-extrabold text-pink-500">
                    57K+
                    </div>
                    <div className="text-sm font-medium text-slate-300 flex items-center justify-center gap-2 mt-1">
                    <FaInstagram className="text-pink-500" />
                    <span>Instagram</span>
                    </div>
                </Link>

                {/* YouTube */}
                <Link
                    href="https://www.youtube.com/@mybirbilling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-red-500 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                    <div className="text-4xl font-extrabold text-red-500">
                    25K+
                    </div>
                    <div className="text-sm font-medium text-slate-300 flex items-center justify-center gap-2 mt-1">
                    <FaYoutube className="text-red-500" />
                    <span>YouTube</span>
                    </div>
                </Link>

                {/* Facebook */}
                <Link
                    href="https://www.facebook.com/share/r/1GsZJGxFCj/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-blue-500 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                    <div className="text-4xl font-extrabold text-blue-500">
                    11K+
                    </div>
                    <div className="text-sm font-medium text-slate-300 flex items-center justify-center gap-2 mt-1">
                    <FaFacebookF className="text-blue-500" />
                    <span>Facebook</span>
                    </div>
                </Link>

                {/* WhatsApp */}
                <Link
                    href="https://wa.me/919736696260"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-green-500 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                    <div className="text-4xl font-extrabold text-green-500">
                    <span className="sm:hidden">Chat</span>
                    <span className="hidden sm:inline">Chat Now</span>
                    </div>
                    <div className="text-sm font-medium text-slate-300 flex items-center justify-center gap-2 mt-1">
                    <FaWhatsapp className="text-green-500" />
                    <span>WhatsApp</span>
                    </div>
                </Link>
                </div>

              <p className="text-center text-slate-300 text-sm mt-4">
                Follow us on our official channels to get the latest updates and
                exclusive content!
              </p>
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-slate-900 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col justify-start">
            <h3 className="text-2xl font-bold text-white mb-2">
              Key Benefits of Following Us
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Following our official channels is the best way to stay in the
              loop and protect yourself from misinformation and scams. Here&apos;s
              what you get:
            </p>

            <div className="space-y-4">
              {/* Benefit 1 */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/60">
                <div className="flex-shrink-0 text-green-500 text-xl">✔</div>
                <div>
                  <p className="font-semibold text-white">
                    Verified & Authentic
                  </p>
                  <p className="text-sm text-slate-400">
                    Trustworthy content directly from our team.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/60">
                <div className="flex-shrink-0 text-amber-500 text-xl">✎</div>
                <div>
                  <p className="font-semibold text-white">Exclusive Offers</p>
                  <p className="text-sm text-slate-400">
                    Early access to discounts and special packages.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/60">
                <div className="flex-shrink-0 text-red-500 text-xl">⚠</div>
                <div>
                  <p className="font-semibold text-white">Scam Protection</p>
                  <p className="text-sm text-slate-400">
                    Avoid fake pages and fraudulent offers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}