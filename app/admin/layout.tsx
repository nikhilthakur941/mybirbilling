"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Image,
  Trophy,
  Package,
  Users,
  MessageSquare,
  Phone,
  FileText,
  ChevronDown,
  BookOpen,
  LogOut,
  Hotel,     // ✅ NEW
  Bike,      // ✅ NEW
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [openComm, setOpenComm] = useState(false);
  const [openReports, setOpenReports] = useState(false);
  const [loading, setLoading] = useState(true);

  // ================= ADMIN CHECK =================
  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.push("/login");
          return;
        }

        if (data.user.role !== "ADMIN") {
          router.push("/");
          return;
        }

        setLoading(false);
      });
  }, []);

  // ================= LOGOUT =================
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking admin permissions...
      </div>
    );
  }

  // ================= SIDEBAR ITEM =================
  const Item = ({
    href,
    label,
    icon: Icon,
  }: {
    href: string;
    label: string;
    icon: any;
  }) => {
    const active = pathname === href;

    return (
      <Link href={href}>
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
          ${
            active
              ? "bg-blue-600 text-white font-semibold"
              : "hover:bg-gray-200"
          }`}
        >
          <Icon size={18} />
          {label}
        </div>
      </Link>
    );
  };

  return (
    <div className="flex h-screen">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 border-r bg-white flex flex-col">

        {/* LOGO */}
        <div className="h-16 flex items-center justify-center border-b font-bold text-lg">
          Admin Panel
        </div>

        {/* MENU */}
        <nav className="flex-1 p-3 space-y-1 text-sm overflow-y-auto">

          <Item href="/admin" label="Dashboard" icon={LayoutDashboard} />
          <Item href="/admin/gallery" label="Gallery" icon={Image} />
          <Item href="/admin/rewards" label="Rewards" icon={Trophy} />
          <Item href="/admin/services" label="Services" icon={Package} />
          <Item href="/admin/testimonials" label="Testimonials" icon={MessageSquare} />
          <Item href="/admin/booking" label="Booking" icon={BookOpen} />
          <Item href="/admin/users" label="Users" icon={Users} />

          {/* ================= PACKAGES + NEW ================= */}
          <Item href="/admin/packages" label="Packages" icon={Package} />
          <Item href="/admin/stays" label="Stays (Hotels)" icon={Hotel} />   {/* ✅ NEW */}
          <Item href="/admin/rentals" label="Rentals" icon={Bike} />         {/* ✅ NEW */}

          {/* ================= Communication ================= */}
          <p className="text-xs text-gray-500 mt-4 px-2">Communication</p>

          <button
            onClick={() => setOpenComm(!openComm)}
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            <span className="flex items-center gap-3">
              <Phone size={18} />
              Communication
            </span>
            <ChevronDown
              size={16}
              className={`transition ${openComm ? "rotate-180" : ""}`}
            />
          </button>

          {openComm && (
            <div className="ml-6 space-y-1">
              <Item href="/admin/contact" label="Contact" icon={Phone} />
              <Item href="/admin/inquiry" label="Inquiry" icon={MessageSquare} />
            </div>
          )}

          {/* ================= Reports ================= */}
          <p className="text-xs text-gray-500 mt-4 px-2">Reports</p>

          <button
            onClick={() => setOpenReports(!openReports)}
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            <span className="flex items-center gap-3">
              <FileText size={18} />
              Reports
            </span>
            <ChevronDown
              size={16}
              className={`transition ${openReports ? "rotate-180" : ""}`}
            />
          </button>

          {openReports && (
            <div className="ml-6 space-y-1">
              <Item
                href="/admin/reports/today"
                label="Today's Report"
                icon={FileText}
              />
            </div>
          )}
        </nav>

        {/* ================= ADMIN PROFILE ================= */}
        <div className="p-4 border-t flex items-center justify-between">

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center">
              A
            </div>
            <span className="text-sm font-medium">Admin</span>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1 text-red-500 hover:text-red-700"
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>

      </aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}