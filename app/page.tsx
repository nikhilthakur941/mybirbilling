import Hero from "./components/Hero";
import Community from "./components/Community";
import WhyChooseUs from "./components/WhyChooseUs";
import PilotsSection from "./components/PilotsSection";
import MomentsInTheSky from "./components/MomentsInTheSky";
import ContactSection from "./components/ContactSection";
import TopStaysAndServices from "./components/TopStaysAndServices";
import JourneySection from "./components/JourneySection";
import TestimonialsSlider from "./components/TestimonialSlider";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyChooseUs />
      <PilotsSection />
      <Community />
      <MomentsInTheSky />
      <ContactSection />
      <TopStaysAndServices />
      <JourneySection testimonials={<TestimonialsSlider />} />

    </main>
  );
}
