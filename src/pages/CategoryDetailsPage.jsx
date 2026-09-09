
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";

import { getCategoryProducts } from "../services/api";

function CategoryDetailsPage() {
    const { id } = useParams();

    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCategoryProducts() {
            try {
                setLoading(true);
                setError("");

                const data = await getCategoryProducts(id);

                setCategory(data.category);
                setProducts(data.products);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadCategoryProducts();
    }, [id]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-100">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading category...
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">
                        Something went wrong
                    </h1>

                    <p className="mt-3 text-slate-500">
                        {error}
                    </p>

                    <Link
                        to="/categories"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Categories
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Back */}
                <Link
                    to="/categories"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-violet-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Categories
                </Link>

                {/* Header */}
                <div className="mt-8">
                    <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                        Category
                    </p>

                    <h1 className="mt-2 text-4xl font-black text-slate-900">
                        {category?.name}
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Explore all products in this category.
                    </p>
                </div>

                {/* Products */}
                {products.length === 0 ? (
                    <div className="mt-10 rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
                        <Package className="mx-auto h-10 w-10 text-slate-300" />

                        <h2 className="mt-4 text-xl font-bold text-slate-900">
                            No products found
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            There are no products in this category yet.
                        </p>
                    </div>
                ) : (
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                to={`/products/${product.id}`}
                                className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-violet-200"
                            >
                                {/* Image */}
                                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                                    {product.image_url ? (
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <Package className="h-12 w-12 text-slate-300" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
                                        {product.brand || "Product"}
                                    </p>

                                    <h2 className="mt-2 text-xl font-black text-slate-900 transition group-hover:text-violet-600">
                                        {product.name}
                                    </h2>

                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                                        {product.description}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between">
                                        <span className="text-2xl font-black text-violet-600">
                                            ${Number(product.price).toFixed(2)}
                                        </span>

                                        <span className="text-sm font-bold text-slate-400 transition group-hover:text-violet-600">
                                            View Product →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default CategoryDetailsPage;

