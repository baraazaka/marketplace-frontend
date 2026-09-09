import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getProductById } from "../services/api";

import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ReviewSection from "../components/reviews/ReviewSection";

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

                    <p className="mt-4 text-sm font-medium text-slate-500">
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

                    <Link
                        to="/products"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Products
                    </Link>
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

                    <Link
                        to="/products"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Products
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Back button */}
                <Link
                    to="/products"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Products
                </Link>

                {/* Product details */}
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-10">
                    <div className="grid gap-10 lg:grid-cols-2">

                        <ProductGallery
                            product={product}
                        />

                        <ProductInfo
                            product={product}
                        />

                    </div>
                </div>

                {/* Reviews */}
                <ReviewSection
                    productId={product.id}
                />

            </div>
        </main>
    );
}

export default ProductDetailsPage;

