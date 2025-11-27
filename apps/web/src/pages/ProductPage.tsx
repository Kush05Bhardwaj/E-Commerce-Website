import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-100 p-8">
          <div className="aspect-square rounded-xl bg-white shadow-inner" />
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Product #{id}</p>
            <h1 className="text-3xl font-semibold text-slate-900">Product title placeholder</h1>
            <p className="text-slate-500">
              Detailed description, ratings, availability, and variant selectors will be rendered here.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-2xl font-semibold text-brand">$249.00</p>
            <div className="mt-4 flex gap-4">
              <button className="rounded-full bg-brand px-6 py-3 text-white">Add to cart</button>
              <button className="rounded-full border border-slate-200 px-6 py-3">Buy now</button>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
            Reviews carousel, recommended products, wishlist actions, and inventory insights planned here.
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;

