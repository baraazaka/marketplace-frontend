
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

    if (loading) {
        return (
            <>
                <Navbar />
                <p className="p-8">Loading...</p>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <p className="p-8 text-red-500">{error}</p>
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="mx-auto max-w-7xl p-8">
                <h2 className="mb-6 text-3xl font-bold">
                    Products
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="rounded-lg bg-white p-5 shadow"
                        >
                            <h3 className="text-xl font-bold">
                                {product.name}
                            </h3>

                            <p className="mt-2 text-gray-600">
                                {product.description}
                            </p>

                            <p className="mt-4 font-bold">
                                ${product.price}
                            </p>

                            <p className="text-sm text-gray-500">
                                Stock: {product.stock}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;

