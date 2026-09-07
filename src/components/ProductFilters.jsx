
import {
    Search,
    SlidersHorizontal
} from "lucide-react";


function ProductFilters({
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort
}) {

    return (

        <div className="mb-10 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                {/* Search */}

                <div className="relative flex-1">

                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                    />

                </div>


                {/* Category */}

                <div className="relative">

                    <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 lg:w-48"
                    >
                        <option value="all">
                            All Categories
                        </option>

                        <option value="fashion">
                            Fashion
                        </option>

                        <option value="electronics">
                            Electronics
                        </option>

                        <option value="gaming">
                            Gaming
                        </option>

                        <option value="home">
                            Home & Living
                        </option>

                    </select>

                </div>


                {/* Sort */}

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 lg:w-48"
                >

                    <option value="default">
                        Sort: Default
                    </option>

                    <option value="price-low">
                        Price: Low to High
                    </option>

                    <option value="price-high">
                        Price: High to Low
                    </option>

                    <option value="name">
                        Name: A to Z
                    </option>

                </select>

            </div>

        </div>

    );
}


export default ProductFilters;

