import { useState } from "react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { monthlyVisitors, trafficSources, topPages } from "../data/analytics";

const ranges = [
  { label: "6 months", count: 6 },
  { label: "12 months", count: 12 },
];

const Analytics = () => {
  const [count, setCount] = useState(12);
  const data = monthlyVisitors.slice(-count);
  const max = Math.max(...data.map((d) => d.value));
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const average = Math.round(total / data.length);
  const best = data.reduce((a, b) => (b.value > a.value ? b : a));

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Analytics"
        description="Traffic over time, where visitors come from, and which pages they read most."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total visitors" value={total.toLocaleString()} />
        <StatCard label="Monthly average" value={average.toLocaleString()} />
        <StatCard label="Best month" value={best.label} note={`${best.value.toLocaleString()} visitors`} />
      </div>

      <section className="rounded-xl border border-stone-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Visitors per month</h2>
          <div className="flex gap-1 rounded-lg bg-stone-200 p-1">
            {ranges.map((r) => (
              <button
                key={r.count}
                onClick={() => setCount(r.count)}
                className={`rounded-md px-3 py-1 text-sm transition-colors ${
                  count === r.count ? "bg-white font-medium shadow-sm" : "text-stone-600"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex h-52 items-end gap-2">
          {data.map((d) => (
            <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div
                className={`w-full rounded-t-md ${d.label === best.label ? "bg-amber-400" : "bg-teal-600"}`}
                style={{ height: `${(d.value / max) * 100}%` }}
                title={d.value.toLocaleString()}
              />
              <span className="text-xs text-stone-500">{d.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-stone-200 bg-white p-5">
          <h2 className="mb-4 font-semibold">Traffic sources</h2>
          <ul className="flex flex-col gap-4">
            {trafficSources.map((s) => (
              <li key={s.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{s.name}</span>
                  <span className="text-stone-500">{s.percent}%</span>
                </div>
                <div className="h-2 rounded-full bg-stone-200">
                  <div className="h-2 rounded-full bg-teal-600" style={{ width: `${s.percent}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-stone-200 bg-white p-5">
          <h2 className="mb-4 font-semibold">Top pages</h2>
          <table className="w-full text-left text-sm">
            <thead className="text-stone-500">
              <tr>
                <th className="pb-2 font-medium">Page</th>
                <th className="pb-2 font-medium">Views</th>
                <th className="pb-2 font-medium">Avg. time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {topPages.map((p) => (
                <tr key={p.path}>
                  <td className="py-2 font-medium">{p.path}</td>
                  <td className="py-2">{p.views.toLocaleString()}</td>
                  <td className="py-2 text-stone-500">{p.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Analytics;