
import { useEffect, useState } from "react";
import { getProducts } from "./services/api";
import Navbar from "./components/Navbar";

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <main className="mx-auto max-w-7xl px-6 py-12">

                {/* Header */}
                <div className="mb-10">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-violet-600">
                        Discover
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                        Explore our products
                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-500">
                        Find products you love from our marketplace.
                    </p>
                </div>


                {/* Loading */}
                {loading && (
                    <p className="text-slate-500">
                        Loading products...
                    </p>
                )}


                {/* Error */}
                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
                        {error}
                    </div>
                )}


                {/* Products */}
                {!loading && !error && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                            >

                                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-violet-100 to-indigo-100">
                                    <span className="text-5xl">🛍️</span>
                                </div>

                                <div className="p-6">

                                    <h2 className="text-xl font-bold text-slate-900">
                                        {product.name}
                                    </h2>

                                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                                        {product.description}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between">

                                        <span className="text-2xl font-bold text-violet-600">
                                            ${product.price}
                                        </span>

                                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                                            Stock: {product.stock}
                                        </span>

                                    </div>

                                    <button
                                        className="mt-5 w-full rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 py-3 font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:from-violet-600 hover:to-indigo-700"
                                    >
                                        Add to Cart
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </main>
        </div>
    );
}

export default App;

