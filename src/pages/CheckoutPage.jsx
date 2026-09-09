
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getMyCartItems,
    createOrder
} from "../services/api";

import CheckoutHeader from "../components/checkout/CheckoutHeader";
import ShippingForm from "../components/checkout/ShippingForm";
import CheckoutItems from "../components/checkout/CheckoutItems";
import CheckoutSummary from "../components/checkout/CheckoutSummary";


function CheckoutPage() {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);

    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(true);

    const [placingOrder, setPlacingOrder] = useState(false);

    const [error, setError] = useState("");


    // Load cart
    async function loadCart() {

        try {

            setLoading(true);
            setError("");

            const data = await getMyCartItems();

            setCartItems(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }


    useEffect(() => {

        loadCart();

    }, []);


    // Calculate total
    // This is only for displaying the total.
    // The backend calculates the real order total.
    const total = cartItems.reduce(
        (sum, item) =>
            sum + item.products.price * item.quantity,
        0
    );


    // Place order
    async function handlePlaceOrder() {

        // Validate city
        if (!city.trim()) {

            setError("Please enter your city.");

            return;
        }


        // Validate address
        if (!address.trim()) {

            setError("Please enter your delivery address.");

            return;
        }


        // Validate phone
        if (!phone.trim()) {

            setError("Please enter your phone number.");

            return;
        }


        try {

            setPlacingOrder(true);

            setError("");


            // Combine shipping information
            const shippingAddress = `
${city.trim()}, ${address.trim()}, Phone: ${phone.trim()}
            `.trim();


            // Send order to backend
            await createOrder(shippingAddress);


            // Notify Navbar that cart changed
            window.dispatchEvent(
                new Event("cartUpdated")
            );


            // Go to orders page
            navigate("/orders");

        } catch (error) {

            setError(error.message);

        } finally {

            setPlacingOrder(false);

        }
    }


    // Loading
    if (loading) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600" />

                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading checkout...
                    </p>

                </div>

            </div>
        );
    }


    // Empty cart
    if (cartItems.length === 0) {

        return (
            <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6">

                <div className="text-center">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-50">

                        <span className="text-3xl">
                            🛒
                        </span>

                    </div>


                    <h1 className="mt-6 text-3xl font-black text-slate-900">
                        Your cart is empty
                    </h1>


                    <p className="mt-3 text-slate-500">
                        Add some products before checking out.
                    </p>


                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="mt-7 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
                    >
                        Continue Shopping
                    </button>

                </div>

            </div>
        );
    }


    return (
        <div className="mx-auto max-w-7xl px-6 py-12">

            {/* Header */}

            <CheckoutHeader />


            {/* Error */}

            {error && (
                <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {error}
                </div>
            )}


            {/* Checkout */}

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">


                {/* Left Side */}

                <div className="space-y-8">

                    <ShippingForm
                        city={city}
                        setCity={setCity}
                        address={address}
                        setAddress={setAddress}
                        phone={phone}
                        setPhone={setPhone}
                    />


                    <CheckoutItems
                        cartItems={cartItems}
                    />

                </div>


                {/* Right Side */}

                <CheckoutSummary
                    cartItems={cartItems}
                    total={total}
                    placingOrder={placingOrder}
                    onPlaceOrder={handlePlaceOrder}
                    onBackToCart={() => navigate("/cart")}
                />

            </div>

        </div>
    );
}


export default CheckoutPage;

