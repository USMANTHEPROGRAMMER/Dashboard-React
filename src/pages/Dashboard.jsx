import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { monthlyVisitors } from "../data/analytics";

const Dashboard = () => {
  const tasks = useSelector((state) => state.tasks.items);
  const users = useSelector((state) => state.users.items);
  const profile = useSelector((state) => state.settings.profile);

  const done = tasks.filter((t) => t.done).length;
  const pending = tasks.length - done;
  const progress = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const activeUsers = users.filter((u) => u.active).length;

  const week = monthlyVisitors.slice(-7);
  const max = Math.max(...week.map((d) => d.value));
  const growth = Math.round(
    ((week[week.length - 1].value - week[0].value) / week[0].value) * 100
  );

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={`Welcome back, ${profile.name.split(" ")[0]}`}
        description="Here is a quick look at your tasks, users and traffic."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total tasks" value={tasks.length} note={`${progress}% done`} />
        <StatCard label="Pending tasks" value={pending} />
        <StatCard label="Active users" value={activeUsers} note={`of ${users.length} total`} />
        <StatCard
          label="Visitors (Dec)"
          value={week[week.length - 1].value.toLocaleString()}
          note={`+${growth}% in 7 months`}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <section className="rounded-xl border border-stone-200 bg-white p-5 md:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Visitors, last 7 months</h2>
            <Link to="/analytics" className="text-sm text-teal-700 hover:underline">
              Full report
            </Link>
          </div>
          <div className="flex h-44 items-end gap-3">
            {week.map((d) => (
              <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div
                  className="w-full rounded-t-md bg-teal-600"
                  style={{ height: `${(d.value / max) * 100}%` }}
                  title={d.value.toLocaleString()}
                />
                <span className="text-xs text-stone-500">{d.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-stone-200 bg-white p-5 md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Latest tasks</h2>
            <Link to="/tasks" className="text-sm text-teal-700 hover:underline">
              View all
            </Link>
          </div>
          {tasks.length === 0 ? (
            <p className="text-sm text-stone-500">No tasks yet. Add one on the Tasks page.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {tasks.slice(0, 4).map((t) => (
                <li key={t.id} className="flex items-center gap-2 text-sm">
                  <span className={`size-2 rounded-full ${t.done ? "bg-teal-600" : "bg-amber-400"}`} />
                  <span className={t.done ? "text-stone-400 line-through" : ""}>{t.title}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="rounded-xl border border-stone-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Newest users</h2>
          <Link to="/users" className="text-sm text-teal-700 hover:underline">
            Manage users
          </Link>
        </div>
        <ul className="divide-y divide-stone-100">
          {users.slice(0, 3).map((u) => (
            <li key={u.id} className="flex items-center justify-between py-2 text-sm">
              <span>
                <span className="font-medium">{u.name}</span>
                <span className="ml-2 text-stone-500">{u.email}</span>
              </span>
              <span className="text-stone-500">{u.role}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;