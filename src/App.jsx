
import { useEffect, useState } from "react";
import { getProducts } from "./services/api";

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
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="mb-6 text-3xl font-bold">
                Marketplace Products
            </h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="rounded-lg bg-white p-5 shadow"
                    >
                        <h2 className="text-xl font-bold">
                            {product.name}
                        </h2>

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
        </div>
    );
}

export default App;
