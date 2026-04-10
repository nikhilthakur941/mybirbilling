export default function SafetyGuidelinesPage() {
  return (
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* Header */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Paragliding Safety Guidelines
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-white/20 px-2 py-1 rounded-full">
                  Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" })}
                </span>
                <span className="bg-green-500/80 px-2 py-1 rounded-full">Safety First</span>
                <span className="bg-yellow-400/80 text-black px-2 py-1 rounded-full">
                  Please Read Carefully
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href="#contact"
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg text-sm shadow hover:bg-slate-100 transition"
              >
                Contact Us
              </a>
              <button
                onClick={() => window.print()}
                className="bg-white/20 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-white/30 transition"
              >
                Print
              </button>
            </div>
          </div>
        </div>

        <div className="lg:flex lg:gap-8">

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-md border border-slate-200/80">
                <div className="p-4 border-b font-semibold text-slate-800">
                  On this page
                </div>
                <div className="p-4">
                  <ol className="space-y-2 text-sm">
                    <li><a className="text-slate-600 hover:text-blue-600 hover:underline" href="#commitment">1. Our Commitment to Safety</a></li>
                    <li><a className="text-slate-600 hover:text-blue-600 hover:underline" href="#pilot-equipment">2. Pilot & Equipment</a></li>
                    <li><a className="text-slate-600 hover:text-blue-600 hover:underline" href="#health-fitness">3. Health & Fitness</a></li>
                    <li><a className="text-slate-600 hover:text-blue-600 hover:underline" href="#flight-prep">4. Preparing for Your Flight</a></li>
                    <li><a className="text-slate-600 hover:text-blue-600 hover:underline" href="#flight-conduct">5. During the Flight</a></li>
                    <li><a className="text-slate-600 hover:text-blue-600 hover:underline" href="#site-rules">6. General Site Rules</a></li>
                    <li><a className="text-slate-600 hover:text-blue-600 hover:underline" href="#contact">7. Emergency & Contact Info</a></li>
                  </ol>
                </div>
              </div>

              <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg text-sm">
                <strong>Important:</strong> Your safety is our top priority. Following these guidelines ensures a thrilling and secure adventure.
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 mt-8 lg:mt-0">
            <div className="space-y-6">

              {/* Commitment */}
              <div id="commitment" className="bg-white rounded-lg shadow-md border border-slate-200/80 scroll-mt-24">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-bold text-slate-800">
                    Our Commitment to Safety
                  </h2>
                </div>
                <div className="p-4 text-slate-600 space-y-4">
                  <p>
                    At MyBirBilling, safety isn&apos;t just a guideline; it&apos;s the foundation of every flight.
                  </p>
                  <div className="bg-blue-50 text-blue-800 p-4 rounded-lg">
                    <strong>Your Pilot is in Command:</strong> Always listen to and follow the instructions of your pilot.
                  </div>
                </div>
              </div>

              {/* Pilot & Equipment */}
              <div id="pilot-equipment" className="bg-white rounded-lg shadow-md border border-slate-200/80 scroll-mt-24">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-bold text-slate-800">
                    Your Pilot & Equipment
                  </h2>
                </div>
                <div className="p-4 text-slate-600 space-y-3">
                  <p><strong>Certified Pilots:</strong> Licensed and highly experienced.</p>
                  <p><strong>Certified Equipment:</strong> EN/DHV rated gliders and harnesses.</p>
                  <p><strong>Rigorous Maintenance:</strong> Mandatory safety checks.</p>
                  <p><strong>Safety Gear:</strong> Helmet and secure harness provided.</p>
                </div>
              </div>

              {/* Health */}
              <div id="health-fitness" className="bg-white rounded-lg shadow-md border border-slate-200/80 scroll-mt-24">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-bold text-slate-800">
                    Health & Fitness Requirements
                  </h2>
                </div>
                <div className="p-4 text-slate-600 space-y-3">
                  <p><strong>Weight Limit:</strong> 25 kg to 90 kg</p>
                  <p><strong>Physical Fitness:</strong> Able to run a few steps</p>
                  <p><strong>High Altitude:</strong> Inform us of respiratory issues</p>
                  <p><strong>Medical Conditions:</strong> Consult doctor if needed</p>
                </div>
              </div>

              {/* Contact */}
              <div id="contact" className="bg-white rounded-lg shadow-md border border-slate-200/80 scroll-mt-24">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800">
                    Emergency & Contact Info
                  </h2>
                  <span className="text-xs bg-red-500 text-white font-semibold px-2 py-1 rounded-full">
                    Keep Handy
                  </span>
                </div>

                <div className="p-4 text-slate-600 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3">
                      <div className="font-semibold text-slate-800">Primary Contact</div>
                      <a href="tel:+919736696260" className="text-blue-600 hover:underline">
                        +91 97366 96260
                      </a>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="font-semibold text-slate-800">Official Email</div>
                      <a href="mailto:chamelthakur280@gmail.com" className="text-blue-600 hover:underline break-all">
                        chamelthakur280@gmail.com
                      </a>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="font-semibold text-slate-800">Office Location</div>
                      <div>Landing Site, Bir, Himachal Pradesh</div>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="font-semibold text-slate-800">Operating Hours</div>
                      <div>Monday–Sunday, 9:00 AM – 6:00 PM</div>
                    </div>
                  </div>

                  <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg">
                    <strong>Remember:</strong> Your safety is our shared responsibility.
                  </div>
                </div>
              </div>

            </div>

            <div className="text-right mt-6">
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600">
                Back to top ↑
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}