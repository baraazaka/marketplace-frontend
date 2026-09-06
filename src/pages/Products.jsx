
import { useEffect, useState } from "react";

import { getProducts } from "../services/api";

function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


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


    if (loading) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-slate-100">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading products...
                    </p>

                </div>

            </main>
        );
    }


    if (error) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-slate-100 px-6">

                <div className="text-center">

                    <h1 className="text-2xl font-bold text-red-600">
                        Something went wrong
                    </h1>

                    <p className="mt-2 text-slate-500">
                        {error}
                    </p>

                </div>

            </main>
        );
    }


    return (
        <main className="min-h-screen bg-slate-100 px-6 py-16">

            <div className="mx-auto max-w-7xl">

                <div className="mb-10">

                    <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                        Marketplace
                    </p>

                    <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">
                        All Products
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Discover products from our marketplace.
                    </p>

                </div>


                {products.length === 0 ? (

                    <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

                        <h2 className="text-xl font-bold text-slate-900">
                            No products found
                        </h2>

                        <p className="mt-2 text-slate-500">
                            There are no products available yet.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        {products.map((product) => (

                            <div
                                key={product.id}
                                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
                            >

                                <div className="flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100">

                                    <span className="text-5xl">
                                        🛍️
                                    </span>

                                </div>


                                <h2 className="mt-5 text-lg font-bold text-slate-900">
                                    {product.name}
                                </h2>


                                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                                    {product.description || "No description available."}
                                </p>


                                <div className="mt-5 flex items-center justify-between">

                                    <span className="text-xl font-bold text-violet-600">
                                        ${product.price}
                                    </span>

                                    <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-600">
                                        View
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </main>
    );
}

export default Products;

