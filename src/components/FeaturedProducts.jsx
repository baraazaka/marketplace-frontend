

import { ArrowUpRight } from "lucide-react";

function FeaturedProducts() {
    const products = [
        {
            id: 1,
            name: "Premium Collection",
            category: "Featured",
            price: "$129",
            gradient: "from-violet-400 to-indigo-600"
        },
        {
            id: 2,
            name: "Modern Essentials",
            category: "Trending",
            price: "$89",
            gradient: "from-blue-400 to-cyan-600"
        },
        {
            id: 3,
            name: "Limited Edition",
            category: "Exclusive",
            price: "$199",
            gradient: "from-fuchsia-400 to-violet-600"
        },
        {
            id: 4,
            name: "Daily Essentials",
            category: "Popular",
            price: "$59",
            gradient: "from-indigo-400 to-purple-600"
        }
    ];

    return (
        <section className="bg-white py-20">

            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-10 flex items-end justify-between">

                    <div>
                        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-violet-600">
                            Trending
                        </p>

                        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                            Popular right now
                        </h2>
                    </div>

                    <button className="hidden items-center gap-2 text-sm font-semibold text-violet-600 md:flex">
                        View all
                        <ArrowUpRight className="h-4 w-4" />
                    </button>

                </div>


                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >

                            <div
                                className={`relative h-64 bg-gradient-to-br ${product.gradient}`}
                            >

                                <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                                    {product.category}
                                </span>

                                <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/40">
                                    ♡
                                </button>

                                <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-90 transition duration-500 group-hover:scale-110">
                                    ✦
                                </div>

                            </div>


                            <div className="p-5">

                                <h3 className="font-bold text-slate-900">
                                    {product.name}
                                </h3>

                                <div className="mt-4 flex items-center justify-between">

                                    <span className="text-xl font-bold text-violet-600">
                                        {product.price}
                                    </span>

                                    <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-600">
                                        View
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}

export default FeaturedProducts;
