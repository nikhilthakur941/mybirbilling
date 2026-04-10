export default function SafetyGuidelinesPage() {
  return (
    <div className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="mb-8 p-6 md:p-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl shadow-lg">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Paragliding Safety Guidelines
          </h1>
          <p className="mt-2 text-slate-300">
            Your safety is our priority. Please read these guidelines carefully.
          </p>
        </div>

        <div className="lg:flex lg:gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-md border border-slate-200">
                <div className="p-4 border-b font-semibold text-slate-800">
                  On this Page
                </div>
                <nav className="p-4">
                  <ol className="space-y-2 text-sm">
                    <li><a className="text-slate-600 hover:text-blue-600 font-medium" href="#commitment">1. Commitment to Safety</a></li>
                    <li><a className="text-slate-600 hover:text-blue-600 font-medium" href="#health">2. Health & Fitness</a></li>
                    <li><a className="text-slate-600 hover:text-blue-600 font-medium" href="#preparation">3. Flight Preparation</a></li>
                    <li><a className="text-slate-600 hover:text-blue-600 font-medium" href="#during-flight">4. During the Flight</a></li>
                    <li><a className="text-slate-600 hover:text-blue-600 font-medium" href="#equipment">5. Equipment & Pilots</a></li>
                  </ol>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            <div className="space-y-8">

              {/* Commitment */}
              <section id="commitment" className="bg-white rounded-lg shadow-md border border-slate-200 scroll-mt-24">
                <div className="p-5 border-b flex items-center gap-3">
                  <h2 className="text-xl font-bold text-slate-800">
                    1. Our Unwavering Commitment to Safety
                  </h2>
                </div>
                <div className="p-5 text-slate-600 space-y-4">
                  <p>
                    Welcome to MyBirBilling! Paragliding is an exhilarating adventure, and our mission is to provide this experience in the safest possible environment.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg">
                    <p className="font-semibold">
                      Your pilot is in command of the flight. It is crucial that you listen to and follow all of their instructions at all times.
                    </p>
                  </div>
                </div>
              </section>

              {/* Health */}
              <section id="health" className="bg-white rounded-lg shadow-md border border-slate-200 scroll-mt-24">
                <div className="p-5 border-b flex items-center gap-3">
                  <h2 className="text-xl font-bold text-slate-800">
                    2. Health & Fitness Requirements
                  </h2>
                </div>
                <div className="p-5 text-slate-600 space-y-4">
                  <p>To ensure your safety and comfort, certain physical conditions must be met:</p>
                  <ul className="space-y-3">
                    <li><strong>Weight Limit:</strong> 25 kg to 90 kg</li>
                    <li><strong>Physical Fitness:</strong> Ability to run a few steps</li>
                    <li><strong>Medical Conditions:</strong> Inform us in advance</li>
                  </ul>
                </div>
              </section>

              {/* Preparation */}
              <section id="preparation" className="bg-white rounded-lg shadow-md border border-slate-200 scroll-mt-24">
                <div className="p-5 border-b">
                  <h2 className="text-xl font-bold text-slate-800">
                    3. Preparing for Your Flight
                  </h2>
                </div>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-3">What to Wear (Do&apos;s)</h4>
                    <ul className="space-y-2 text-sm">
                      <li>Sturdy Shoes</li>
                      <li>Comfortable Clothes</li>
                      <li>Sun Protection</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-3">What to Avoid (Don&apos;ts)</h4>
                    <ul className="space-y-2 text-sm">
                      <li>No Slippers or Heels</li>
                      <li>No Loose Clothing</li>
                      <li>No Alcohol/Drugs</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* During Flight */}
              <section id="during-flight" className="bg-white rounded-lg shadow-md border border-slate-200 scroll-mt-24">
                <div className="p-5 border-b">
                  <h2 className="text-xl font-bold text-slate-800">
                    4. During the Flight
                  </h2>
                </div>
                <div className="p-5 text-slate-600">
                  <ul className="space-y-2">
                    <li>Listen carefully</li>
                    <li>Stay seated</li>
                    <li>Lift legs on landing</li>
                    <li>Communicate discomfort</li>
                  </ul>
                </div>
              </section>

              {/* Equipment */}
              <section id="equipment" className="bg-white rounded-lg shadow-md border border-slate-200 scroll-mt-24">
                <div className="p-5 border-b">
                  <h2 className="text-xl font-bold text-slate-800">
                    5. Equipment & Pilot Expertise
                  </h2>
                </div>
                <div className="p-5 text-slate-600">
                  <ul className="space-y-2">
                    <li>Certified Equipment</li>
                    <li>Licensed Expert Pilots</li>
                  </ul>
                </div>
              </section>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}