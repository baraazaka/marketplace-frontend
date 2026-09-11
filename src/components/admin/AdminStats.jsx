
import {
    Users,
    Store,
    Package,
    ShoppingCart,
    DollarSign
} from "lucide-react";

function AdminStats({ stats, loading }) {

    const statCards = [
        {
            title: "Total Users",
            value: stats.usersCount,
            icon: Users
        },
        {
            title: "Total Sellers",
            value: stats.sellersCount,
            icon: Store
        },
        {
            title: "Total Products",
            value: stats.productsCount,
            icon: Package
        },
        {
            title: "Total Orders",
            value: stats.ordersCount,
            icon: ShoppingCart
        },
        {
            title: "Total Revenue",
            value: `$${Number(
                stats.totalRevenue
            ).toLocaleString()}`,
            icon: DollarSign
        }
    ];

    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

            {statCards.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.title}
                        className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
                    >

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
                            <Icon className="h-6 w-6 text-violet-600" />
                        </div>

                        <p className="mt-5 text-sm font-semibold text-slate-500">
                            {stat.title}
                        </p>

                        <p className="mt-1 text-3xl font-black text-slate-900">

                            {loading ? (
                                <span className="inline-block h-9 w-20 animate-pulse rounded-lg bg-slate-200" />
                            ) : (
                                stat.value
                            )}

                        </p>

                    </div>
                );
            })}

        </div>
    );
}

export default AdminStats;

