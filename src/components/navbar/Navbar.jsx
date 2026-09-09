
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
    getMyCartItems,
    getMyWishlistItems
} from "../../services/api";

import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarActions from "./NavbarActions";
import MobileMenu from "./MobileMenu";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);

    const { isAuthenticated, logout } = useAuth();

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    function handleLogout() {
        logout();

        setCartCount(0);
        setWishlistCount(0);

        closeMenu();
    }

    async function loadCartCount() {
        if (!isAuthenticated) {
            setCartCount(0);
            return;
        }

        try {
            const items = await getMyCartItems();

            const totalQuantity = items.reduce(
                (total, item) => total + item.quantity,
                0
            );

            setCartCount(totalQuantity);
        } catch (error) {
            setCartCount(0);
        }
    }

    async function loadWishlistCount() {
        if (!isAuthenticated) {
            setWishlistCount(0);
            return;
        }

        try {
            const items = await getMyWishlistItems();

            setWishlistCount(items.length);
        } catch (error) {
            setWishlistCount(0);
        }
    }

    useEffect(() => {
        loadCartCount();
        loadWishlistCount();

        function handleCartUpdated() {
            loadCartCount();
        }

        function handleWishlistUpdated() {
            loadWishlistCount();
        }

        window.addEventListener(
            "cartUpdated",
            handleCartUpdated
        );

        window.addEventListener(
            "wishlistUpdated",
            handleWishlistUpdated
        );

        return () => {
            window.removeEventListener(
                "cartUpdated",
                handleCartUpdated
            );

            window.removeEventListener(
                "wishlistUpdated",
                handleWishlistUpdated
            );
        };
    }, [isAuthenticated]);

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white shadow-lg backdrop-blur-xl">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <NavbarLogo closeMenu={closeMenu} />

                {/* Desktop Navigation */}
                <NavbarLinks />

                {/* Desktop Actions */}
                <NavbarActions
                    isAuthenticated={isAuthenticated}
                    logout={logout}
                    cartCount={cartCount}
                    wishlistCount={wishlistCount}
                    handleLogout={handleLogout}
                />

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() =>
                        setIsMenuOpen(!isMenuOpen)
                    }
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
            <MobileMenu
                isMenuOpen={isMenuOpen}
                closeMenu={closeMenu}
                isAuthenticated={isAuthenticated}
                cartCount={cartCount}
                wishlistCount={wishlistCount}
                handleLogout={handleLogout}
            />
        </nav>
    );
}

export default Navbar;

