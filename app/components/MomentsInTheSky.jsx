import Link from "next/link";

export default function MomentsInTheSky() {
  const videos = [
    "compressed_bir2.mp4",
    "v4_compressed.mp4",
    "compressed_bir7.mp4",
    "compressed_bir8.mp4",
  ];

  const images = [
    "compressed_g17.jpg",
    "compressed_g5.jpg",
    "compressed_g3.jpeg",
    "compressed_g7.jpeg",
  ];

  return (
    <section className="bg-[#F8FAFC]">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 px-2 sm:px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-poppins bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent leading-tight">
            Moments in the Sky
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Experience our paragliding adventures through videos and stunning photographs.
          </p>
        </div>

        {/* Videos */}
        <div className="mb-6 md:mb-10 px-2 sm:px-0">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {videos.map((video, index) => (
              <div
                key={video}
                className={`rounded-lg overflow-hidden shadow-lg ${
                  index === 3 ? "hidden md:block" : ""
                }`}
              >
                <video
                  className="w-full h-48 md:h-56 object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                >
                  <source src={`/${video}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="px-2 sm:px-0">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {images.map((image, index) => (
              <div
                key={image}
                className={`rounded-lg overflow-hidden shadow-lg ${
                  index === 3 ? "hidden md:block" : ""
                }`}
              >
                <img
                  src={`/${image}`}
                  alt="Paragliding Adventure"
                  className="w-full h-48 md:h-56 object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 px-4">
          <Link
            href="/gallery"
            className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
          >
            <i className="fas fa-images mr-2"></i>
            View Our Memories
          </Link>
        </div>

      </div>
    </section>
  );
}
