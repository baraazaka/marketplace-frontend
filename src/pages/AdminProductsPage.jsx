
import { useEffect, useMemo, useState } from "react";

import {
    Package,
    ShieldCheck
} from "lucide-react";

import {
    getAdminProducts,
    getCategories
} from "../services/api";

import AdminProductsFilters from "../components/admin/AdminProductsFilters";
import AdminProductsTable from "../components/admin/AdminProductsTable";

function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] =
        useState("all");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                setError("");

                const [
                    productsData,
                    categoriesData
                ] = await Promise.all([
                    getAdminProducts(),
                    getCategories()
                ]);

                setProducts(
                    productsData || []
                );

                setCategories(
                    categoriesData || []
                );

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const searchValue =
                search.toLowerCase().trim();

            const productName =
                product.name?.toLowerCase() ||
                "";

            const sellerName =
                product.profiles?.full_name
                    ?.toLowerCase() || "";

            const matchesSearch =
                productName.includes(searchValue) ||
                sellerName.includes(searchValue) ||
                String(product.id).includes(
                    searchValue
                );

            const matchesCategory =
                category === "all" ||
                String(product.category_id) ===
                    String(category);

            return (
                matchesSearch &&
                matchesCategory
            );
        });
    }, [
        products,
        search,
        category
    ]);

    function handleEdit(product) {
        console.log(
            "Edit product:",
            product
        );
    }

    function handleDelete(product) {
        console.log(
            "Delete product:",
            product
        );
    }

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-12">
            <div className="mx-auto max-w-7xl">

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
                                Products Management
                            </h1>
                        </div>
                    </div>

                    <p className="mt-3 text-slate-500">
                        Manage marketplace products, sellers, and inventory.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                        {error}
                    </div>
                )}

                {/* Main Card */}
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-violet-600" />

                                <h2 className="text-xl font-black text-slate-900">
                                    All Products
                                </h2>
                            </div>

                            <p className="mt-1 text-sm text-slate-500">
                                {filteredProducts.length} products found
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <AdminProductsFilters
                        search={search}
                        setSearch={setSearch}
                        category={category}
                        setCategory={setCategory}
                        categories={categories}
                    />

                    {/* Loading */}
                    {loading ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-9 w-9 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
                        </div>
                    ) : (
                        <AdminProductsTable
                            products={filteredProducts}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}

export default AdminProductsPage;

