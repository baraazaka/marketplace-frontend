
import { useEffect, useMemo, useState } from "react";

import ProductsHeader from "../components/ProductsHeader";
import ProductFilters from "../components/ProductFilters";
import ProductGrid from "../components/ProductGrid";

import {
    getProducts,
    getCategories
} from "../services/api";


function Products() {

    // All products from API
    const [products, setProducts] = useState([]);

    // Categories from API
    const [categories, setCategories] = useState([]);

    // UI state
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("default");

    // Request state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Get products + categories
    useEffect(() => {

        async function loadData() {

            try {

                setLoading(true);
                setError(null);

                const [
                    productsData,
                    categoriesData
                ] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);

                setProducts(productsData || []);
                setCategories(categoriesData || []);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }

        }

        loadData();

    }, []);


    // Filter + Search + Sort
    const filteredProducts = useMemo(() => {

        let result = [...products];


        // Search
        if (search.trim() !== "") {

            result = result.filter((product) =>
                product.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            );

        }


        // Category
        if (category !== "all") {

            result = result.filter((product) =>
                product.category
                    ?.toLowerCase()
                    === category.toLowerCase()
            );

        }


        // Sort: Price Low → High
        if (sort === "price-low") {

            result.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );

        }


        // Sort: Price High → Low
        if (sort === "price-high") {

            result.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );

        }


        // Sort: Name A → Z
        if (sort === "name") {

            result.sort(
                (a, b) =>
                    (a.name || "").localeCompare(
                        b.name || ""
                    )
            );

        }


        return result;

    }, [
        products,
        search,
        category,
        sort
    ]);


    // Loading
    if (loading) {

        return (

            <main className="flex min-h-screen items-center justify-center bg-slate-100">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading products...
                    </p>

                </div>

            </main>

        );

    }


    // Error
    if (error) {

        return (

            <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">

                <div className="max-w-md text-center">

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

        <main className="min-h-screen bg-slate-100 px-6 py-16">

            <div className="mx-auto max-w-7xl">

                <ProductsHeader
                    productsCount={
                        filteredProducts.length
                    }
                />


                <ProductFilters
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                    sort={sort}
                    setSort={setSort}
                    categories={categories}
                />


                {filteredProducts.length === 0 ? (

                    <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">

                        <h2 className="text-xl font-bold text-slate-900">
                            No products found
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Try changing your search or filters.
                        </p>

                    </div>

                ) : (

                    <ProductGrid
                        products={filteredProducts}
                    />

                )}

            </div>

        </main>

    );

}


export default Products;

