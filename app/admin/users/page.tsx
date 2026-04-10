"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  role: "ADMIN" | "PILOT" | "STUDENT" | "USER";
  createdAt: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<User | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNo: "",
    role: "USER",
    password: "",
  });

  const loadUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openEdit = (user: User) => {
    setSelected(user);

    setForm({
      name: user.name,
      email: user.email,
      phoneNo: user.phoneNo || "",
      role: user.role,
      password: "",
    });
  };

  const saveUser = async () => {
    if (!selected) return;

    await fetch(`/api/admin/users/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSelected(null);
    loadUsers();
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return;

    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    loadUsers();
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.phoneNo || "").includes(search)
  );

  return (
    <div className="text-white space-y-8">

      <h1 className="text-3xl font-bold text-center">
        Users Management
      </h1>

      <div className="bg-[#0f172a] rounded-2xl border border-gray-800 overflow-hidden">

        {/* SEARCH */}
        <div className="p-5 text-center">
          <input
            placeholder="Search user..."
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#1e293b] px-5 py-2 rounded-lg w-96 text-center outline-none"
          />
        </div>

        {/* TABLE */}
        <table className="w-full text-sm">

          <thead className="bg-[#1e293b] text-gray-300">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u) => (
              <tr
                key={u.id}
                className="border-t border-gray-800 hover:bg-[#1f2937] transition"
              >
                <td className="p-4 font-medium">{u.name}</td>

                <td className="p-4 text-gray-400">{u.email}</td>

                <td className="p-4 text-gray-400">{u.phoneNo}</td>

                {/* ROLE BADGE */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.role === "ADMIN"
                        ? "bg-red-600/20 text-red-400"
                        : "bg-green-600/20 text-green-400"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                <td className="p-4 text-gray-400">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4 space-x-3">

                  <button
                    onClick={() => openEdit(u)}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(u.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* EDIT MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#111827] p-8 rounded-xl w-[500px] space-y-4">

            <h2 className="text-xl font-semibold">
              Edit User
            </h2>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full p-3 bg-[#1e293b] rounded"
              placeholder="Name"
            />

            <input
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full p-3 bg-[#1e293b] rounded"
              placeholder="Email"
            />

            <input
              value={form.phoneNo}
              onChange={(e) =>
                setForm({ ...form, phoneNo: e.target.value })
              }
              className="w-full p-3 bg-[#1e293b] rounded"
              placeholder="Phone"
            />

            <input
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full p-3 bg-[#1e293b] rounded"
              placeholder="New password (optional)"
            />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              className="w-full p-3 bg-[#1e293b] rounded"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="PILOT">PILOT</option>
              <option value="STUDENT">STUDENT</option>
            </select>

            <div className="flex gap-3">

              <button
                onClick={saveUser}
                className="bg-yellow-500 text-black px-5 py-2 rounded font-semibold"
              >
                Save
              </button>

              <button
                onClick={() => setSelected(null)}
                className="bg-gray-700 px-5 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}