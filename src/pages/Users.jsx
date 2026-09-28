import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";
import { addUser, toggleUserStatus, deleteUser } from "../features/usersSlice";

const roles = ["Admin", "Editor", "Viewer"];
const inputClass =
  "rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-200";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [form, setForm] = useState({ name: "", email: "", role: "Viewer" });

  const visible = users.filter((u) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    dispatch(addUser({ name: form.name.trim(), email: form.email.trim(), role: form.role }));
    setForm({ name: "", email: "", role: "Viewer" });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Users"
        description="Add people, change their status, or remove them. Search and role filter work together."
      />

      <form onSubmit={handleAdd} className="grid gap-2 rounded-xl border border-stone-200 bg-white p-4 sm:grid-cols-4">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Full name"
          className={inputClass}
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email address"
          className={inputClass}
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className={inputClass}
        >
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
        >
          Add user
        </button>
      </form>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
          className={`${inputClass} flex-1`}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className={inputClass}
        >
          {["All", ...roles].map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
          No users match. Clear the search or add a new user above.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {visible.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium">{u.name}</p>
                    <p className="text-stone-500">{u.email}</p>
                  </td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => dispatch(toggleUserStatus(u.id))}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        u.active ? "bg-teal-100 text-teal-800" : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      {u.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => dispatch(deleteUser(u.id))}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;