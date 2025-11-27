const steps = ["Address", "Order summary", "Payment", "Success"];

const CheckoutPage = () => (
  <section className="mx-auto max-w-5xl px-6 py-10">
    <h1 className="text-3xl font-semibold text-slate-900">Checkout</h1>
    <ol className="mt-8 grid grid-cols-4 gap-4 text-sm text-slate-500">
      {steps.map((step, index) => (
        <li
          key={step}
          className="rounded-2xl border border-dashed border-slate-300 p-4 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em]">Step {index + 1}</p>
          <p className="mt-2 font-semibold text-slate-800">{step}</p>
        </li>
      ))}
    </ol>
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">Shipping address</h2>
        <p className="mt-2 text-sm text-slate-500">Address form wizard will be built here.</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">Payment methods</h2>
        <p className="mt-2 text-sm text-slate-500">Stripe + Razorpay integration placeholder.</p>
      </div>
    </div>
  </section>
);

export default CheckoutPage;

