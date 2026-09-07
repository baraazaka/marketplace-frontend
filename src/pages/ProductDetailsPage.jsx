
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../services/api";


function ProductDetailsPage() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        async function loadProduct() {

            try {

                const data = await getProductById(id);

                setProduct(data);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }

        }

        loadProduct();

    }, [id]);


    if (loading) {

        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-100">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

                    <p className="mt-4 text-sm text-slate-500">
                        Loading product...
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


    if (!product) {

        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-100">

                <div className="text-center">

                    <h1 className="text-2xl font-bold text-slate-900">
                        Product not found
                    </h1>

                    <p className="mt-2 text-slate-500">
                        This product does not exist.
                    </p>

                </div>

            </main>
        );

    }


    return (

        <main className="min-h-screen bg-slate-100 px-6 py-16">

            <div className="mx-auto max-w-7xl">

                <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

                    <h1 className="text-3xl font-black text-slate-900">
                        {product.name}
                    </h1>

                    <p className="mt-4 text-slate-500">
                        {product.description}
                    </p>

                    <p className="mt-6 text-2xl font-black text-violet-600">
                        ${product.price}
                    </p>

                </div>

            </div>

        </main>

    );

}


export default ProductDetailsPage;

