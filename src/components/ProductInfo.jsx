    
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Minus,
    Plus,
    ShoppingCart,
    Star,
    Check,
    Heart
} from "lucide-react";

import {
    getMyCart,
    createCart,
    addToCart,
    getMyWishlist,
    createWishlist,
    getMyWishlistItems,
    addToWishlist,
    deleteWishlistItem
} from "../services/api";

import { useAuth } from "../context/AuthContext";


function ProductInfo({ product }) {

    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();


    // -------------------------
    // Cart State
    // -------------------------

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");


    // -------------------------
    // Wishlist State
    // -------------------------

    const [wishlistItem, setWishlistItem] = useState(null);

    const [wishlistLoading, setWishlistLoading] = useState(false);


    // -------------------------
    // Quantity
    // -------------------------

    const increaseQuantity = () => {
        setQuantity((current) => current + 1);
    };


    const decreaseQuantity = () => {
        setQuantity((current) =>
            Math.max(1, current - 1)
        );
    };


    // -------------------------
    // Load Wishlist
    // -------------------------

    useEffect(() => {

        async function loadWishlist() {

            // User is not logged in
            if (!isAuthenticated) {
                setWishlistItem(null);
                return;
            }


            try {

                const items = await getMyWishlistItems();


                // Find current product in wishlist
                const currentItem = items.find(
                    (item) =>
                        item.product_id === product.id
                );


                setWishlistItem(
                    currentItem || null
                );


            } catch (error) {

                // Wishlist doesn't exist yet
                setWishlistItem(null);

            }

        }


        loadWishlist();

    }, [isAuthenticated, product.id]);


    // -------------------------
    // Add To Cart
    // -------------------------

    async function handleAddToCart() {

        // User must be logged in
        if (!isAuthenticated) {

            navigate("/login");

            return;
        }


        setLoading(true);

        setSuccess("");

        setError("");


        try {

            let cart;


            // Try to get user's cart
            try {

                cart = await getMyCart();

            } catch (error) {

                // Cart doesn't exist
                cart = await createCart();

            }


            // Add product to cart
            await addToCart(
                cart.id,
                product.id,
                quantity
            );


            setSuccess(
                "Product added to cart successfully!"
            );


        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    }


    // -------------------------
    // Wishlist
    // -------------------------

    async function handleWishlist() {

        // User must be logged in
        if (!isAuthenticated) {

            navigate("/login");

            return;
        }


        setWishlistLoading(true);


        try {

            // -------------------------
            // Remove from wishlist
            // -------------------------

            if (wishlistItem) {

                await deleteWishlistItem(
                    wishlistItem.id
                );


                setWishlistItem(null);


                return;
            }


            // -------------------------
            // Add to wishlist
            // -------------------------

            let wishlist;


            try {

                // Get user's wishlist
                wishlist = await getMyWishlist();

            } catch (error) {

                // Wishlist doesn't exist
                wishlist = await createWishlist();

            }


            const newItem = await addToWishlist(
                wishlist.id,
                product.id
            );


            setWishlistItem(newItem);


        } catch (error) {

            setError(error.message);

        } finally {

            setWishlistLoading(false);

        }

    }


    return (
        <div className="flex flex-col justify-center">

            {/* Category */}

            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                {product.category || "Product"}
            </p>


            {/* Product Name */}

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                {product.name}
            </h1>


            {/* Rating */}

            <div className="mt-5 flex items-center gap-2">

                <div className="flex items-center gap-1">

                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                    <span className="font-bold text-slate-800">
                        4.8
                    </span>

                </div>

                <span className="text-sm text-slate-400">
                    (120 reviews)
                </span>

            </div>


            {/* Price */}

            <div className="mt-7">

                <p className="text-sm font-medium text-slate-400">
                    Price
                </p>

                <p className="mt-1 text-4xl font-black text-violet-600">
                    ${product.price}
                </p>

            </div>


            {/* Description */}

            <div className="mt-8 border-t border-slate-200 pt-7">

                <h2 className="text-lg font-bold text-slate-900">
                    About this product
                </h2>

                <p className="mt-3 leading-7 text-slate-500">
                    {product.description ||
                        "No description available for this product."}
                </p>

            </div>


            {/* Stock */}

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-600">

                <Check className="h-5 w-5" />

                In stock

            </div>


            {/* Messages */}

            {success && (
                <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-600">
                    {success}
                </div>
            )}


            {error && (
                <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {error}
                </div>
            )}


            {/* Actions */}

            <div className="mt-7 flex flex-col gap-4 sm:flex-row">

                {/* Quantity */}

                <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white">

                    <button
                        type="button"
                        onClick={decreaseQuantity}
                        className="flex h-full w-12 items-center justify-center text-slate-500 transition hover:text-violet-600"
                        aria-label="Decrease quantity"
                    >
                        <Minus className="h-4 w-4" />
                    </button>


                    <span className="w-10 text-center font-bold text-slate-900">
                        {quantity}
                    </span>


                    <button
                        type="button"
                        onClick={increaseQuantity}
                        className="flex h-full w-12 items-center justify-center text-slate-500 transition hover:text-violet-600"
                        aria-label="Increase quantity"
                    >
                        <Plus className="h-4 w-4" />
                    </button>

                </div>


                {/* Add To Cart */}

                <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={loading}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >

                    <ShoppingCart className="h-5 w-5" />

                    {loading
                        ? "Adding..."
                        : "Add to Cart"}

                </button>


                {/* Wishlist */}

                <button
                    type="button"
                    onClick={handleWishlist}
                    disabled={wishlistLoading}
                    aria-label={
                        wishlistItem
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                    }
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition ${
                        wishlistItem
                            ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                            : "border-slate-200 bg-white text-slate-500 hover:border-red-200 hover:text-red-500"
                    } disabled:cursor-not-allowed disabled:opacity-60`}
                >

                    <Heart
                        className="h-5 w-5"
                        fill={
                            wishlistItem
                                ? "currentColor"
                                : "none"
                        }
                    />

                </button>

            </div>

        </div>
    );
}


export default ProductInfo;

