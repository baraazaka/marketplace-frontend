
import { useEffect, useState } from "react";

import ProductsHeader from "../components/ProductsHeader";
import ProductGrid from "../components/ProductGrid";
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
                    productsCount={products.length}
                />

                {products.length === 0 ? (

                    <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">

                        <h2 className="text-xl font-bold text-slate-900">
                            No products found
                        </h2>

                        <p className="mt-2 text-slate-500">
                            There are no products available yet.
                        </p>

                    </div>

                ) : (

                    <ProductGrid
                        products={products}
                    />

                )}

            </div>

        </main>

    );

}


export default Products;

