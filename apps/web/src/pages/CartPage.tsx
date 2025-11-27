import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { removeItem, updateQuantity } from "@/features/cart/cartSlice";

const CartPage = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold text-slate-900">Your cart</h1>
      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          Add products from the storefront to start checkout.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) =>
                      dispatch(updateQuantity({ id: item.id, quantity: Number(event.target.value) }))
                    }
                    className="w-16 rounded border border-slate-200 px-2 py-1 text-center"
                  />
                  <button
                    type="button"
                    className="text-sm text-red-500"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <button type="button" className="mt-6 w-full rounded-full bg-brand px-4 py-3 font-medium text-white">
              Continue to checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;

