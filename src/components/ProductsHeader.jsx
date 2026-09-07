
import { Package, Sparkles } from "lucide-react";


function ProductsHeader({ productsCount }) {

    return (

        <div className="mb-10">

            {/* Small Label */}

            <div className="mb-4 flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
                    <Sparkles className="h-4 w-4 text-violet-600" />
                </div>

                <span className="text-sm font-bold uppercase tracking-widest text-violet-600">
                    Marketplace
                </span>

            </div>


            {/* Title */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>

                    <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                        Discover Products
                    </h1>

                    <p className="mt-3 max-w-xl text-slate-500">
                        Explore our collection and find something you'll love.
                    </p>

                </div>


                {/* Products Count */}

                <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">
                        <Package className="h-5 w-5 text-white" />
                    </div>

                    <div>

                        <p className="text-lg font-black text-slate-900">
                            {productsCount}
                        </p>

                        <p className="text-xs text-slate-500">
                            Products
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );
}


export default ProductsHeader;

