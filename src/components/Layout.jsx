import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/analytics", label: "Analytics" },
  { to: "/users", label: "Users" },
  { to: "/tasks", label: "Tasks" },
  { to: "/settings", label: "Settings" },
  { to: "/about", label: "About" },
];

const Layout = () => {
  const pending = useSelector(
    (state) => state.tasks.items.filter((t) => !t.done).length
  );
  const profile = useSelector((state) => state.settings.profile);

  const linkClass = ({ isActive }) =>
    `flex shrink-0 items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-teal-300 ${
      isActive ? "bg-teal-700 text-white" : "text-teal-100 hover:bg-teal-800"
    }`;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 md:flex">
      <aside className="flex flex-col bg-teal-900 p-4 md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 md:p-5">
        <p className="mb-4 text-lg font-semibold text-white md:mb-8">Workbench</p>

        <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
              {l.to === "/tasks" && pending > 0 && (
                <span className="ml-2 rounded-full bg-amber-300 px-2 text-xs font-semibold text-teal-950">
                  {pending}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto hidden items-center gap-3 border-t border-teal-800 pt-4 md:flex">
          <span className="flex size-9 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
            {profile.name.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{profile.name}</p>
            <p className="truncate text-xs text-teal-200">{profile.role}</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-5 md:p-10">
        <div className="mx-auto max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;