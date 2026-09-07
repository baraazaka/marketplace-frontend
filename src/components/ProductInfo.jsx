
import { useState } from "react";
import {
    Minus,
    Plus,
    ShoppingCart,
    Star,
    Check
} from "lucide-react";

function ProductInfo({ product }) {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity((current) => current + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((current) => Math.max(1, current - 1));
    };

    return (
        <div className="flex flex-col justify-center">

            {/* Category */}
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                {product.category || "Product"}
            </p>

            {/* Product name */}
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-2">
                <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-slate-800">
                        4.8
                    </span>
                </div>

                <span className="text-sm text-slate-400">
                    (120 reviews)
                </span>
            </div>

            {/* Price */}
            <div className="mt-7">
                <p className="text-sm font-medium text-slate-400">
                    Price
                </p>

                <p className="mt-1 text-4xl font-black text-violet-600">
                    ${product.price}
                </p>
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-slate-200 pt-7">
                <h2 className="text-lg font-bold text-slate-900">
                    About this product
                </h2>

                <p className="mt-3 leading-7 text-slate-500">
                    {product.description || "No description available for this product."}
                </p>
            </div>

            {/* Stock */}
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                <Check className="h-5 w-5" />
                In stock
            </div>

            {/* Quantity + Add to cart */}
            <div className="mt-7 flex flex-col gap-4 sm:flex-row">

                {/* Quantity */}
                <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white">
                    <button
                        type="button"
                        onClick={decreaseQuantity}
                        className="flex h-full w-12 items-center justify-center text-slate-500 transition hover:text-violet-600"
                        aria-label="Decrease quantity"
                    >
                        <Minus className="h-4 w-4" />
                    </button>

                    <span className="w-10 text-center font-bold text-slate-900">
                        {quantity}
                    </span>

                    <button
                        type="button"
                        onClick={increaseQuantity}
                        className="flex h-full w-12 items-center justify-center text-slate-500 transition hover:text-violet-600"
                        aria-label="Increase quantity"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>

                {/* Add to cart */}
                <button
                    type="button"
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-violet-500/20"
                >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                </button>

            </div>
        </div>
    );
}

export default ProductInfo;

