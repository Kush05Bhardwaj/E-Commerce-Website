const cards = [
  { label: "Total sales", value: "$1.2M", change: "+12%" },
  { label: "Orders", value: "32,400", change: "+4%" },
  { label: "Active users", value: "9,120", change: "+18%" },
  { label: "Refund requests", value: "214", change: "-2%" },
];

const AdminDashboard = () => (
  <section className="mx-auto max-w-6xl px-6 py-10">
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Admin</p>
        <h1 className="text-3xl font-semibold text-slate-900">Control center</h1>
        <p className="text-slate-500">Analytics, user management, product pipeline, and inventory alerts.</p>
      </div>
      <button className="rounded-full bg-brand px-6 py-3 font-medium text-white">Add product</button>
    </header>
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm text-slate-500">{card.label}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{card.value}</p>
          <p className={`text-sm ${card.change.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}>{card.change}</p>
        </div>
      ))}
    </div>
    <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-8 text-sm text-slate-500">
      Charts (orders, revenue), user table with role-based controls, coupon manager, and activity logs will render here.
    </div>
  </section>
);

export default AdminDashboard;

