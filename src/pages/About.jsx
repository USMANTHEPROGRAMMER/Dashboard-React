import PageHeader from "../components/PageHeader";

const stack = [
  ["React", "Components and hooks for every page"],
  ["React Router", "Navigation between pages without reloading"],
  ["Redux Toolkit", "Shared state for tasks, users and settings"],
  ["Tailwind CSS", "Styling with utility classes"],
];

const pages = [
  ["Dashboard", "Summary of tasks, users and traffic"],
  ["Analytics", "Monthly visitors, traffic sources, top pages"],
  ["Users", "Add, search, filter, activate and delete users"],
  ["Tasks", "A to-do list with filters"],
  ["Settings", "Profile details and notification switches"],
];

const flow = [
  "You click a button or submit a form on a page.",
  "The page dispatches an action, for example addTask or toggleUserStatus.",
  "The slice updates the store.",
  "Every component that reads that data re-renders, including the Dashboard and the sidebar.",
];

const Card = ({ title, children }) => (
  <section className="rounded-xl border border-stone-200 bg-white p-5">
    <h2 className="mb-3 font-semibold">{title}</h2>
    {children}
  </section>
);

const About = () => (
  <div className="flex max-w-2xl flex-col gap-6">
    <PageHeader
      title="About"
      description="Workbench is a small practice dashboard for learning how routing and Redux work together."
    />

    <Card title="Built with">
      <ul className="divide-y divide-stone-100">
        {stack.map(([name, desc]) => (
          <li key={name} className="flex justify-between gap-4 py-2 text-sm">
            <span className="font-medium">{name}</span>
            <span className="text-right text-stone-500">{desc}</span>
          </li>
        ))}
      </ul>
    </Card>

    <Card title="Pages">
      <ul className="divide-y divide-stone-100">
        {pages.map(([name, desc]) => (
          <li key={name} className="flex justify-between gap-4 py-2 text-sm">
            <span className="font-medium">{name}</span>
            <span className="text-right text-stone-500">{desc}</span>
          </li>
        ))}
      </ul>
    </Card>

    <Card title="How data moves">
      <ol className="list-decimal space-y-2 pl-5 text-sm text-stone-600">
        {flow.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </Card>

    <Card title="Good to know">
      <p className="text-sm leading-relaxed text-stone-600">
        Data lives in memory, so a browser refresh resets it to the starting
        values. Analytics numbers are sample data from src/data/analytics.js.
        To keep changes after a refresh, save the store to localStorage.
      </p>
    </Card>
  </div>
);

export default About;