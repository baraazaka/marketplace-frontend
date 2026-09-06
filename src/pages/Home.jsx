
function Home() {
    return (
        <main className="min-h-[calc(100vh-5rem)] bg-slate-100">
            <section className="mx-auto max-w-7xl px-6 py-20">

                <div className="max-w-3xl">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-600">
                        Welcome to Marketplace
                    </p>

                    <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900">
                        Find products
                        <span className="text-violet-600"> you love.</span>
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-slate-500">
                        Discover great products from trusted sellers
                        and find everything you need in one place.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <button className="rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:from-violet-600 hover:to-indigo-700">
                            Explore Products
                        </button>

                        <button className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
                            Learn More
                        </button>
                    </div>
                </div>

            </section>
        </main>
    );
}

export default Home;

