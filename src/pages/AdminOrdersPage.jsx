import { useEffect, useMemo, useState } from "react";

import {
    ShoppingCart,
    ShieldCheck,
    X,
    MapPin,
    Package,
    Loader2,
    Save
} from "lucide-react";

import {
    getAdminOrders,
    updateAdminOrderStatus
} from "../services/api";

import AdminOrdersFilters from "../components/admin/AdminOrdersFilters";
import AdminOrdersTable from "../components/admin/AdminOrdersTable";

function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const [selectedOrder, setSelectedOrder] =
        useState(null);

    const [selectedStatus, setSelectedStatus] =
        useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [modalError, setModalError] =
        useState("");

    useEffect(() => {
        async function loadOrders() {
            try {
                setLoading(true);
                setError("");

                const data =
                    await getAdminOrders();

                setOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadOrders();
    }, []);

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const customerName =
                order.profiles?.full_name ||
                "";

            const searchValue =
                search.toLowerCase().trim();

            const matchesSearch =
                String(order.id)
                    .includes(searchValue) ||
                customerName
                    .toLowerCase()
                    .includes(searchValue);

            const matchesStatus =
                status === "all" ||
                order.status === status;

            return (
                matchesSearch &&
                matchesStatus
            );
        });
    }, [orders, search, status]);

    function handleManage(order) {
        setSelectedOrder(order);
        setSelectedStatus(order.status);
        setModalError("");
    }

    function closeManage() {
        if (saving) return;

        setSelectedOrder(null);
        setSelectedStatus("");
        setModalError("");
    }

    async function handleSaveStatus() {
        if (!selectedOrder) return;

        try {
            setSaving(true);
            setModalError("");

            const updatedOrder =
                await updateAdminOrderStatus(
                    selectedOrder.id,
                    selectedStatus
                );

            setOrders((currentOrders) =>
                currentOrders.map((order) =>
                    order.id === updatedOrder.id
                        ? {
                              ...order,
                              status:
                                  updatedOrder.status,
                              updated_at:
                                  updatedOrder.updated_at
                          }
                        : order
                )
            );

            setSelectedOrder((currentOrder) =>
                currentOrder
                    ? {
                          ...currentOrder,
                          status:
                              updatedOrder.status,
                          updated_at:
                              updatedOrder.updated_at
                      }
                    : currentOrder
            );

        } catch (error) {
            setModalError(error.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
                            <ShieldCheck className="h-6 w-6 text-violet-600" />
                        </div>

                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                                Administration
                            </p>

                            <h1 className="mt-1 text-4xl font-black text-slate-900">
                                Orders Management
                            </h1>
                        </div>
                    </div>

                    <p className="mt-3 text-slate-500">
                        Manage and monitor all marketplace orders.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                        {error}
                    </div>
                )}

                {/* Orders Card */}
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5 text-violet-600" />

                                <h2 className="text-xl font-black text-slate-900">
                                    All Orders
                                </h2>
                            </div>

                            <p className="mt-1 text-sm text-slate-500">
                                {filteredOrders.length} orders found
                            </p>
                        </div>
                    </div>

                    <AdminOrdersFilters
                        search={search}
                        setSearch={setSearch}
                        status={status}
                        setStatus={setStatus}
                    />

                    {loading ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-9 w-9 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
                        </div>
                    ) : (
                        <AdminOrdersTable
                            orders={filteredOrders}
                            onManage={handleManage}
                        />
                    )}
                </div>
            </div>

            {/* Manage Order Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm">

                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white p-6 md:p-8">

                            <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                                    Order Management
                                </p>

                                <h2 className="mt-2 text-2xl font-black text-slate-900">
                                    Order #{selectedOrder.id}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Review order details and update its status.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeManage}
                                disabled={saving}
                                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-6 md:p-8">

                            {/* Customer */}
                            <div className="rounded-2xl bg-slate-50 p-5">
                                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                                    Customer
                                </p>

                                <div className="mt-3 flex items-center gap-3">
                                    {selectedOrder.profiles?.avatar_url ? (
                                        <img
                                            src={
                                                selectedOrder
                                                    .profiles
                                                    .avatar_url
                                            }
                                            alt={
                                                selectedOrder
                                                    .profiles
                                                    .full_name ||
                                                "Customer"
                                            }
                                            className="h-11 w-11 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
                                            <span className="font-black text-violet-600">
                                                {(
                                                    selectedOrder
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
                                        <p className="font-black text-slate-900">
                                            {selectedOrder
                                                .profiles
                                                ?.full_name ||
                                                "Unknown User"}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            User ID:{" "}
                                            {selectedOrder.user_id}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="mt-5 rounded-2xl border border-slate-200 p-5">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-violet-600" />

                                    <h3 className="font-black text-slate-900">
                                        Shipping Address
                                    </h3>
                                </div>

                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {selectedOrder.shipping_address ||
                                        "No shipping address provided."}
                                </p>
                            </div>

                            {/* Order Items */}
                            <div className="mt-5">
                                <div className="flex items-center gap-2">
                                    <Package className="h-5 w-5 text-violet-600" />

                                    <h3 className="font-black text-slate-900">
                                        Order Items
                                    </h3>
                                </div>

                                <div className="mt-4 space-y-3">
                                    {selectedOrder.order_items?.map(
                                        (item) => {
                                            const subtotal =
                                                Number(
                                                    item.price_at_purchase ||
                                                        0
                                                ) *
                                                Number(
                                                    item.quantity ||
                                                        0
                                                );

                                            return (
                                                <div
                                                    key={
                                                        item.id
                                                    }
                                                    className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4"
                                                >
                                                    {item.products
                                                        ?.image_url ? (
                                                        <img
                                                            src={
                                                                item
                                                                    .products
                                                                    .image_url
                                                            }
                                                            alt={
                                                                item
                                                                    .products
                                                                    ?.name ||
                                                                "Product"
                                                            }
                                                            className="h-16 w-16 rounded-xl object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                                                            <Package className="h-6 w-6 text-slate-400" />
                                                        </div>
                                                    )}

                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate font-black text-slate-900">
                                                            {item
                                                                .products
                                                                ?.name ||
                                                                "Unknown Product"}
                                                        </p>

                                                        <p className="mt-1 text-sm text-slate-500">
                                                            $
                                                            {Number(
                                                                item.price_at_purchase ||
                                                                    0
                                                            ).toFixed(
                                                                2
                                                            )}{" "}
                                                            ×{" "}
                                                            {
                                                                item.quantity
                                                            }
                                                        </p>
                                                    </div>

                                                    <p className="font-black text-slate-900">
                                                        $
                                                        {subtotal.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                            {/* Total */}
                            <div className="mt-5 flex items-center justify-between rounded-2xl bg-violet-50 p-5">
                                <span className="font-bold text-violet-700">
                                    Order Total
                                </span>

                                <span className="text-2xl font-black text-violet-700">
                                    $
                                    {Number(
                                        selectedOrder.total_amount ||
                                            0
                                    ).toLocaleString(
                                        undefined,
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }
                                    )}
                                </span>
                            </div>

                            {/* Status */}
                            <div className="mt-6">
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Order Status
                                </label>

                                <select
                                    value={
                                        selectedStatus
                                    }
                                    onChange={(e) =>
                                        setSelectedStatus(
                                            e.target.value
                                        )
                                    }
                                    disabled={saving}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold capitalize text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:bg-slate-100"
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

                                    <option value="completed">
                                        Completed
                                    </option>

                                    <option value="cancelled">
                                        Cancelled
                                    </option>
                                </select>
                            </div>

                            {/* Modal Error */}
                            {modalError && (
                                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-600">
                                    {modalError}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="mt-6 flex gap-3">
                                <button
                                    type="button"
                                    onClick={closeManage}
                                    disabled={saving}
                                    className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Close
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        handleSaveStatus
                                    }
                                    disabled={
                                        saving ||
                                        selectedStatus ===
                                            selectedOrder.status
                                    }
                                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />
                                            Save Status
                                        </>
                                    )}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default AdminOrdersPage;

