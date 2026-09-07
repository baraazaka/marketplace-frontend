
import { Heart, Image as ImageIcon } from "lucide-react";

function ProductGallery({ product }) {
    return (
        <div className="space-y-4">
            <div className="group relative flex h-[500px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-violet-100 via-indigo-100 to-slate-100 shadow-sm ring-1 ring-slate-200">

                {/* Product image */}
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                        <ImageIcon className="h-20 w-20" />
                        <p className="mt-4 text-sm font-medium">
                            No image available
                        </p>
                    </div>
                )}

                {/* Category */}
                <span className="absolute left-5 top-5 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm backdrop-blur">
                    {product.category || "Product"}
                </span>

                {/* Wishlist */}
                <button
                    type="button"
                    className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/85 text-slate-600 shadow-sm backdrop-blur transition duration-300 hover:scale-105 hover:bg-white hover:text-red-500"
                    aria-label="Add to wishlist"
                >
                    <Heart className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}

export default ProductGallery;

