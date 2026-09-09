
import { ArrowLeft, CheckCircle } from "lucide-react";

function CheckoutSummary({
    cartItems,
    total,
    placingOrder,
    onPlaceOrder,
    onBackToCart
}) {
    const totalQuantity = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

                <CheckCircle className="h-5 w-5 text-violet-600" />

                <h2 className="font-black text-slate-900">
                    Order Summary
                </h2>

            </div>


            <div className="mt-6 space-y-4 text-sm">

                <div className="flex justify-between">

                    <span className="text-slate-500">
                        Items
                    </span>

                    <span className="font-semibold text-slate-900">
                        {totalQuantity}
                    </span>

                </div>


                <div className="flex justify-between">

                    <span className="text-slate-500">
                        Subtotal
                    </span>

                    <span className="font-semibold text-slate-900">
                        ${total.toFixed(2)}
                    </span>

                </div>


                <div className="flex justify-between">

                    <span className="text-slate-500">
                        Shipping
                    </span>

                    <span className="font-semibold text-green-600">
                        Free
                    </span>

                </div>

            </div>


            <div className="my-6 border-t border-slate-200" />


            <div className="flex items-center justify-between">

                <span className="text-lg font-black text-slate-900">
                    Total
                </span>

                <span className="text-2xl font-black text-violet-600">
                    ${total.toFixed(2)}
                </span>

            </div>


            <button
                type="button"
                onClick={onPlaceOrder}
                disabled={placingOrder}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {placingOrder ? (
                    <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                        Placing Order...
                    </>
                ) : (
                    <>
                        Place Order

                        <CheckCircle className="h-4 w-4" />
                    </>
                )}
            </button>


            <button
                type="button"
                onClick={onBackToCart}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
                <ArrowLeft className="h-4 w-4" />

                Back to Cart
            </button>

        </div>
    );
}

export default CheckoutSummary;

