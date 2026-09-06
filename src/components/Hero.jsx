
import {
    ArrowRight,
    ShoppingBag,
    Sparkles,
    Star
} from "lucide-react";

function Hero() {
    return (
        <section className="relative isolate overflow-hidden bg-slate-950">

            {/* Background glow */}
            <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />

            <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />

            <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-600/20 blur-3xl" />


            {/* Decorative grid */}
            <div className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "50px 50px"
                }}
            />


            <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">

                {/* Left */}
                <div className="max-w-2xl">

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur">
                        <Sparkles className="h-4 w-4 text-violet-400" />

                        <span>
                            The marketplace made for you
                        </span>
                    </div>


                    <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">

                        Discover.

                        <br />

                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                            Choose.
                        </span>

                        <br />

                        Love it.

                    </h1>


                    <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
                        Explore thousands of products from trusted sellers.
                        Everything you want, all in one place.
                    </p>


                    <div className="mt-9 flex flex-wrap gap-4">

                        <button className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-7 py-4 font-semibold text-white shadow-xl shadow-violet-900/30 transition duration-300 hover:-translate-y-1 hover:shadow-violet-900/50">

                            Explore Products

                            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />

                        </button>


                        <button className="rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10">

                            Become a Seller

                        </button>

                    </div>


                    {/* Rating */}
                    <div className="mt-9 flex items-center gap-4">

                        <div className="flex">

                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                            ))}

                        </div>

                        <span className="text-sm text-slate-400">
                            4.9 from 2,000+ reviews
                        </span>

                    </div>

                </div>


                {/* Right visual */}
                <div className="relative hidden h-[520px] lg:block">

                    {/* Main circle */}
                    <div className="absolute left-1/2 top-1/2 flex h-80 w-80 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/10 ring-1 ring-white/10 backdrop-blur">

                        <div className="flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-700 shadow-2xl shadow-violet-900/50">

                            <ShoppingBag className="h-24 w-24 text-white" />

                        </div>

                    </div>


                    {/* Floating card 1 */}
                    <div className="absolute right-0 top-20 w-52 rounded-2xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">

                        <div className="mb-3 h-28 rounded-xl bg-gradient-to-br from-fuchsia-400 to-violet-600" />

                        <p className="font-semibold text-white">
                            Trending Item
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Discover something new
                        </p>

                    </div>


                    {/* Floating card 2 */}
                    <div className="absolute bottom-20 left-0 w-56 rounded-2xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">

                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
                                <ShoppingBag className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-white">
                                    New order
                                </p>

                                <p className="text-xs text-emerald-400">
                                    Just now
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* Floating badge */}
                    <div className="absolute bottom-8 right-10 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-xl">

                        ✦ 10,000+ products

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;

