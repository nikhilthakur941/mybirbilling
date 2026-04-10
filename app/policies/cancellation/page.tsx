export default function CancellationPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <div className="bg-slate-50 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">

          {/* Header */}
          <div className="p-6 md:p-10 text-center border-b border-slate-200">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              Cancellation & Refund Policy
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              <strong>Updated on:</strong> {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 text-slate-700 leading-relaxed space-y-10">

            {/* Commitment */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3 pb-2 border-b">
                Our Commitment to Flexibility
              </h2>
              <p>
                At MyBirBilling, we understand that plans can change. Our cancellation policy is designed to be as flexible and fair as possible while accounting for the operational planning required for a safe and memorable paragliding experience. Your safety and satisfaction are our top priorities.
              </p>
            </div>

            {/* Timeframes */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3 pb-2 border-b">
                Cancellation Timeframes & Refund Amounts
              </h2>

              <p className="mb-4">
                To receive a refund, you must notify us of your cancellation within the timeframes mentioned below. Refunds are based on the time of cancellation before your scheduled flight time:
              </p>

              {/* Success Box */}
              <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-lg mb-4">
                <ul className="space-y-2">
                  <li>
                    <strong>Full Refund (100%):</strong> If you cancel more than 48 hours (2 days) before your scheduled flight.
                  </li>
                  <li>
                    <strong>Partial Refund (50%):</strong> If you cancel between 24 to 48 hours before your scheduled flight.
                  </li>
                </ul>
              </div>

              {/* Danger Box */}
              <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-lg mb-4">
                <ul>
                  <li>
                    <strong>No Refund:</strong> If you cancel less than 24 hours before your flight, or in case of a no-show.
                  </li>
                </ul>
              </div>

              <p>
                <strong>Note:</strong> All refunds are processed to the original mode of payment and may take 5-7 business days to reflect in your account.
              </p>
            </div>

            {/* Weather */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3 pb-2 border-b">
                Weather & Safety Cancellations
              </h2>

              <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-6 rounded-lg mb-4">
                <h4 className="font-bold mb-2">Your Safety is Non-Negotiable</h4>
                <p>
                  Paragliding is highly dependent on weather conditions. MyBirBilling reserves the right to cancel or reschedule any flight due to bad weather (rain, high winds, poor visibility) or any other safety concerns. In such cases, we will provide you with the following options:
                </p>
              </div>

              <div className="bg-slate-100 border border-slate-200 p-5 rounded-lg">
                <ul className="space-y-2">
                  <li>
                    <strong>Reschedule:</strong> You can choose another available date and time for your flight at no extra cost.
                  </li>
                  <li>
                    <strong>Full Refund:</strong> If you are unable to reschedule, we will provide a 100% refund of your booking amount.
                  </li>
                </ul>
              </div>
            </div>

            {/* How to Cancel */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3 pb-2 border-b">
                How to Request a Cancellation
              </h2>

              <p className="mb-4">
                To cancel your booking, please contact us through one of the methods below. The easiest and fastest way is to call us or send a message on WhatsApp.
              </p>

              {/* CTA Box */}
              <div className="bg-slate-900 text-white rounded-xl p-6 mb-4 shadow-lg">
                <h4 className="text-lg font-bold mb-1">
                  Ready to Cancel? Contact Us Directly!
                </h4>
                <p className="text-slate-300 mb-4">
                  Please have your Booking ID or registered phone number ready.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+919736696260"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold"
                  >
                    📞 Call to Cancel
                  </a>

                  <a
                    href="https://wa.me/919736696260?text=Hi, I would like to cancel my paragliding booking."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 transition font-semibold"
                  >
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>

              <p>
                You can also email us at{" "}
                <strong>chamelthakur280@gmail.com</strong> with your booking details and reason for cancellation.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}