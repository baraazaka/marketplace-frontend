
import {
    ShoppingCart,
    Heart,
    Home,
    Package,
    Grid2X2,
    Info,
    ClipboardList,
    LogIn,
    UserPlus,
    User,
    LogOut
} from "lucide-react";

import { Link } from "react-router-dom";

function MobileMenu({
    isMenuOpen,
    closeMenu,
    isAuthenticated,
    cartCount,
    wishlistCount,
    handleLogout
}) {
    if (!isMenuOpen) {
        return null;
    }

    return (
        <div className="border-t border-white/10 bg-slate-950 px-6 py-5 md:hidden">
            <div className="flex flex-col gap-2">

                <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                    <Home className="h-5 w-5 text-violet-400" />
                    Home
                </Link>

                <Link
                    to="/products"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                    <Package className="h-5 w-5 text-violet-400" />
                    Products
                </Link>

                <Link
                    to="/categories"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                    <Grid2X2 className="h-5 w-5 text-violet-400" />
                    Categories
                </Link>

                <Link
                    to="/about"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                    <Info className="h-5 w-5 text-violet-400" />
                    About
                </Link>

                <div className="my-3 h-px bg-white/10" />

                {/* Wishlist */}

                <Link
                    to="/wishlist"
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                    <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 text-violet-400" />
                        Wishlist
                    </div>

                    {wishlistCount > 0 && (
                        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold">
                            {wishlistCount}
                        </span>
                    )}
                </Link>


                {/* Cart */}

                <Link
                    to="/cart"
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                    <div className="flex items-center gap-3">
                        <ShoppingCart className="h-5 w-5 text-violet-400" />
                        Cart
                    </div>

                    {cartCount > 0 && (
                        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-violet-500 px-2 text-xs font-bold">
                            {cartCount}
                        </span>
                    )}
                </Link>


                {/* Orders */}

                {isAuthenticated && (
                    <Link
                        to="/orders"
                        onClick={closeMenu}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                    >
                        <ClipboardList className="h-5 w-5 text-violet-400" />
                        Orders
                    </Link>
                )}


                {isAuthenticated ? (
                    <>
                        <Link
                            to="/profile"
                            onClick={closeMenu}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                        >
                            <User className="h-5 w-5 text-violet-400" />
                            Account
                        </Link>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="mt-2 grid grid-cols-2 gap-3">

                        <Link
                            to="/login"
                            onClick={closeMenu}
                            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5"
                        >
                            <LogIn className="h-4 w-4" />
                            Login
                        </Link>

                        <Link
                            to="/register"
                            onClick={closeMenu}
                            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white"
                        >
                            <UserPlus className="h-4 w-4" />
                            Register
                        </Link>

                    </div>
                )}

            </div>
        </div>
    );
}

export default MobileMenu;

