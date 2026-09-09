
import { Link } from "react-router-dom";

function NavbarLogo({ closeMenu }) {
    return (
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
    );
}

export default NavbarLogo;

