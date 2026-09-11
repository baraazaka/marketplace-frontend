
import {
    TrendingUp
} from "lucide-react";

function AdminSalesOverview({
    analytics,
    loading
}) {
    return (
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

            {/* Header */}
            <div className="flex items-center gap-2">

                <TrendingUp className="h-5 w-5 text-violet-600" />

                <h2 className="text-2xl font-black text-slate-900">
                    Sales Overview
                </h2>

            </div>

            <p className="mt-1 text-sm text-slate-500">
                Marketplace revenue by month.
            </p>


            {/* Loading */}
            {loading ? (

                <div className="flex h-[280px] items-center justify-center">

                    <div className="h-9 w-9 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

                </div>

            ) : analytics.salesByMonth.length === 0 ? (

                /* Empty State */
                <div className="flex h-[280px] flex-col items-center justify-center text-center">

                    <TrendingUp className="h-10 w-10 text-slate-300" />

                    <p className="mt-3 font-bold text-slate-700">
                        No sales data yet
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Sales will appear here once orders are created.
                    </p>

                </div>

            ) : (

                /* Chart */
                <div className="mt-8 flex h-[280px] items-end gap-6 overflow-x-auto border-b border-slate-200 px-4 pb-8">

                    {analytics.salesByMonth.map((item) => {

                        const maxSales = Math.max(
                            ...analytics.salesByMonth.map(
                                (month) =>
                                    Number(month.sales) || 0
                            ),
                            1
                        );

                        const sales =
                            Number(item.sales) || 0;

                        const barHeight =
                            Math.max(
                                (sales / maxSales) * 200,
                                20
                            );

                        return (
                            <div
                                key={item.month}
                                className="flex min-w-[80px] flex-1 flex-col items-center justify-end"
                            >

                                <span className="mb-2 text-xs font-bold text-slate-600">
                                    ${sales.toFixed(0)}
                                </span>

                                <div
                                    className="w-12 rounded-t-xl bg-violet-500 transition-all duration-500 hover:bg-violet-600"
                                    style={{
                                        height: `${barHeight}px`
                                    }}
                                />

                                <span className="mt-3 text-xs font-bold text-slate-400">
                                    {item.month}
                                </span>

                            </div>
                        );
                    })}

                </div>

            )}

        </div>
    );
}

export default AdminSalesOverview;

