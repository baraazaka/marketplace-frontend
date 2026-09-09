
function CheckoutItems({ cartItems }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

                <h2 className="font-black text-slate-900">
                    Order Items
                </h2>

                <span className="text-sm font-semibold text-slate-500">
                    {cartItems.length} items
                </span>

            </div>


            <div className="mt-6 divide-y divide-slate-100">

                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex gap-4 py-4 first:pt-0 last:pb-0"
                    >

                        <img
                            src={item.products.image_url}
                            alt={item.products.name}
                            className="h-20 w-20 rounded-xl object-cover"
                        />


                        <div className="min-w-0 flex-1">

                            <h3 className="font-bold text-slate-900">
                                {item.products.name}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Quantity: {item.quantity}
                            </p>

                            <p className="mt-1 text-sm font-bold text-violet-600">
                                ${item.products.price} each
                            </p>

                        </div>


                        <div className="font-black text-slate-900">
                            $
                            {(
                                item.products.price *
                                item.quantity
                            ).toFixed(2)}
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default CheckoutItems;

