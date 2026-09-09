
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Trash2, ShoppingCart } from "lucide-react";

import {
    getMyWishlistItems,
    deleteWishlistItem
} from "../services/api";

import { useAuth } from "../context/AuthContext";

function Wishlist() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadWishlist() {
            if (!isAuthenticated) {
                navigate("/login");
                return;
            }

            try {
                const data = await getMyWishlistItems();
                setItems(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadWishlist();
    }, [isAuthenticated, navigate]);

    async function handleRemove(itemId) {
        try {
            await deleteWishlistItem(itemId);

            setItems((currentItems) =>
                currentItems.filter(
                    (item) => item.id !== itemId
                )
            );
        } catch (error) {
            setError(error.message);
        }
    }

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-100">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading wishlist...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Back */}
                <Link
                    to="/products"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Products
                </Link>

                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                        <Heart
                            className="h-7 w-7"
                            fill="currentColor"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">
                            My Wishlist
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Products you saved for later
                        </p>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                        {error}
                    </div>
                )}

                {/* Empty Wishlist */}
                {items.length === 0 ? (
                    <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-slate-200">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                            <Heart className="h-9 w-9 text-slate-400" />
                        </div>

                        <h2 className="mt-6 text-2xl font-black text-slate-900">
                            Your wishlist is empty
                        </h2>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                            Save products you like by clicking the heart icon.
                        </p>

                        <Link
                            to="/products"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => {
                            const product = item.products;

                            return (
                                <div
                                    key={item.id}
                                    className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    {/* Image */}
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="block overflow-hidden bg-slate-100"
                                    >
                                        <img
                                            src={
                                                product.image_url ||
                                                "https://via.placeholder.com/600x400?text=No+Image"
                                            }
                                            alt={product.name}
                                            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    </Link>

                                    {/* Content */}
                                    <div className="p-6">

                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <Link
                                                    to={`/products/${product.id}`}
                                                    className="text-xl font-black text-slate-900 transition hover:text-violet-600"
                                                >
                                                    {product.name}
                                                </Link>

                                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                                                    {product.description ||
                                                        "No description available."}
                                                </p>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemove(item.id)
                                                }
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100"
                                                aria-label="Remove from wishlist"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* Bottom */}
                                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                                            <div>
                                                <p className="text-xs font-medium text-slate-400">
                                                    Price
                                                </p>

                                                <p className="mt-1 text-2xl font-black text-violet-600">
                                                    ${product.price}
                                                </p>
                                            </div>

                                            <Link
                                                to={`/products/${product.id}`}
                                                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-600"
                                            >
                                                View Product
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}

export default Wishlist;

