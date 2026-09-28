import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";
import { updateProfile, toggleNotification } from "../features/settingsSlice";

const inputClass =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-200";

const options = [
  { key: "email", label: "Email alerts", hint: "Get an email when a task is assigned to you." },
  { key: "weekly", label: "Weekly summary", hint: "A short report every Monday morning." },
  { key: "product", label: "Product updates", hint: "News about new features." },
];

const Settings = () => {
  const dispatch = useDispatch();
  const { profile, notifications } = useSelector((state) => state.settings);
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    dispatch(updateProfile({ ...form, name: form.name.trim() }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <PageHeader
        title="Settings"
        description="Your name and role appear in the sidebar and the dashboard greeting."
      />

      <form onSubmit={handleSave} className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-5">
        <h2 className="font-semibold">Profile</h2>
        <label className="flex flex-col gap-1 text-sm">
          Full name
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Role
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className={inputClass}
          />
        </label>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-teal-700 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
          >
            Save changes
          </button>
          {saved && <span className="text-sm text-teal-700">Saved</span>}
        </div>
      </form>

      <section className="rounded-xl border border-stone-200 bg-white p-5">
        <h2 className="mb-2 font-semibold">Notifications</h2>
        <ul className="divide-y divide-stone-100">
          {options.map((o) => (
            <li key={o.key} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium">{o.label}</p>
                <p className="text-sm text-stone-500">{o.hint}</p>
              </div>
              <button
                role="switch"
                aria-checked={notifications[o.key]}
                onClick={() => dispatch(toggleNotification(o.key))}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  notifications[o.key] ? "bg-teal-600" : "bg-stone-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${
                    notifications[o.key] ? "left-5.5" : "left-0.5"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Settings;