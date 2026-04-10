"use client";

import Link from "next/link";
import styles from "./hero.module.css";
export default function Hero() {
  return (
    <section
  className={`
    relative w-full
    min-h-[calc(100vh-80px)]
    flex items-center
    overflow-hidden
  `}
>
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-[0.6]"
        poster="/compressed_g3.jpeg"
        autoPlay
        loop
        playsInline
        muted
      >
        <source src="/hero-video-compressed.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center py-16 md:py-24">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">

          {/* Heading */}
          <div className="space-y-2 mb-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white drop-shadow-xl">
              <span className={`${styles.wordFade}`} style={{ animationDelay: "0.2s" }}>READY</span>
              <span className={`${styles.wordFade} ml-3`} style={{ animationDelay: "0.5s" }}>TO</span>
            </h1>

            <h1
              className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white drop-shadow-2xl ${styles.wordFade}`}
              style={{ animationDelay: "0.8s" }}
            >
              FLY
            </h1>
          </div>

          {/* Description */}
          <p
            className={`text-base sm:text-xl md:text-2xl lg:text-3xl text-white max-w-4xl mb-8 ${styles.wordFade}`}
            style={{ animationDelay: "1.1s" }}
          >
            Experience paragliding at <b>2400m</b> Bir Billing — <b>World’s 2nd Best Site</b>.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 sm:flex gap-4 text-white text-sm sm:text-lg mb-10">
            <span className={styles.wordFade} style={{ animationDelay: "2s" }}>✅ Professional Pilots</span>
            <span className={styles.wordFade} style={{ animationDelay: "2.2s" }}>⏱️ 15–60 min Flight</span>
            <span className={styles.wordFade} style={{ animationDelay: "2.4s" }}>🎥 GoPro Video</span>
            <span className={styles.wordFade} style={{ animationDelay: "2.6s" }}>🎓 P1–P4 Courses</span>
          </div>

          {/* CTA */}
          <div className={`${styles.buttonSlide} hidden md:block`} style={{ animationDelay: "3s" }}>
            <Link
              href="/packages"
              className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition"
            >
              BOOK YOUR ADVENTURE
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className={`${styles.buttonSlide} md:hidden absolute bottom-4 w-full flex justify-center z-30`}>
        <Link
          href="/packages"
          className="w-44 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg shadow-lg"
        >
          BOOK NOW
        </Link>
      </div>
    </section>
  );
}