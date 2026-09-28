const StatCard = ({ label, value, note }) => (
  <div className="rounded-xl border border-stone-200 bg-white p-5">
    <p className="text-sm text-stone-500">{label}</p>
    <p className="mt-1 text-3xl font-semibold">{value}</p>
    {note && <p className="mt-1 text-sm text-teal-700">{note}</p>}
  </div>
);

export default StatCard;