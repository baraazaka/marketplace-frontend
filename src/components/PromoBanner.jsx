import { ArrowRight, Sparkles } from "lucide-react";

function PromoBanner() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-20">

            <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-16 md:px-16">

                <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-violet-600/30 blur-3xl" />

                <div className="absolute -bottom-20 left-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />

                <div className="relative max-w-2xl">

                    <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-400">
                        <Sparkles className="h-4 w-4" />
                        Special offer
                    </div>

                    <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                        Something amazing
                        <span className="text-violet-400">
                            {" "}is waiting.
                        </span>
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-slate-400">
                        Discover exclusive products and special offers
                        available for a limited time.
                    </p>

                    <button className="group mt-8 flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-violet-50">

                        Start Shopping

                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />

                    </button>

                </div>

            </div>

        </section>
    );
}

export default PromoBanner;

