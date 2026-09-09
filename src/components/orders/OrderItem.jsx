
function OrderItem({ item }) {

    const product = item.products;

    const itemTotal =
        item.price_at_purchase * item.quantity;


    return (
        <div className="flex gap-4 py-4">

            {/* Product Image */}

            <img
                src={product?.image_url}
                alt={product?.name}
                className="h-20 w-20 rounded-xl object-cover"
            />


            {/* Product Information */}

            <div className="min-w-0 flex-1">

                <h3 className="font-bold text-slate-900">
                    {product?.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Quantity: {item.quantity}
                </p>

                <p className="mt-1 text-sm font-semibold text-violet-600">
                    ${Number(item.price_at_purchase).toFixed(2)} each
                </p>

            </div>


            {/* Item Total */}

            <div className="text-right">

                <p className="font-black text-slate-900">
                    ${Number(itemTotal).toFixed(2)}
                </p>

            </div>

        </div>
    );
}


export default OrderItem;

