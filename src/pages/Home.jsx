
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoBanner from "../components/PromoBanner";

function Home() {
    return (
        <main className="min-h-screen overflow-hidden bg-slate-100">

            {/* Hero */}
            <Hero />


            {/* Trust Section */}
            <section className="border-y border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-10 px-6 py-8 md:justify-between">

                    <div>
                        <p className="text-2xl font-bold text-slate-900">
                            10K+
                        </p>

                        <p className="text-sm text-slate-500">
                            Products
                        </p>
                    </div>

                    <div>
                        <p className="text-2xl font-bold text-slate-900">
                            5K+
                        </p>

                        <p className="text-sm text-slate-500">
                            Happy Customers
                        </p>
                    </div>

                    <div>
                        <p className="text-2xl font-bold text-slate-900">
                            1K+
                        </p>

                        <p className="text-sm text-slate-500">
                            Trusted Sellers
                        </p>
                    </div>

                    <div>
                        <p className="text-2xl font-bold text-slate-900">
                            4.9/5
                        </p>

                        <p className="text-sm text-slate-500">
                            Customer Rating
                        </p>
                    </div>

                </div>
            </section>


            {/* Categories */}
            <section className="mx-auto max-w-7xl px-6 py-20">

                <div className="mb-10 flex items-end justify-between">

                    <div>
                        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-violet-600">
                            Explore
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                            Shop by category
                        </h2>

                        <p className="mt-3 text-slate-500">
                            Find exactly what you're looking for.
                        </p>
                    </div>

                    <button className="hidden text-sm font-semibold text-violet-600 transition hover:text-indigo-600 md:block">
                        View all →
                    </button>

                </div>


                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    <CategoryCard
                        title="Fashion"
                        description="Style that speaks for you"
                        icon="✦"
                        gradient="from-violet-500 to-purple-700"
                    />

                    <CategoryCard
                        title="Electronics"
                        description="Technology for your world"
                        icon="⌁"
                        gradient="from-blue-500 to-indigo-700"
                    />

                    <CategoryCard
                        title="Home & Living"
                        description="Make your space yours"
                        icon="⌂"
                        gradient="from-cyan-500 to-blue-600"
                    />

                    <CategoryCard
                        title="Gaming"
                        description="Level up your experience"
                        icon="◈"
                        gradient="from-fuchsia-500 to-violet-700"
                    />

                </div>

            </section>


            {/* Featured Products */}
            <FeaturedProducts />


            {/* Promotional Banner */}
            <PromoBanner />

        </main>
    );
}

export default Home;

