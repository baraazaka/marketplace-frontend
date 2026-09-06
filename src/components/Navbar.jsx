
function Navbar() {
    return (
        <nav className="border-b border-indigo-900/20 bg-slate-950 text-white">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <a href="#" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-bold shadow-lg shadow-indigo-500/20">
                        M
                    </div>

                    <span className="text-xl font-bold tracking-tight">
                        Marketplace
                    </span>
                </a>


                {/* Navigation */}
                <div className="hidden items-center gap-8 md:flex">

                    <a
                        href="#"
                        className="text-sm font-medium text-slate-300 transition hover:text-white"
                    >
                        Home
                    </a>

                    <a
                        href="#"
                        className="text-sm font-medium text-slate-300 transition hover:text-white"
                    >
                        Products
                    </a>

                    <a
                        href="#"
                        className="text-sm font-medium text-slate-300 transition hover:text-white"
                    >
                        Categories
                    </a>

                    <a
                        href="#"
                        className="text-sm font-medium text-slate-300 transition hover:text-white"
                    >
                        About
                    </a>

                </div>


                {/* Actions */}
                <div className="flex items-center gap-3">

                    {/* Cart */}
                    <button
                        className="relative rounded-xl p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                        aria-label="Shopping cart"
                    >
                        <span className="text-xl">🛒</span>

                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-xs font-bold text-white">
                            0
                        </span>
                    </button>


                    {/* Login */}
                    <a
                        href="#"
                        className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-white/5"
                    >
                        Login
                    </a>


                    {/* Register */}
                    <a
                        href="#"
                        className="rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:from-violet-600 hover:to-indigo-700"
                    >
                        Register
                    </a>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;

