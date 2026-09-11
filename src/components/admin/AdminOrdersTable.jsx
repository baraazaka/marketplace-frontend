
import {
    ShoppingCart,
    Eye
} from "lucide-react";

function AdminOrdersTable({
    orders,
    onManage
}) {
    function getStatusStyle(status) {
        switch (status) {
            case "pending":
                return "bg-amber-50 text-amber-600";

            case "processing":
                return "bg-blue-50 text-blue-600";

            case "shipped":
                return "bg-indigo-50 text-indigo-600";

            case "completed":
                return "bg-emerald-50 text-emerald-600";

            case "cancelled":
                return "bg-red-50 text-red-600";

            default:
                return "bg-slate-100 text-slate-600";
        }
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-12 text-center">
                <ShoppingCart className="mx-auto h-10 w-10 text-slate-300" />

                <h3 className="mt-4 font-black text-slate-900">
                    No orders found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or filter.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[850px]">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50">
                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                Order
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                Customer
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                Items
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                Total
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                Status
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                Date
                            </th>

                            <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-500">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => {
                            const itemsCount =
                                order.order_items?.reduce(
                                    (total, item) =>
                                        total +
                                        Number(
                                            item.quantity || 0
                                        ),
                                    0
                                ) || 0;

                            return (
                                <tr
                                    key={order.id}
                                    className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50"
                                >
                                    {/* Order */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
                                                <ShoppingCart className="h-5 w-5 text-violet-600" />
                                            </div>

                                            <div>
                                                <p className="font-black text-slate-900">
                                                    #{order.id}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    Order ID
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Customer */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {order.profiles?.avatar_url ? (
                                                <img
                                                    src={
                                                        order
                                                            .profiles
                                                            .avatar_url
                                                    }
                                                    alt={
                                                        order
                                                            .profiles
                                                            .full_name ||
                                                        "Customer"
                                                    }
                                                    className="h-10 w-10 rounded-xl object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                                                    <span className="text-sm font-black text-slate-500">
                                                        {(
                                                            order
                                                                .profiles
                                                                ?.full_name ||
                                                            "U"
                                                        )
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                </div>
                                            )}

                                            <div>
                                                <p className="max-w-[160px] truncate font-bold text-slate-900">
                                                    {order
                                                        .profiles
                                                        ?.full_name ||
                                                        "Unknown User"}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    Customer
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Items */}
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-slate-700">
                                            {itemsCount}
                                        </span>

                                        <span className="ml-1 text-sm text-slate-400">
                                            {itemsCount === 1
                                                ? "item"
                                                : "items"}
                                        </span>
                                    </td>

                                    {/* Total */}
                                    <td className="px-6 py-4">
                                        <p className="font-black text-slate-900">
                                            $
                                            {Number(
                                                order.total_amount || 0
                                            ).toLocaleString()}
                                        </p>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusStyle(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    {/* Date */}
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        {new Date(
                                            order.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                    {/* Action */}
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onManage(order)
                                            }
                                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                                        >
                                            <Eye className="h-4 w-4" />
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminOrdersTable;

