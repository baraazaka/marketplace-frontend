
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Package,
    MapPin,
    CalendarDays,
    Check
} from "lucide-react";

import {
    getSellerOrderById,
    updateSellerOrderStatus
} from "../services/api";

function SellerOrderDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedStatus, setSelectedStatus] = useState("");
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        async function loadOrder() {
            try {
                setLoading(true);
                setError("");

                const data = await getSellerOrderById(id);

                setOrder(data);
                setSelectedStatus(data.status);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadOrder();
    }, [id]);

    function formatDate(date) {
        return new Date(date).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "long",
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

    async function handleStatusUpdate() {
        if (!order || selectedStatus === order.status) {
            return;
        }

        try {
            setUpdatingStatus(true);
            setStatusMessage("");

            const data = await updateSellerOrderStatus(
                order.id,
                selectedStatus
            );

            setOrder((current) => ({
                ...current,
                status: data.order.status
            }));

            setStatusMessage(
                "Order status updated successfully."
            );
        } catch (error) {
            setStatusMessage(error.message);
        } finally {
            setUpdatingStatus(false);
        }
    }

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-100">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading order...
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-slate-100 px-6 py-12">
                <div className="mx-auto max-w-4xl">

                    <button
                        type="button"
                        onClick={() => navigate("/seller/orders")}
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-violet-600"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Orders
                    </button>

                    <div className="mt-8 rounded-3xl bg-red-50 p-8 text-center">
                        <h1 className="text-xl font-black text-red-600">
                            Unable to load order
                        </h1>

                        <p className="mt-2 text-sm text-red-500">
                            {error}
                        </p>
                    </div>

                </div>
            </main>
        );
    }

    if (!order) {
        return null;
    }

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-12">
            <div className="mx-auto max-w-5xl">

                {/* Back */}
                <button
                    type="button"
                    onClick={() => navigate("/seller/orders")}
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-violet-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Orders
                </button>


                {/* Header */}
                <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                                Seller Order
                            </p>

                            <h1 className="mt-2 text-3xl font-black text-slate-900">
                                Order #{order.id}
                            </h1>

                            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                                <CalendarDays className="h-4 w-4" />

                                {formatDate(order.created_at)}
                            </div>
                        </div>


                        <span
                            className={`w-fit rounded-full px-4 py-2 text-sm font-black capitalize ${getStatusStyle(
                                order.status
                            )}`}
                        >
                            {order.status}
                        </span>

                    </div>

                </div>


                {/* Status Management */}
                <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                            Order Management
                        </p>

                        <h2 className="mt-2 text-2xl font-black text-slate-900">
                            Update Order Status
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Change the current status of this order.
                        </p>
                    </div>


                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">

                        <div className="flex-1">
                            <label
                                htmlFor="order-status"
                                className="mb-2 block text-sm font-bold text-slate-700"
                            >
                                Status
                            </label>

                            <select
                                id="order-status"
                                value={selectedStatus}
                                onChange={(event) => {
                                    setSelectedStatus(event.target.value);
                                    setStatusMessage("");
                                }}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                            >
                                <option value="pending">
                                    Pending
                                </option>

                                <option value="processing">
                                    Processing
                                </option>

                                <option value="shipped">
                                    Shipped
                                </option>

                                <option value="delivered">
                                    Delivered
                                </option>

                                <option value="cancelled">
                                    Cancelled
                                </option>
                            </select>
                        </div>


                        <button
                            type="button"
                            onClick={handleStatusUpdate}
                            disabled={
                                updatingStatus ||
                                selectedStatus === order.status
                            }
                            className="inline-flex h-[46px] items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-black text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            {updatingStatus ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Check className="h-4 w-4" />
                                    Update Status
                                </>
                            )}
                        </button>

                    </div>


                    {statusMessage && (
                        <div
                            className={`mt-4 rounded-xl px-4 py-3 text-sm font-bold ${
                                statusMessage.includes("successfully")
                                    ? "bg-green-50 text-green-600"
                                    : "bg-red-50 text-red-600"
                            }`}
                        >
                            {statusMessage}
                        </div>
                    )}

                </div>


                {/* Order Items */}
                <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
                            <Package className="h-5 w-5 text-violet-600" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-black text-slate-900">
                                Your Products
                            </h2>

                            <p className="text-sm text-slate-500">
                                Products from your store in this order.
                            </p>
                        </div>
                    </div>


                    <div className="mt-6 space-y-4">

                        {order.items?.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center"
                            >

                                {/* Image */}
                                {item.products?.image_url ? (
                                    <img
                                        src={item.products.image_url}
                                        alt={item.products.name}
                                        className="h-20 w-20 rounded-2xl object-cover"
                                    />
                                ) : (
                                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100">
                                        <Package className="h-8 w-8 text-slate-300" />
                                    </div>
                                )}


                                {/* Product Info */}
                                <div className="min-w-0 flex-1">

                                    <h3 className="font-black text-slate-900">
                                        {item.products?.name || "Product"}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Quantity: {item.quantity}
                                    </p>

                                </div>


                                {/* Price */}
                                <div className="sm:text-right">

                                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                        Price
                                    </p>

                                    <p className="mt-1 text-lg font-black text-violet-600">
                                        ${Number(
                                            item.price_at_purchase || 0
                                        ).toFixed(2)}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>


                {/* Shipping */}
                <div className="mt-6 grid gap-6 md:grid-cols-2">

                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
                                <MapPin className="h-5 w-5 text-violet-600" />
                            </div>

                            <h2 className="text-xl font-black text-slate-900">
                                Shipping Address
                            </h2>
                        </div>

                        <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                            {order.shipping_address || "No shipping address"}
                        </p>

                    </div>


                    {/* Summary */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                        <h2 className="text-xl font-black text-slate-900">
                            Order Summary
                        </h2>

                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
                            <span className="font-bold text-slate-500">
                                Order Total
                            </span>

                            <span className="text-2xl font-black text-violet-600">
                                ${Number(
                                    order.total_amount || 0
                                ).toFixed(2)}
                            </span>
                        </div>

                    </div>

                </div>

            </div>
        </main>
    );
}

export default SellerOrderDetailsPage;


