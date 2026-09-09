
import {
    Home,
    Package,
    Grid2X2,
    Info,
    ClipboardList
} from "lucide-react";

import { Link } from "react-router-dom";

function NavbarLinks() {
    return (
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
                to="/orders"
                className="group flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
            >
                <ClipboardList className="h-4 w-4 transition group-hover:text-violet-400" />
                Orders
            </Link>

            <Link
                to="/about"
                className="group flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
            >
                <Info className="h-4 w-4 transition group-hover:text-violet-400" />
                About
            </Link>

        </div>
    );
}

export default NavbarLinks;

