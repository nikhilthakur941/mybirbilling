"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Home,
  Box,
  ConciergeBell,
  UserRound,
  Images,
  Mail,
  LogIn,
  UserPlus,
  Menu,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Ticket,
  Settings,
} from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();

  // ✅ SESSION CHECK (FINAL FIX)
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/me");

      // 🚨 session expired
      if (res.status === 401) {
        // ❌ STOP redirect loop on login page
        
          setUser(null); // just clear user
        
        return;
      }

      const data = await res.json();
      setUser(data.user);
    };

    // run once
    fetchUser();

    // check when user returns to tab
    const onFocus = () => fetchUser();
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: any) => {
      if (!e.target.closest(".profile-dropdown")) {
        setDropdown(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-amber-300 shadow-md bg-[#F5DEB3]">
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center py-2 lg:py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="MyBirBilling Logo"
              width={60}
              height={60}
              className="object-contain"
            />
            <div>
              <h1 className="text-xl font-black text-gray-900">MyBirBilling</h1>
              <p className="text-xs font-bold text-gray-700 uppercase">
                Ready to Fly
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 font-semibold text-gray-800">
            <Link href="/" className="flex items-center hover:text-black">
              <Home className="w-4 h-4 mr-2" /> Home
            </Link>

            <Link href="/packages" className="flex items-center hover:text-black">
              <Box className="w-4 h-4 mr-2" /> Packages
            </Link>

            <Link href="/services" className="flex items-center hover:text-black">
              <ConciergeBell className="w-4 h-4 mr-2" /> Services
            </Link>

            <Link href="/pilots" className="flex items-center hover:text-black">
              <UserRound className="w-4 h-4 mr-2" /> Pilots
            </Link>

            <Link href="/gallery" className="flex items-center hover:text-black">
              <Images className="w-4 h-4 mr-2" /> Gallery
            </Link>

            <Link href="/contact" className="flex items-center hover:text-black">
              <Mail className="w-4 h-4 mr-2" /> Contact
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-3">
            {!user && (
              <>
                <Link href="/login" className="flex items-center font-semibold text-gray-800 hover:text-black">
                  <LogIn className="w-4 h-4 mr-2" /> Login
                </Link>

                <Link href="/signup" className="px-5 py-2 rounded-xl text-white bg-black flex items-center hover:bg-gray-900 transition">
                  <UserPlus className="w-4 h-4 mr-2" /> Sign Up
                </Link>
              </>
            )}

            {user && (
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center gap-2 font-semibold text-gray-900"
                >
                  <UserRound className="w-5 h-5" />
                  {user.name}
                  <ChevronDown className={`w-4 h-4 transition ${dropdown ? "rotate-180" : ""}`} />
                </button>

                {dropdown && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50">

                    <div className="mb-3 border-b pb-3">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>

                    <Link href="/profile" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>

                    <Link href="/profile/bookings" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
                      <Ticket className="w-4 h-4" /> My Bookings
                    </Link>

                    <Link href="/profile/settings" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
                      <Settings className="w-4 h-4" /> Profile Settings
                    </Link>

                    <hr className="my-3" />

                    <button
                      onClick={logout}
                      className="flex items-center gap-2 text-red-600 p-2 w-full hover:bg-red-50 rounded-lg"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            {user ? (
              <Link href="/profile" className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#DEB887]">
                <UserRound className="w-5 h-5" />
              </Link>
            ) : (
              <Link href="/login" className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#DEB887]">
                <LogIn className="w-5 h-5" />
              </Link>
            )}

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#DEB887]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden border-t border-amber-300 px-4 pb-4 bg-[#F5DEB3] text-gray-900 font-medium">
          <Link href="/" className="block py-2">Home</Link>
          <Link href="/packages" className="block py-2">Packages</Link>
          <Link href="/services" className="block py-2">Services</Link>
          <Link href="/pilots" className="block py-2">Pilots</Link>
          <Link href="/gallery" className="block py-2">Gallery</Link>
          <Link href="/contact" className="block py-2">Contact</Link>

          {!user && (
            <>
              <Link href="/login" className="block py-2">Login</Link>
              <Link href="/signup" className="block py-2">Sign Up</Link>
            </>
          )}

          {user && (
            <>
              <Link href="/profile" className="block py-2">Dashboard</Link>
              <button onClick={logout} className="block py-2 text-red-600">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}