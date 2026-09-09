
import {
    ShoppingCart,
    Heart,
    LogIn,
    UserPlus,
    User,
    LogOut
} from "lucide-react";

import { Link } from "react-router-dom";

function NavbarActions({
    isAuthenticated,
    logout,
    cartCount,
    wishlistCount,
    handleLogout
}) {
    return (
        <div className="hidden items-center gap-3 md:flex">

            {/* Wishlist */}
            <Link
                to="/wishlist"
                className="relative rounded-xl p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Wishlist"
            >
                <Heart className="h-5 w-5" />

                {wishlistCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-slate-950">
                        {wishlistCount}
                    </span>
                )}
            </Link>

            {/* Cart */}
            <Link
                to="/cart"
                className="relative rounded-xl p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Shopping cart"
            >
                <ShoppingCart className="h-5 w-5" />

                {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-500 px-1 text-[10px] font-bold text-white ring-2 ring-slate-950">
                        {cartCount}
                    </span>
                )}
            </Link>

            {isAuthenticated ? (
                <>
                    <Link
                        to="/profile"
                        className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-white/5"
                    >
                        <User className="h-4 w-4" />
                        Account
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-300 hover:-translate-y-0.5 hover:from-violet-600 hover:to-indigo-700"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link
                        to="/login"
                        className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-white/5"
                    >
                        <LogIn className="h-4 w-4" />
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-300 hover:-translate-y-0.5 hover:from-violet-600 hover:to-indigo-700"
                    >
                        <UserPlus className="h-4 w-4" />
                        Register
                    </Link>
                </>
            )}
        </div>
    );
}

export default NavbarActions;

