
function Navbar() {
    return (
        <nav className="border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <h1 className="text-2xl font-bold">
                    Marketplace
                </h1>

                {/* Navigation */}
                <div className="flex items-center gap-6">
                    <a
                        href="#"
                        className="text-gray-700 hover:text-black"
                    >
                        Products
                    </a>

                    <a
                        href="#"
                        className="text-gray-700 hover:text-black"
                    >
                        Cart
                    </a>

                    <a
                        href="#"
                        className="text-gray-700 hover:text-black"
                    >
                        Login
                    </a>

                    <a
                        href="#"
                        className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
                    >
                        Register
                    </a>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;

