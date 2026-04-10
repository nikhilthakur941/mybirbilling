"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  User,
  LayoutDashboard,
  Ticket,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

type UserType = {
  name: string;
  email: string;
};

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        if (res.ok) setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative" ref={ref}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-full px-3 py-1.5 hover:bg-gray-100 transition"
      >
        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
          {initials}
        </div>

        <span className="font-semibold text-gray-900">{user.name}</span>

        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

          {/* User Info */}
          <div className="px-4 py-4 bg-gray-50 border-b">
            <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          {/* Menu */}
          <div className="p-2 space-y-1">

            <Link
              href="/profile/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              href="/profile/bookings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition"
            >
              <Ticket size={18} />
              My Bookings
            </Link>

            <Link
              href="/profile/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition"
            >
              <Settings size={18} />
              Profile Settings
            </Link>

            <div className="border-t my-2"></div>

            <Link
              href="/api/auth/logout"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={18} />
              Logout
            </Link>

          </div>
        </div>
      )}
    </div>
  );
}