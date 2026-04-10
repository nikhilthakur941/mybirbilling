"use client";

import { useEffect, useRef, useState } from "react";

type Testimonial = {
  text: string;
  author: string;
  location: string;
};

const testimonials: Testimonial[] = [
  {
    text: "The entire team was incredible! From booking to the actual trek, everything was smooth and professional. The guides were knowledgeable about every trail and ensured our safety at all times. This was truly an unforgettable experience.",
    author: "Rajesh Verma",
    location: "Delhi",
  },
  {
    text: "Best adventure company I've ever dealt with! The equipment quality was top-notch, camps were comfortable, and the food exceeded expectations. They really know how to make an adventure memorable.",
    author: "Priya Patel",
    location: "Mumbai",
  },
  {
    text: "Professional service from start to finish. The attention to detail and customer care was exceptional. They made my first paragliding experience absolutely amazing. Would definitely recommend to everyone!",
    author: "Amit Sharma",
    location: "Bangalore",
  },
  {
    text: "Outstanding experience! The instructors were patient and encouraging, making sure everyone in our group felt comfortable. The views were spectacular and the entire journey was well organized.",
    author: "Neha Singh",
    location: "Pune",
  },
  {
    text: "Exceeded all expectations! The team's expertise and friendly approach made this adventure truly special. Everything was perfectly planned and executed. Can't wait to book my next trip with them.",
    author: "Vikram Rao",
    location: "Hyderabad",
  },
];

export default function TestimonialsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Auto-play
  useEffect(() => {
    intervalRef.current = window.setInterval(nextSlide, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Pause on hover (desktop)
  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    intervalRef.current = window.setInterval(nextSlide, 4000);
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0].screenX;
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].screenX;

    if (touchEndX.current < touchStartX.current - 50) nextSlide();
    if (touchEndX.current > touchStartX.current + 50) prevSlide();

    intervalRef.current = window.setInterval(nextSlide, 4000);
  };

  return (
    <section className="w-full bg-[#f5deb3] py-12 md:py-16">
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slides Track */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {testimonials.map((t, index) => (
            <div key={index} className="min-w-full px-4 flex justify-center">
              <div className="text-center max-w-2xl">
                <div className="text-[80px] text-black/20 leading-[0.5] mb-8 font-serif">
                  &quot;
                </div>
                <p className="text-[22px] md:text-xl font-light italic text-black mb-10">
                  {t.text}
                </p>
                <div className="text-xl font-semibold text-black">
                  {t.author}
                </div>
                <div className="text-lg text-black/70 font-light">
                  {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows (desktop only) */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute top-1/2 left-10 -translate-y-1/2 w-12 h-12 bg-white/80 border border-black/20 rounded-full justify-center items-center text-2xl hover:bg-white hover:border-black/40 z-10"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="hidden md:flex absolute top-1/2 right-10 -translate-y-1/2 w-12 h-12 bg-white/80 border border-black/20 rounded-full justify-center items-center text-2xl hover:bg-white hover:border-black/40 z-10"
        >
          ›
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-transform ${
                currentSlide === index
                  ? "bg-black scale-125"
                  : "bg-black/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
