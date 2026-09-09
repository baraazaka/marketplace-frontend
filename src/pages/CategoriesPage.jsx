
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid2X2, ArrowRight } from "lucide-react";

import { getCategories } from "../services/api";

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCategories() {
            try {
                setLoading(true);
                setError("");

                const data = await getCategories();

                setCategories(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-100">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading categories...
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
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
                        <Grid2X2 className="h-7 w-7 text-violet-600" />
                    </div>

                    <p className="mt-5 text-sm font-bold uppercase tracking-widest text-violet-600">
                        Explore
                    </p>

                    <h1 className="mt-2 text-4xl font-black text-slate-900">
                        Shop by Category
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                        Explore our products by category and find exactly what
                        you are looking for.
                    </p>
                </div>

                {/* Empty State */}
                {categories.length === 0 ? (
                    <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
                        <Grid2X2 className="mx-auto h-10 w-10 text-slate-300" />

                        <h2 className="mt-4 text-xl font-bold text-slate-900">
                            No categories found
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            There are no categories available yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/categories/${category.id}`}
                                className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-violet-200"
                            >
                                <div className="flex items-center justify-between">

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 transition group-hover:bg-violet-600">
                                        <Grid2X2 className="h-6 w-6 text-violet-600 transition group-hover:text-white" />
                                    </div>

                                    <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-600" />
                                </div>

                                <h2 className="mt-6 text-xl font-black text-slate-900 transition group-hover:text-violet-600">
                                    {category.name}
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Explore products in this category
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default CategoriesPage;

