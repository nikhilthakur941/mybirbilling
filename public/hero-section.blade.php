<section class="hero-section relative w-full h-[45vh] sm:h-[50vh] md:h-[60vh] lg:h-[65vh] xl:h-[70vh] overflow-hidden">

    <video
        class="absolute inset-0 w-full h-full object-cover z-0"
        poster="{{ asset('storage/compressed_g3.jpeg') }}"
        autoplay
        loop
        playsinline
        muted
        style="filter: brightness(0.6);"
    >
        <source src="{{ asset('storage/hero-video-compressed.mp4') }}" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"></div>

    <div class="relative z-20 flex items-center h-full w-full">
        <div class="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
            
            <div class="space-y-1 sm:space-y-2 mb-4 md:mb-6">
                <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white"
                    style="text-shadow: 2px 2px 10px rgba(0,0,0,0.8);">
                    <span class="inline-block animate-wordFade" style="animation-delay: 0.2s;">READY</span>
                    <span class="inline-block animate-wordFade ml-2 sm:ml-3" style="animation-delay: 0.5s;">TO</span>
                </h1>
                
                <h1 class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl font-extrabold text-white animate-wordFade"
                    style="text-shadow: 3px 3px 12px rgba(0,0,0,0.9); animation-delay: 0.8s;">
                    FLY
                </h1>
            </div>

            <div class="text-base sm:text-xl md:text-2xl lg:text-3xl text-white/95 max-w-4xl mb-6 md:mb-10"
                style="text-shadow: 1px 1px 5px rgba(0,0,0,0.8);">
                
                <p class="animate-wordFade tracking-wide" style="animation-delay: 1.1s;">
                    Experience the thrill of paragliding at <span class="text-white font-semibold">2400m</span> Bir Billing - <span class="text-white font-semibold">World's 2nd Best Site</span>.
                </p>

                <div class="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1 text-sm sm:text-lg md:text-xl mt-3">
                    <span class="inline-flex items-center gap-2 animate-wordFade" style="animation-delay: 2.0s;">
                        <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                        </svg>
                        Professional Pilots
                    </span>
                    <span class="inline-flex items-center gap-2 animate-wordFade" style="animation-delay: 2.2s;">
                        <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        15-60min Flight
                    </span>
                    <span class="inline-flex items-center gap-2 animate-wordFade" style="animation-delay: 2.4s;">
                        <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                        GoPro Video
                    </span>
                    <span class="inline-flex items-center gap-2 animate-wordFade" style="animation-delay: 2.6s;">
                        <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                        P1-P4 Course Available
                    </span>
                </div>
            </div>

            <div class="hidden md:block animate-buttonSlide" style="animation-delay: 3s;">
                <a href="{{ route('packages.index') }}" 
                   class="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    BOOK YOUR ADVENTURE
                </a>
            </div>
        </div>
    </div>

    <div class="md:hidden absolute bottom-4 left-0 right-0 z-30 flex justify-center px-4 animate-buttonSlide mobile-button" style="animation-delay: 3s;">
        <a href="{{ route('packages.index') }}" 
           class="w-44 sm:w-52 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-base font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 text-center">
            BOOK NOW
        </a>
    </div>

    <div class="absolute bottom-8 right-8 z-20 hidden lg:block animate-bounce" style="animation-delay: 3.5s;">
        <svg class="w-6 h-10 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7-7-7"></path>
        </svg>
    </div>
</section>

<style>
/* Word by Word Fade Animation */
@keyframes wordFade {
    0% {
        opacity: 0;
        transform: translateY(20px) scale(0.9);
    }
    50% {
        transform: translateY(-5px) scale(1.02);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.animate-wordFade {
    opacity: 0;
    animation: wordFade 0.8s ease-out forwards;
}

/* Button Slide Animation */
@keyframes buttonSlide {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.animate-buttonSlide {
    opacity: 0;
    animation: buttonSlide 1s ease-out forwards;
}

/* Bounce Animation */
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.animate-bounce {
    opacity: 0;
    animation: bounce 2s infinite, wordFade 0.6s ease-out forwards;
}

/* Responsive Media Queries for Hero Section Height */

/* Extra Large Screens (1280px+) */
@media (min-width: 1280px) {
    .hero-section {
        height: 70vh !important;
        min-height: 600px;
        max-height: 800px;
    }
}

/* Large Screens (1024px - 1279px) */
@media (min-width: 1024px) and (max-width: 1279px) {
    .hero-section {
        height: 65vh !important;
        min-height: 550px;
        max-height: 700px;
    }
}

/* Medium Screens (769px - 1023px) */
@media (min-width: 769px) and (max-width: 1023px) {
    .hero-section {
        height: 60vh !important;
        min-height: 480px;
        max-height: 620px;
    }
}

/* Small Tablets (641px - 768px) */
@media (min-width: 641px) and (max-width: 768px) {
    .hero-section {
        height: 55vh !important;
        min-height: 420px;
        max-height: 550px;
    }
}

/* Large Mobile (481px - 640px) */
@media (min-width: 481px) and (max-width: 640px) {
    .hero-section {
        height: 50vh !important;
        min-height: 380px;
        max-height: 480px;
    }
    .mobile-button {
        bottom: 12px !important;
    }
    .mobile-button a {
        width: 200px !important;
        padding: 14px 0 !important;
        font-size: 16px !important;
    }
}

/* Medium Mobile (415px - 480px) */
@media (min-width: 415px) and (max-width: 480px) {
    .hero-section {
        height: 48vh !important;
        min-height: 350px;
        max-height: 420px;
    }
    .mobile-button {
        bottom: 10px !important;
    }
    .mobile-button a {
        width: 180px !important;
        padding: 12px 0 !important;
        font-size: 15px !important;
    }
}

/* Small Mobile (376px - 414px) */
@media (min-width: 376px) and (max-width: 414px) {
    .hero-section {
        height: 46vh !important;
        min-height: 330px;
        max-height: 380px;
    }
    .mobile-button {
        bottom: 8px !important;
    }
    .mobile-button a {
        width: 160px !important;
        padding: 11px 0 !important;
        font-size: 14px !important;
    }
}

/* Extra Small Mobile (321px - 375px) */
@media (min-width: 321px) and (max-width: 375px) {
    .hero-section {
        height: 45vh !important;
        min-height: 310px;
        max-height: 350px;
    }
    .mobile-button {
        bottom: 6px !important;
    }
    .mobile-button a {
        width: 140px !important;
        padding: 10px 0 !important;
        font-size: 13px !important;
    }
}

/* Very Small Mobile (≤320px) */
@media (max-width: 320px) {
    .hero-section {
        height: 44vh !important;
        min-height: 290px;
        max-height: 320px;
    }
    .mobile-button {
        bottom: 4px !important;
    }
    .mobile-button a {
        width: 120px !important;
        padding: 8px 0 !important;
        font-size: 12px !important;
    }
}

/* Portrait Orientation */
@media (orientation: portrait) and (max-width: 768px) {
    .hero-section {
        min-height: 350px !important;
    }
}

/* Landscape Mobile */
@media (orientation: landscape) and (max-width: 768px) and (max-height: 450px) {
    .hero-section {
        height: 80vh !important;
        min-height: 300px;
    }
    .mobile-button {
        bottom: 4px !important;
    }
}
</style>