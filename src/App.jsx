
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetailsPage from "./pages/ProductDetailsPage";
function Placeholder({ title }) {
    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-slate-100 px-6">
            <div className="text-center">

                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-violet-600">
                    Coming next
                </p>

                <h1 className="text-4xl font-black text-slate-900">
                    {title}
                </h1>

                <p className="mt-3 text-slate-500">
                    This page will be built next.
                </p>

            </div>
        </main>
    );
}

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />
                <Route
                 path="/products/:id"
                element={<ProductDetailsPage />}
                    />
                <Route
                    path="/categories"
                    element={<Placeholder title="Categories" />}
                />

                <Route
                    path="/about"
                    element={<Placeholder title="About" />}
                />

                <Route
                    path="/cart"
                    element={<Placeholder title="Shopping Cart" />}
                />

                <Route
                    path="/login"
                    element={<Placeholder title="Login" />}
                />

                <Route
                    path="/register"
                    element={<Placeholder title="Register" />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
