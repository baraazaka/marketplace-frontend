
import { useState } from "react";
import {
    ShoppingCart,
    Menu,
    X,
    Home,
    Package,
    Grid2X2,
    Info,
    LogIn,
    UserPlus,
    User,
    LogOut
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { isAuthenticated, logout } = useAuth();

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    function handleLogout() {
        logout();
        closeMenu();
    }

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white shadow-lg backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="group flex items-center gap-3"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-black shadow-lg shadow-violet-500/20 transition duration-300 group-hover:scale-105">
                        M
                    </div>

                    <div>
                        <span className="block text-lg font-bold tracking-tight">
                            Marketplace
                        </span>

                        <span className="hidden text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500 sm:block">
                            Everything. One place.
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">

                    <Link
                        to="/"
                        className="group flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
                    >
                        <Home className="h-4 w-4 transition group-hover:text-violet-400" />
                        Home
                    </Link>

                    <Link
                        to="/products"
                        className="group flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
                    >
                        <Package className="h-4 w-4 transition group-hover:text-violet-400" />
                        Products
                    </Link>

                    <Link
                        to="/categories"
                        className="group flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
                    >
                        <Grid2X2 className="h-4 w-4 transition group-hover:text-violet-400" />
                        Categories
                    </Link>

                    <Link
                        to="/about"
                        className="group flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
                    >
                        <Info className="h-4 w-4 transition group-hover:text-violet-400" />
                        About
                    </Link>

                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 md:flex">

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="relative rounded-xl p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                        aria-label="Shopping cart"
                    >
                        <ShoppingCart className="h-5 w-5" />

                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold text-white ring-2 ring-slate-950">
                            0
                        </span>
                    </Link>

                    {isAuthenticated ? (
                        <>
                            {/* Account */}
                            <Link
                                to="/profile"
                                className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-white/5"
                            >
                                <User className="h-4 w-4" />
                                Account
                            </Link>

                            {/* Logout */}
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
                            {/* Login */}
                            <Link
                                to="/login"
                                className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-white/5"
                            >
                                <LogIn className="h-4 w-4" />
                                Login
                            </Link>

                            {/* Register */}
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

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-xl p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>

            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="border-t border-white/10 bg-slate-950 px-6 py-5 md:hidden">

                    <div className="flex flex-col gap-2">

                        {/* Home */}
                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                        >
                            <Home className="h-5 w-5 text-violet-400" />
                            Home
                        </Link>

                        {/* Products */}
                        <Link
                            to="/products"
                            onClick={closeMenu}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                        >
                            <Package className="h-5 w-5 text-violet-400" />
                            Products
                        </Link>

                        {/* Categories */}
                        <Link
                            to="/categories"
                            onClick={closeMenu}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                        >
                            <Grid2X2 className="h-5 w-5 text-violet-400" />
                            Categories
                        </Link>

                        {/* About */}
                        <Link
                            to="/about"
                            onClick={closeMenu}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                        >
                            <Info className="h-5 w-5 text-violet-400" />
                            About
                        </Link>

                        <div className="my-3 h-px bg-white/10" />

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

                            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-violet-500 px-2 text-xs font-bold">
                                0
                            </span>
                        </Link>

                        {isAuthenticated ? (
                            <>
                                {/* Account */}
                                <Link
                                    to="/profile"
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                                >
                                    <User className="h-5 w-5 text-violet-400" />
                                    Account
                                </Link>

                                {/* Logout */}
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

                                {/* Login */}
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5"
                                >
                                    <LogIn className="h-4 w-4" />
                                    Login
                                </Link>

                                {/* Register */}
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
            )}
        </nav>
    );
}

export default Navbar;

