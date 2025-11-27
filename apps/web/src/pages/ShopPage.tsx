const filters = ["Categories", "Price", "Ratings", "Colors", "Sizes"];

const ShopPage = () => (
  <section className="mx-auto max-w-6xl px-6 py-10">
    <header className="space-y-3">
      <p className="text-sm uppercase tracking-[0.3em] text-accent">Explore</p>
      <h1 className="text-3xl font-semibold text-slate-900">Shop collections</h1>
      <p className="text-slate-500">Filters, sorting, AI recommendations, and lightning search coming next.</p>
    </header>
    <div className="mt-8 grid gap-6 md:grid-cols-[280px_1fr]">
      <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
        <ul className="space-y-3 text-sm text-slate-600">
          {filters.map((filter) => (
            <li key={filter} className="flex items-center justify-between">
              <span>{filter}</span>
              <span className="text-xs text-slate-400">Configure</span>
            </li>
          ))}
        </ul>
      </aside>
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
        Product listing grid with infinite scroll & skeleton loaders will render here.
      </div>
    </div>
  </section>
);

export default ShopPage;

