import {
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function RefundPolicyPage() {
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
              Booking & Refund Policy
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 text-slate-700 leading-relaxed">

            {/* 1. Booking Process */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b">
                1. Booking Process
              </h2>

              <p className="mb-4">
                You can book your paragliding slot through the following methods:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
                  <span>
                    <strong>Online Booking:</strong> Visit our website, select your desired package, and complete the payment process.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
                  <span>
                    <strong>Phone/WhatsApp:</strong> Contact us at{" "}
                    <strong className="text-slate-800">+91 97366 96260</strong> to confirm your slot.
                  </span>
                </li>
              </ul>

              <p className="mt-4">
                A booking is considered confirmed only after we receive the advance or full payment.
                You will receive a confirmation email and message from our team.
              </p>
            </div>

            {/* 2. Cancellation & Refund */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b">
                2. Cancellation & Refund Policy
              </h2>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
                  <span><strong>Cancellation 7 days before the booking date:</strong> 100% refund.</span>
                </li>

                <li className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
                  <span><strong>Cancellation between 3 to 7 days before:</strong> 50% refund.</span>
                </li>

                <li className="flex items-start gap-3">
                  <FaTimesCircle className="w-5 h-5 mt-1 text-red-500 flex-shrink-0" />
                  <span><strong>Cancellation less than 3 days (72 hours) before:</strong> No refund will be provided.</span>
                </li>
              </ul>
            </div>

            {/* 3. Weather */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b">
                3. Weather Conditions
              </h2>

              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
                  <span>We will try to reschedule your flight for the next available time slot.</span>
                </li>

                <li className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
                  <span>
                    If you cannot reschedule, you will receive a{" "}
                    <strong className="text-slate-800">100% refund</strong>.
                  </span>
                </li>
              </ul>
            </div>

            {/* Important Note */}
            <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-6 rounded-lg my-8">
              <h4 className="font-bold mb-2">Important Note on Refunds</h4>
              <p className="text-sm">
                All refunds will be processed within 5-7 working days and will be credited to the original mode of payment.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b">
                Contact Us
              </h2>

              <div className="mt-4 border-t border-slate-200 pt-4 space-y-1">
                <p className="font-semibold">
                  <strong>Phone/WhatsApp:</strong> +91 97366 96260
                </p>
                <p className="font-semibold">
                  <strong>Email:</strong> chamelthakur280@gmail.com
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}