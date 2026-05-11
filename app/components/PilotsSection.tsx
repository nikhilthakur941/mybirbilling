"use client";

import { useState } from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";


type Pilot = {
  name: string;
  rating: number;
  specialization: string;
  location: string;
  years_experience: number;
  total_flights: number;
  certification_level: string;
  photos: string[];
  status: "online" | "busy";
  instagram?: string;
};

const pilots: Pilot[] = [
  {
    name: "Chamel Thakur",
    rating: 4.9,
    specialization: "Tandem Flight Expert & Owner",
    location: "Bir, Himachal Pradesh",
    years_experience: 11,
    total_flights: 5000,
    certification_level: "Tandem Master Pilot",
    photos: ["/compressed_g5.jpg", "/compressed_g7.jpeg", "/compressed_g3.jpeg"],
    status: "online",
    instagram: "https://www.instagram.com/chamel_my_bir_billing",
  },
  {
    name: "Gulshan Thakur",
    rating: 4.8,
    specialization: "Acrobatics Instructor",
    location: "Bir, Himachal Pradesh",
    years_experience: 7,
    total_flights: 3500,
    certification_level: "Acrobatics Pilot",
    photos: ["/gulshan.JPG", "/gulshan1.JPG", "/gulshan2.jpg"],
    status: "online",
  },
  {
    name: "Subham Bhangalia",
    rating: 4.7,
    specialization: "Cross-Country Guide",
    location: "Bir, Himachal Pradesh",
    years_experience: 6,
    total_flights: 2500,
    certification_level: "Cross-Country Pilot",
    photos: ["/shubham1.png", "/shubham2.png", "/shubham.png"],
    status: "busy",
  },
];

export default function PilotsSection() {
  return (
    <section className="w-full bg-slate-50 py-16">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Our <span className="text-blue-600">Pilots</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Fly with certified professionals who care about your safety and experience.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pilots.map((pilot) => (
            <PilotCard key={pilot.name} pilot={pilot} />
          ))}
        </div>
      </div>
    </section>  
  );
}

function PilotCard({ pilot }: { pilot: Pilot }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative h-[360px] w-full">
        <img
          src={pilot.photos[current]}
          alt={pilot.name}
          className="h-full w-full object-cover"
        />

        {pilot.photos.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrent(
                  (current - 1 + pilot.photos.length) % pilot.photos.length
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white h-9 w-9 rounded-full"
            >
              ‹
            </button>

            <button
              onClick={() =>
                setCurrent((current + 1) % pilot.photos.length)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white h-9 w-9 rounded-full"
            >
              ›
            </button>
          </>
        )}

        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${
            pilot.status === "online" ? "bg-green-500" : "bg-yellow-500"
          }`}
        >
          {pilot.status}
        </span>

        <span className="absolute top-3 right-3 bg-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
          ⭐ {pilot.rating}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-bold text-slate-900">{pilot.name}</h3>
          {pilot.instagram && (
            <a
  href={pilot.instagram}
  target="_blank"
  rel="noopener noreferrer"
  className="text-pink-600 hover:text-pink-700 transition"
>
  <FaInstagram size={20} />
</a>

          )}
        </div>

        <p className="text-blue-600 text-sm font-semibold mb-4">
          {pilot.specialization}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <Stat value={`${pilot.years_experience}+`} label="Years Exp." />
          <Stat
            value={`${(pilot.total_flights / 1000).toFixed(1)}K+`}
            label="Flights"
          />
        </div>

        <div className="text-sm text-slate-700 space-y-2 mb-6">
          <p>📍 {pilot.location}</p>
          <p>🏅 {pilot.certification_level}</p>
        </div>

        <Link
          href="/packages"
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-semibold"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-blue-50 rounded-xl py-3 text-center">
      <div className="text-lg font-bold text-blue-700">{value}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </div>
  );
}
