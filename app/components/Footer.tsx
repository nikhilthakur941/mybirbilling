import {
  FaGraduationCap,
  FaParachuteBox,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-black text-gray-300 pt-20">
      {/* glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">MyBirBilling</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Experience thrilling paragliding with certified instructors in Bir Billing,
            Himachal Pradesh. Safety, adventure, and unforgettable memories guaranteed.
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            <Badge icon={<FaShieldAlt />} text="Certified" />
            <Badge icon={<FaCheckCircle />} text="Insured" />
            <Badge icon={<FaUsers />} text="500+ Flyers" />
          </div>
        </div>

        <GlassCard title="Training Courses" icon={<FaGraduationCap />}>
          <Row title="Skywalker Basics P1+P2" price="₹25,000" />
          <Row title="Flying Meditation Course P3" price="₹35,000" />
          <Row title="Thermal Guru Expedition P4" price="₹60,000" />
        </GlassCard>

        <GlassCard title="Tandem Flights" icon={<FaParachuteBox />} accent="text-green-400">
          <Row title="Joy Ride" price="₹2,500" />
          <Row title="Classic Tandem" price="₹4,000" />
          <Row title="Cross Country" price="₹6,500" />
        </GlassCard>

        <GlassCard title="Get In Touch" icon={<FaPhoneAlt />} accent="text-purple-400">
          <Contact icon={<FaPhoneAlt />} text="+91 98821 25039" sub="24/7 Support (Primary)" />
          <Contact icon={<FaPhoneAlt />} text="+91 98821 25039" sub="Bookings & Management" />
          <Contact icon={<FaEnvelope />} text="mybirbillingfly@gmail.com" sub="Quick Response" />
          <Contact icon={<FaMapMarkerAlt />} text="Bir Billing, HP" sub="Himachal Pradesh" />
        </GlassCard>
      </div>

      {/* bottom */}
      <div className="relative mt-16 border-t border-white/10 py-5 text-center text-sm text-gray-500">
        © 2025 MyBirBilling. Made with ❤️ in the Himalayas
      </div>
    </footer>
  );
}

/* ---------- components ---------- */

function GlassCard({ title, icon, accent = "text-blue-400", children }: any) {
  return (
    <div className="bg-[#0e1117] rounded-2xl p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_40px_rgba(0,0,0,0.8)]">
      <h4 className="flex items-center gap-2 text-white font-semibold mb-5">
        <span className={accent}>{icon}</span>
        {title}
      </h4>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Row({ title, price }: any) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{title}</span>
      <span className="font-semibold text-cyan-400">{price}</span>
    </div>
  );
}

function Contact({ icon, text, sub }: any) {
  return (
    <div className="flex gap-3 text-sm">
      <span className="text-blue-400 mt-1">{icon}</span>
      <div>
        <p className="text-gray-200">{text}</p>
        <p className="text-gray-500 text-xs">{sub}</p>
      </div>
    </div>
  );
}

function Badge({ icon, text }: any) {
  return (
    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-semibold">
      {icon}
      {text}
    </span>
  );
}
