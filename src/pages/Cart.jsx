
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

import {
    getMyCartItems,
    updateCartItem,
    deleteCartItem
} from "../services/api";

import CartItemList from "../components/cart/CartItemList";
import CartSummary from "../components/cart/CartSummary";


function Cart() {

    const [cartItems, setCartItems] = useState([]);

    const [loading, setLoading] = useState(true);

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


    // Increase quantity
    async function increaseQuantity(item) {

        try {

            const updatedItem =
                await updateCartItem(
                    item.id,
                    item.quantity + 1
                );

            setCartItems((currentItems) =>
                currentItems.map((currentItem) =>
                    currentItem.id === item.id
                        ? {
                            ...currentItem,
                            quantity: updatedItem.quantity
                        }
                        : currentItem
                )
            );

        } catch (error) {

            setError(error.message);

        }
    }


    // Decrease quantity
    async function decreaseQuantity(item) {

        if (item.quantity <= 1) {
            return;
        }


        try {

            const updatedItem =
                await updateCartItem(
                    item.id,
                    item.quantity - 1
                );

            setCartItems((currentItems) =>
                currentItems.map((currentItem) =>
                    currentItem.id === item.id
                        ? {
                            ...currentItem,
                            quantity: updatedItem.quantity
                        }
                        : currentItem
                )
            );

        } catch (error) {

            setError(error.message);

        }
    }


    // Remove item
    async function removeItem(id) {

        try {

            await deleteCartItem(id);

            setCartItems((currentItems) =>
                currentItems.filter(
                    (item) => item.id !== id
                )
            );

        } catch (error) {

            setError(error.message);

        }
    }


    // Loading
    if (loading) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600" />

                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading your cart...
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

                        <ShoppingBag className="h-9 w-9 text-violet-600" />

                    </div>


                    <h1 className="mt-6 text-3xl font-black text-slate-900">
                        Your cart is empty
                    </h1>


                    <p className="mt-3 text-slate-500">
                        Looks like you haven't added anything yet.
                    </p>


                    <Link
                        to="/"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
                    >
                        Continue Shopping

                        <ArrowRight className="h-4 w-4" />

                    </Link>

                </div>

            </div>
        );
    }


    return (
        <div className="mx-auto max-w-7xl px-6 py-12">

            {/* Header */}

            <div>

                <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                    Shopping Cart
                </p>

                <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">
                    Your Cart
                </h1>

                <p className="mt-2 text-slate-500">
                    Review your items before checkout.
                </p>

            </div>


            {/* Error */}

            {error && (
                <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {error}
                </div>
            )}


            {/* Cart */}

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">

                <CartItemList
                    cartItems={cartItems}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onRemove={removeItem}
                />


                <CartSummary
                    cartItems={cartItems}
                />

            </div>

        </div>
    );
}

export default Cart;

