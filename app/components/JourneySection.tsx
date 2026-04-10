"use client";

import { ReactNode } from "react";

type JourneySectionProps = {
  testimonials: ReactNode; // You can pass a testimonial slider component here
};

export default function JourneySection({ testimonials }: JourneySectionProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading with Icon */}
        <div className="flex items-center gap-6 md:gap-8 mb-12">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center bg-gradient-to-br from-green-500 via-lime-500 to-emerald-500 shadow-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 md:h-14 md:w-14 text-white"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
              </svg>
            </div>
          </div>

          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
              Every Journey,
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                A New Story.
              </span>
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Collect moments, not things. Read the travelogues of our adventurers.
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-wheat shadow-lg rounded-lg p-6">
          {testimonials}
        </div>
      </div>
    </section>
  );
}
