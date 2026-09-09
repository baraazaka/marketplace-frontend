
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartSummary({ cartItems }) {
    const navigate = useNavigate();

    const total = cartItems.reduce(
        (sum, item) =>
            sum +
            Number(item.products.price) *
            item.quantity,
        0
    );


    const totalItems = cartItems.reduce(
        (sum, item) =>
            sum + item.quantity,
        0
    );


    return (
        <div className="lg:sticky lg:top-24 lg:self-start">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="text-xl font-black text-slate-900">
                    Order Summary
                </h2>


                <div className="mt-6 space-y-4">

                    <div className="flex justify-between text-sm">

                        <span className="text-slate-500">
                            Items
                        </span>

                        <span className="font-semibold text-slate-900">
                            {totalItems}
                        </span>

                    </div>


                    <div className="flex justify-between text-sm">

                        <span className="text-slate-500">
                            Subtotal
                        </span>

                        <span className="font-semibold text-slate-900">
                            ${total.toFixed(2)}
                        </span>

                    </div>


                    <div className="flex justify-between text-sm">

                        <span className="text-slate-500">
                            Shipping
                        </span>

                        <span className="font-semibold text-emerald-600">
                            Free
                        </span>

                    </div>

                </div>


                <div className="my-6 border-t border-slate-200" />


                <div className="flex items-center justify-between">

                    <span className="text-lg font-bold text-slate-900">
                        Total
                    </span>

                    <span className="text-2xl font-black text-violet-600">
                        ${total.toFixed(2)}
                    </span>

                </div>


                {/* Checkout */}

                <button
                    type="button"
                    onClick={() => navigate("/checkout")}
                    className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-600"
                >
                    Checkout

                    <ArrowRight className="h-4 w-4" />

                </button>


                <Link
                    to="/"
                    className="mt-4 flex h-11 items-center justify-center rounded-xl border border-slate-200 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600"
                >
                    Continue Shopping
                </Link>

            </div>

        </div>
    );
}

export default CartSummary;
