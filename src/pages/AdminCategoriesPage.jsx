
import { useEffect, useState } from "react";

import {
    FolderPlus,
    ShieldCheck,
    Plus,
    Loader2
} from "lucide-react";

import {
    createAdminCategory,
    getCategories,
    deleteAdminCategory
} from "../services/api";
function AdminCategoriesPage() {
    const [categories, setCategories] =
        useState([]);

    const [name, setName] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    useEffect(() => {
        async function loadCategories() {
            try {
                setLoading(true);
                setError("");

                const data =
                    await getCategories();

                setCategories(data || []);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, []);
async function handleDelete(category) {
    const confirmed = window.confirm(
        `Are you sure you want to delete "${category.name}"?`
    );

    if (!confirmed) return;

    try {
        setError("");
        setSuccess("");

        await deleteAdminCategory(category.id);

        setCategories((current) =>
            current.filter(
                (item) => item.id !== category.id
            )
        );

        setSuccess(
            "Category deleted successfully."
        );

    } catch (error) {
        setError(error.message);
    }
}
    async function handleSubmit(e) {
        e.preventDefault();

        const categoryName =
            name.trim();

        if (!categoryName) {
            setError(
                "Please enter a category name."
            );
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const newCategory =
                await createAdminCategory(
                    categoryName
                );

            setCategories((current) => [
                newCategory,
                ...current
            ]);

            setName("");

            setSuccess(
                "Category created successfully."
            );

        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-12">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
                            <ShieldCheck className="h-6 w-6 text-violet-600" />
                        </div>

                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                                Administration
                            </p>

                            <h1 className="mt-1 text-4xl font-black text-slate-900">
                                Categories Management
                            </h1>
                        </div>

                    </div>

                    <p className="mt-3 text-slate-500">
                        Create and manage marketplace product categories.
                    </p>
                </div>

                {/* Add Category */}
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
                            <FolderPlus className="h-5 w-5 text-violet-600" />
                        </div>

                        <div>
                            <h2 className="text-xl font-black text-slate-900">
                                Add New Category
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Add a new category to the marketplace.
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 flex flex-col gap-3 sm:flex-row"
                    >
                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            placeholder="Category name..."
                            disabled={saving}
                            className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:bg-slate-100"
                        />

                        <button
                            type="submit"
                            disabled={
                                saving ||
                                !name.trim()
                            }
                            className="flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <Plus className="h-4 w-4" />
                                    Add Category
                                </>
                            )}
                        </button>
                    </form>

                    {/* Messages */}
                    {error && (
                        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-600">
                            {success}
                        </div>
                    )}
                </div>

                {/* Categories */}
                <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-black text-slate-900">
                                Existing Categories
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {categories.length} categories available.
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
                            <FolderPlus className="h-5 w-5 text-violet-600" />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex h-48 items-center justify-center">
                            <div className="h-9 w-9 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="mt-6 rounded-2xl border border-slate-200 p-10 text-center">
                            <p className="font-bold text-slate-700">
                                No categories yet.
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                Create your first category above.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                     
{categories.map((category) => (
    <div
        key={category.id}
        className="rounded-2xl border border-slate-200 p-5 transition hover:border-violet-200 hover:bg-violet-50/40"
    >
        <div className="flex items-center justify-between">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                <FolderPlus className="h-5 w-5 text-violet-600" />
            </div>

            <span className="text-xs font-bold text-slate-400">
                #{category.id}
            </span>

        </div>

        <div className="mt-4 flex items-center justify-between gap-3">

            <h3 className="font-black text-slate-900">
                {category.name}
            </h3>

            <button
                type="button"
                onClick={() =>
                    handleDelete(category)
                }
                className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
            >
                Delete
            </button>

        </div>
    </div>
))}
                        </div>
                    )}


                </div>

            </div>
        </main>
    );
}

export default AdminCategoriesPage;

