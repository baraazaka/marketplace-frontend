
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/navbar/Navbar";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryDetailsPage from "./pages/CategoryDetailsPage";
import ProfilePage from "./pages/ProfilePage";
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

        <Navbar/>
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
                    path="/about"
                    element={<Placeholder title="About" />}
                />

                <Route
                    path="/cart"
                    element={<Cart />   }
                />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/:id" element={<OrderDetailsPage />}/>
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/:id" element={<CategoryDetailsPage />} />
                    <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/register" element={<Register />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;
