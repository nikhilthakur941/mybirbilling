"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

export default function ProfileSettings() {
  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ DELETE STATES (added)
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // fetch logged in user
  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setName(data.user.name);
          setEmail(data.user.email);
        }
      });
  }, []);

  if (!user) return null;

  // UPDATE PROFILE
  const updateProfile = async () => {
    const res = await fetch("/api/profile/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Profile updated successfully");
    } else {
      alert(data.message);
    }
  };

  // CHANGE PASSWORD
  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    const res = await fetch("/api/profile/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert(data.message);
    }
  };

  // ✅ DELETE ACCOUNT (fixed)
  const deleteAccount = async () => {
    if (!deletePassword) {
      return alert("Please enter your password");
    }

    const confirmDelete = confirm(
      "Are you sure you want to permanently delete your account?"
    );

    if (!confirmDelete) return;

    setLoadingDelete(true);

    try {
      const res = await fetch("/api/profile/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: deletePassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account deleted");
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-900">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white flex justify-between items-center mb-6">

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
            {user.name?.charAt(0)}
          </div>

          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm opacity-90">{user.email}</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold">0</p>
          <p className="text-xs">Total Flights</p>
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-xl font-bold text-blue-600">0</p>
          <p className="text-sm text-gray-800">Bookings</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-xl font-bold text-green-600">0</p>
          <p className="text-sm text-gray-800">Certificates</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-xl font-bold text-purple-600">0</p>
          <p className="text-sm text-gray-800">Photos</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-xl font-bold text-orange-600">0</p>
          <p className="text-sm text-gray-800">Flight Logs</p>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="font-semibold mb-3 text-gray-900">Quick Actions</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          <button className="bg-blue-600 text-white p-2 rounded-lg text-sm">
            Book Flight
          </button>

          <button className="bg-purple-600 text-white p-2 rounded-lg text-sm">
            Gallery
          </button>

          <button className="bg-green-600 text-white p-2 rounded-lg text-sm">
            Certificates
          </button>

          <button className="bg-orange-600 text-white p-2 rounded-lg text-sm">
            My Bookings
          </button>

        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">

          {/* PROFILE INFO */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4 text-gray-900">
              Profile Information
            </h3>

            <p className="text-sm text-gray-700 mb-4">
              Update your account's profile information and email address.
            </p>

            <div className="space-y-4">

              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-2 mt-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  className="w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-2 mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                onClick={updateProfile}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-black"
              >
                SAVE
              </button>

            </div>
          </div>

          {/* PASSWORD */}
          <div className="bg-white p-6 rounded-lg shadow">

            <h3 className="font-semibold mb-4 text-gray-900">
              Update Password
            </h3>

            <p className="text-sm text-gray-700 mb-4">
              Ensure your account is using a secure password.
            </p>

            <div className="space-y-4">

              <div>
                <label className="text-sm font-medium">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                />
              </div>

              <button
                onClick={changePassword}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-black"
              >
                SAVE
              </button>

            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* ACCOUNT INFO */}
          <div className="bg-white p-5 rounded-lg shadow">

            <h3 className="font-semibold mb-4 text-gray-900">
              Account Info
            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span>Status:</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                  Active
                </span>
              </div>

              <div className="flex justify-between">
                <span>Member Since:</span>
                <span>Mar 2026</span>
              </div>

              <div className="flex justify-between">
                <span>Email:</span>
                {user.emailVerified ? (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                    Verified
                  </span>
                ) : (
                  <button
                    onClick={async () => {
                      const res = await fetch("/api/auth/send-verification", {
                        method: "POST",
                      });

                      const data = await res.json();
                      alert(data.message);
                    }}
                    className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs"
                  >
                    Verify Email
                  </button>
                )}
              </div>

              <div className="flex justify-between">
                <span>Last Login:</span>
                <span>Recently</span>
              </div>

            </div>
          </div>

          {/* DANGER ZONE */}
          <div className="bg-white p-5 rounded-lg shadow border-l-4 border-red-500">

            <h3 className="font-semibold text-red-600 mb-2">
              Danger Zone
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              Once your account is deleted, all data will be permanently removed.
            </p>

            {!showDeleteBox ? (
              <button
                onClick={() => setShowDeleteBox(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-red-700"
              >
                <Trash2 size={16} />
                DELETE ACCOUNT
              </button>
            ) : (
              <div className="space-y-3">

                <input
                  type="password"
                  placeholder="Enter password to confirm"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />

                <button
                  onClick={deleteAccount}
                  disabled={loadingDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg w-full disabled:opacity-50"
                >
                  {loadingDelete ? "Deleting..." : "Confirm Delete"}
                </button>

                <button
                  onClick={() => {
                    setShowDeleteBox(false);
                    setDeletePassword("");
                  }}
                  className="text-sm text-gray-500"
                >
                  Cancel
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}