
import { Link } from "react-router-dom";
import {
    ShoppingCart,
    ArrowRight
} from "lucide-react";

function AdminRecentOrders({ orders }) {
    if (!orders || orders.length === 0) {
        return (
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-slate-900">
                            Recent Orders
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Latest marketplace orders.
                        </p>
                    </div>

                    <ShoppingCart className="h-6 w-6 text-slate-300" />
                </div>

                <div className="flex h-40 items-center justify-center">
                    <p className="text-sm font-semibold text-slate-400">
                        No orders yet.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-slate-900">
                        Recent Orders
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Latest marketplace orders.
                    </p>
                </div>

                <Link
                    to="/admin/orders"
                    className="flex items-center gap-1 text-sm font-bold text-violet-600 transition hover:text-violet-700"
                >
                    View All
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="mt-6 space-y-3">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:border-violet-100 hover:bg-violet-50/40"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
                                <ShoppingCart className="h-5 w-5 text-violet-600" />
                            </div>

                            <div>
                                <p className="font-black text-slate-900">
                                    Order #{order.id}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="font-black text-slate-900">
                                $
                                {Number(
                                    order.total_amount || 0
                                ).toLocaleString()}
                            </p>

                            <span
                                className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-bold capitalize ${
                                    order.status === "pending"
                                        ? "bg-amber-50 text-amber-600"
                                        : order.status === "completed"
                                        ? "bg-emerald-50 text-emerald-600"
                                        : order.status === "cancelled"
                                        ? "bg-red-50 text-red-600"
                                        : "bg-slate-100 text-slate-600"
                                }`}
                            >
                                {order.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminRecentOrders;

