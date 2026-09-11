
import {
    Heart,
    ShoppingCart,
    Star
} from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {

    return (

        <div className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-500 hover:-translate-y-2 hover:shadow-2xl">

            {/* Product Image */}

            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-violet-100 to-indigo-100">

                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-7xl transition duration-500 group-hover:scale-110">
                        🛍️
                    </div>
                )}

                {/* Category */}

                <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-violet-700 backdrop-blur">
                    {product.category || "Product"}
                </span>

                {/* Wishlist */}

                <button
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-600 backdrop-blur transition hover:bg-white hover:text-red-500"
                    aria-label="Add to wishlist"
                >
                    <Heart className="h-5 w-5" />
                </button>

            </div>

            {/* Product Information */}

            <div className="p-5">

                <h2 className="line-clamp-1 text-lg font-bold text-slate-900">
                    {product.name}
                </h2>

                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
                    {product.description || "No description available."}
                </p>

                {/* Rating */}

                <div className="mt-4 flex items-center gap-1">

                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                    <span className="text-sm font-semibold text-slate-700">
                        4.8
                    </span>

                    <span className="text-xs text-slate-400">
                        (120)
                    </span>

                </div>

                {/* Price + Cart */}

                <div className="mt-5 flex items-center justify-between">

                    <div>

                        <p className="text-xs text-slate-400">
                            Price
                        </p>

                        <p className="text-xl font-black text-violet-600">
                            ${product.price}
                        </p>

                    </div>

                

                    <Link
                        to={`/products/${product.id}`}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-600"
                    >
                        View
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;
