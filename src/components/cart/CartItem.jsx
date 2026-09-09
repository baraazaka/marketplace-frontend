
import {
    Minus,
    Plus,
    Trash2
} from "lucide-react";


function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove
}) {

    const product = item.products;

    const subtotal =
        Number(product.price) * item.quantity;


    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex gap-5">

                {/* Image */}

                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">

                    {product.image_url ? (

                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />

                    ) : (

                        <div className="flex h-full items-center justify-center text-xs font-semibold text-slate-400">
                            No Image
                        </div>

                    )}

                </div>


                {/* Content */}

                <div className="flex min-w-0 flex-1 flex-col">

                    <div className="flex items-start justify-between gap-4">

                        <div>

                            <h2 className="text-lg font-bold text-slate-900">
                                {product.name}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                ${Number(product.price).toFixed(2)}
                            </p>

                        </div>


                        {/* Remove */}

                        <button
                            type="button"
                            onClick={() =>
                                onRemove(item.id)
                            }
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                            aria-label="Remove product"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>

                    </div>


                    {/* Bottom */}

                    <div className="mt-auto flex items-end justify-between gap-4">


                        {/* Quantity */}

                        <div className="flex h-10 items-center rounded-lg border border-slate-200">

                            <button
                                type="button"
                                onClick={() =>
                                    onDecrease(item)
                                }
                                disabled={item.quantity <= 1}
                                className="flex h-full w-10 items-center justify-center text-slate-500 transition hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <Minus className="h-4 w-4" />
                            </button>


                            <span className="w-10 text-center text-sm font-bold text-slate-900">
                                {item.quantity}
                            </span>


                            <button
                                type="button"
                                onClick={() =>
                                    onIncrease(item)
                                }
                                className="flex h-full w-10 items-center justify-center text-slate-500 transition hover:text-violet-600"
                            >
                                <Plus className="h-4 w-4" />
                            </button>

                        </div>


                        {/* Subtotal */}

                        <div className="text-right">

                            <p className="text-xs font-medium text-slate-400">
                                Subtotal
                            </p>

                            <p className="mt-1 text-lg font-black text-slate-900">
                                ${subtotal.toFixed(2)}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CartItem;

