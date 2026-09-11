
import { useEffect, useState } from "react";
import {
    Package,
    ShoppingBag,
    Clock,
    ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

import { getSellerOrders } from "../services/api";

function SellerOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadOrders() {
            try {
                setLoading(true);
                setError("");

                const data = await getSellerOrders();

                setOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadOrders();
    }, []);

    function formatDate(date) {
        return new Date(date).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        );
    }

    function getStatusStyle(status) {
        switch (status) {
            case "pending":
                return "bg-amber-50 text-amber-600";

            case "processing":
                return "bg-blue-50 text-blue-600";

            case "shipped":
                return "bg-violet-50 text-violet-600";

            case "delivered":
                return "bg-green-50 text-green-600";

            case "cancelled":
                return "bg-red-50 text-red-600";

            default:
                return "bg-slate-100 text-slate-600";
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-12">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                        Seller
                    </p>

                    <h1 className="mt-2 text-4xl font-black text-slate-900">
                        Orders
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Manage orders containing your products.
                    </p>
                </div>


                {/* Loading */}
                {loading && (
                    <div className="mt-8 rounded-3xl bg-white p-16 text-center shadow-sm ring-1 ring-slate-200">
                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

                        <p className="mt-4 text-sm font-medium text-slate-500">
                            Loading orders...
                        </p>
                    </div>
                )}


                {/* Error */}
                {!loading && error && (
                    <div className="mt-8 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
                        {error}
                    </div>
                )}


                {/* Empty */}
                {!loading &&
                    !error &&
                    orders.length === 0 && (
                        <div className="mt-8 rounded-3xl bg-white p-16 text-center shadow-sm ring-1 ring-slate-200">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50">
                                <ShoppingBag className="h-8 w-8 text-violet-600" />
                            </div>

                            <h2 className="mt-5 text-xl font-black text-slate-900">
                                No orders yet
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Orders containing your products will appear here.
                            </p>

                        </div>
                    )}


                {/* Orders */}
                {!loading &&
                    !error &&
                    orders.length > 0 && (
                        <div className="mt-8 space-y-5">

                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
                                >

                                    {/* Top */}
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        <div className="flex items-center gap-4">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
                                                <Package className="h-6 w-6 text-violet-600" />
                                            </div>

                                            <div>
                                                <h2 className="font-black text-slate-900">
                                                    Order #{order.id}
                                                </h2>

                                                <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                                                    <Clock className="h-4 w-4" />

                                                    {formatDate(
                                                        order.created_at
                                                    )}
                                                </div>
                                            </div>

                                        </div>


                                        {/* Status */}
                                        <span
                                            className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-black capitalize ${getStatusStyle(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>

                                    </div>


                                    {/* Divider */}
                                    <div className="my-5 h-px bg-slate-100" />


                                    {/* Info */}
                                    <div className="grid gap-5 sm:grid-cols-3">

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                                Your Items
                                            </p>

                                            <p className="mt-1 text-lg font-black text-slate-900">
                                                {order.items?.length || 0}
                                            </p>
                                        </div>


                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                                Order Total
                                            </p>

                                            <p className="mt-1 text-lg font-black text-violet-600">
                                                ${Number(
                                                    order.total_amount || 0
                                                ).toFixed(2)}
                                            </p>
                                        </div>


                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                                Customer
                                            </p>

                                            <p className="mt-1 text-sm font-bold text-slate-700">
                                                {order.user_id}
                                            </p>
                                        </div>

                                    </div>


                                    {/* Items Preview */}
                                    {order.items?.length > 0 && (
                                        <div className="mt-5 space-y-3">

                                            {order.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center gap-4 rounded-2xl bg-slate-50 p-3"
                                                >

                                                    {item.products?.image_url ? (
                                                        <img
                                                            src={
                                                                item.products.image_url
                                                            }
                                                            alt={
                                                                item.products.name
                                                            }
                                                            className="h-14 w-14 rounded-xl object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-200">
                                                            <Package className="h-6 w-6 text-slate-400" />
                                                        </div>
                                                    )}


                                                    <div className="min-w-0 flex-1">

                                                        <p className="truncate text-sm font-black text-slate-900">
                                                            {item.products?.name ||
                                                                "Product"}
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-500">
                                                            Quantity:{" "}
                                                            {item.quantity}
                                                        </p>

                                                    </div>


                                                    <p className="text-sm font-black text-slate-900">
                                                        $
                                                        {Number(
                                                            item.price_at_purchase || 0
                                                        ).toFixed(2)}
                                                    </p>

                                                </div>
                                            ))}

                                        </div>
                                    )}


                                    {/* Details */}
                                    <div className="mt-5 flex justify-end">

                                        <Link
                                            to={`/seller/orders/${order.id}`}
                                            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
                                        >
                                            View Details

                                            <ChevronRight className="h-4 w-4" />
                                        </Link>

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

            </div>
        </main>
    );
}

export default SellerOrdersPage;

