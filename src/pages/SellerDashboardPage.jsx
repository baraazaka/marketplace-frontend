
import { useEffect, useState } from "react";
import {
    Package,
    Plus,
    Pencil,
    Trash2,
    ShoppingBag,
    Clock,
    DollarSign,
    ChevronRight,
    Trophy,
    TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

import {
    getMyProducts,
    deleteProduct,
    getSellerDashboard,
    getSellerOrders,
    getSellerAnalytics
} from "../services/api";

import AddProductForm from "../components/seller/AddProductForm";

function SellerDashboardPage() {
    const [products, setProducts] = useState([]);

    const [stats, setStats] = useState({
        productsCount: 0,
        totalStock: 0,
        ordersCount: 0,
        pendingOrders: 0,
        totalSales: 0
    });

    const [recentOrders, setRecentOrders] = useState([]);

    const [analytics, setAnalytics] = useState({
        totalSales: 0,
        totalOrders: 0,
        topProducts: [],
        salesByMonth: []
    });

    const [loading, setLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(true);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [analyticsLoading, setAnalyticsLoading] = useState(true);

    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [showAddProduct, setShowAddProduct] = useState(false);


    useEffect(() => {
        async function loadDashboard() {
            try {
                setLoading(true);
                setStatsLoading(true);
                setOrdersLoading(true);
                setAnalyticsLoading(true);
                setError("");

                const [
                    productsData,
                    statsData,
                    ordersData,
                    analyticsData
                ] = await Promise.all([
                    getMyProducts(),
                    getSellerDashboard(),
                    getSellerOrders(),
                    getSellerAnalytics()
                ]);

                setProducts(productsData);
                setStats(statsData);

                setRecentOrders(
                    ordersData.slice(0, 3)
                );

                setAnalytics(analyticsData);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
                setStatsLoading(false);
                setOrdersLoading(false);
                setAnalyticsLoading(false);
            }
        }

        loadDashboard();
    }, []);


    async function refreshStats() {
        try {
            const updatedStats =
                await getSellerDashboard();

            setStats(updatedStats);

        } catch (error) {
            setError(error.message);
        }
    }


    async function refreshAnalytics() {
        try {
            const updatedAnalytics =
                await getSellerAnalytics();

            setAnalytics(updatedAnalytics);

        } catch (error) {
            setError(error.message);
        }
    }


    async function handleDelete(product) {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${product.name}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setDeletingId(product.id);

            await deleteProduct(product.id);

            setProducts((current) =>
                current.filter(
                    (item) => item.id !== product.id
                )
            );

            await refreshStats();
            await refreshAnalytics();

        } catch (error) {
            setError(error.message);
        } finally {
            setDeletingId(null);
        }
    }


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
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                            Seller
                        </p>

                        <h1 className="mt-2 text-4xl font-black text-slate-900">
                            Seller Dashboard
                        </h1>

                        <p className="mt-3 text-slate-500">
                            Manage your products, orders and store.
                        </p>
                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            setShowAddProduct(
                                (current) => !current
                            )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
                    >
                        <Plus className="h-4 w-4" />

                        {showAddProduct
                            ? "Close Form"
                            : "Add Product"}
                    </button>

                </div>


                {/* Add Product */}
                {showAddProduct && (
                    <AddProductForm
                        onProductCreated={async (product) => {
                            setProducts((current) => [
                                product,
                                ...current
                            ]);

                            setShowAddProduct(false);

                            await refreshStats();
                            await refreshAnalytics();
                        }}
                    />
                )}


                {/* Stats */}
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Products */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm font-bold text-slate-500">
                                    My Products
                                </p>

                                <p className="mt-2 text-3xl font-black text-slate-900">
                                    {statsLoading
                                        ? "..."
                                        : stats.productsCount}
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
                                <Package className="h-6 w-6 text-violet-600" />
                            </div>

                        </div>

                    </div>


                    {/* Stock */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm font-bold text-slate-500">
                                    Total Stock
                                </p>

                                <p className="mt-2 text-3xl font-black text-slate-900">
                                    {statsLoading
                                        ? "..."
                                        : stats.totalStock}
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                                <Package className="h-6 w-6 text-blue-600" />
                            </div>

                        </div>

                    </div>


                    {/* Orders */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm font-bold text-slate-500">
                                    Orders
                                </p>

                                <p className="mt-2 text-3xl font-black text-slate-900">
                                    {statsLoading
                                        ? "..."
                                        : stats.ordersCount}
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
                                <ShoppingBag className="h-6 w-6 text-amber-600" />
                            </div>

                        </div>

                    </div>


                    {/* Pending Orders */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm font-bold text-slate-500">
                                    Pending Orders
                                </p>

                                <p className="mt-2 text-3xl font-black text-slate-900">
                                    {statsLoading
                                        ? "..."
                                        : stats.pendingOrders}
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">
                                <Clock className="h-6 w-6 text-orange-600" />
                            </div>

                        </div>

                    </div>


                    {/* Sales */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:col-span-2 lg:col-span-1">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm font-bold text-slate-500">
                                    Total Sales
                                </p>

                                <p className="mt-2 text-3xl font-black text-slate-900">
                                    {statsLoading
                                        ? "..."
                                        : `$${Number(
                                            stats.totalSales || 0
                                        ).toFixed(2)}`}
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">
                                <DollarSign className="h-6 w-6 text-green-600" />
                            </div>

                        </div>

                    </div>

                </div>


                {/* Analytics */}
                <div className="mt-8 grid gap-6 lg:grid-cols-2">

                 
{/* Sales Overview */}
<div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

    <div>
        <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-violet-600" />

            <h2 className="text-2xl font-black text-slate-900">
                Sales Overview
            </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
            Your sales performance by month.
        </p>
    </div>


    {analyticsLoading ? (
        <div className="flex h-64 items-center justify-center">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
        </div>

    ) : analytics.salesByMonth.length === 0 ? (

        <div className="flex h-64 flex-col items-center justify-center text-center">

            <TrendingUp className="h-10 w-10 text-slate-300" />

            <p className="mt-3 font-bold text-slate-700">
                No sales data yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
                Your monthly sales will appear here.
            </p>

        </div>

    ) : (

        <div className="mt-8">

            <div className="flex h-[260px] items-end gap-6 border-b border-slate-200 px-4">

                {analytics.salesByMonth.map((item) => {

                    const maxSales = Math.max(
                        ...analytics.salesByMonth.map(
                            (month) =>
                                Number(month.sales)
                        )
                    );

                    const sales =
                        Number(item.sales) || 0;

                    const barHeight =
                        maxSales > 0
                            ? Math.max(
                                (sales / maxSales) * 200,
                                12
                            )
                            : 12;


                    return (
                        <div
                            key={item.month}
                            className="flex h-full flex-1 flex-col items-center justify-end"
                        >

                            {/* Value */}
                            <span className="mb-2 text-xs font-bold text-slate-600">
                                ${sales.toFixed(0)}
                            </span>


                            {/* Bar */}
                            <div
                                className="w-full max-w-[60px] rounded-t-xl bg-violet-500 transition-all duration-500 hover:bg-violet-600"
                                style={{
                                    height: `${barHeight}px`
                                }}
                            />


                            {/* Month */}
                            <span className="mt-3 translate-y-7 text-xs font-bold text-slate-400">
                                {item.month}
                            </span>

                        </div>
                    );

                })}

            </div>

        </div>

    )}

</div>




                    {/* Top Products */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

                        <div className="flex items-start justify-between">

                            <div>
                                <div className="flex items-center gap-2">

                                    <Trophy className="h-5 w-5 text-amber-500" />

                                    <h2 className="text-2xl font-black text-slate-900">
                                        Top Products
                                    </h2>

                                </div>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your best-selling products.
                                </p>
                            </div>

                        </div>


                        {analyticsLoading ? (
                            <div className="flex h-64 items-center justify-center">
                                <div className="h-9 w-9 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
                            </div>
                        ) : analytics.topProducts.length === 0 ? (
                            <div className="flex h-64 flex-col items-center justify-center text-center">
                                <Trophy className="h-10 w-10 text-slate-300" />

                                <p className="mt-3 font-bold text-slate-700">
                                    No product sales yet
                                </p>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your best-selling products will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="mt-6 space-y-4">

                                {analytics.topProducts.map(
                                    (product, index) => (
                                        <div
                                            key={product.id}
                                            className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4"
                                        >

                                            {/* Rank */}
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm font-black text-violet-600">
                                                #{index + 1}
                                            </div>


                                            {/* Product */}
                                            <div className="min-w-0 flex-1">

                                                <p className="truncate font-black text-slate-900">
                                                    {product.name}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    {product.quantity} items sold
                                                </p>

                                            </div>


                                            {/* Sales */}
                                            <div className="text-right">

                                                <p className="font-black text-violet-600">
                                                    ${Number(
                                                        product.sales
                                                    ).toFixed(2)}
                                                </p>

                                                <p className="mt-1 text-xs font-medium text-slate-400">
                                                    Sales
                                                </p>

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>
                        )}

                    </div>

                </div>


                {/* Recent Orders */}
                <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                                Overview
                            </p>

                            <h2 className="mt-2 text-2xl font-black text-slate-900">
                                Recent Orders
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Latest orders containing your products.
                            </p>
                        </div>


                        <Link
                            to="/seller/orders"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                        >
                            View All Orders
                            <ChevronRight className="h-4 w-4" />
                        </Link>

                    </div>


                    {ordersLoading && (
                        <div className="flex justify-center py-12">
                            <div className="h-9 w-9 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
                        </div>
                    )}


                    {!ordersLoading && recentOrders.length === 0 && (
                        <div className="py-12 text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                                <ShoppingBag className="h-7 w-7 text-slate-400" />
                            </div>

                            <h3 className="mt-4 text-lg font-black text-slate-800">
                                No orders yet
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Orders containing your products will appear here.
                            </p>

                        </div>
                    )}


                    {!ordersLoading && recentOrders.length > 0 && (
                        <div className="mt-6 space-y-4">

                            {recentOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="rounded-2xl border border-slate-200 p-4 transition hover:shadow-sm"
                                >

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        <div className="flex items-center gap-4">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
                                                <Package className="h-6 w-6 text-violet-600" />
                                            </div>

                                            <div>
                                                <h3 className="font-black text-slate-900">
                                                    Order #{order.id}
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    {formatDate(order.created_at)}
                                                </p>
                                            </div>

                                        </div>


                                        <span
                                            className={`w-fit rounded-full px-3 py-1.5 text-xs font-black capitalize ${getStatusStyle(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>

                                    </div>


                                    <div className="my-4 h-px bg-slate-100" />


                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        <div className="flex flex-wrap gap-5">

                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                                    Your Items
                                                </p>

                                                <p className="mt-1 text-sm font-black text-slate-900">
                                                    {order.items?.length || 0}
                                                </p>
                                            </div>


                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                                    Order Total
                                                </p>

                                                <p className="mt-1 text-sm font-black text-violet-600">
                                                    ${Number(
                                                        order.total_amount || 0
                                                    ).toFixed(2)}
                                                </p>
                                            </div>

                                        </div>


                                        <Link
                                            to={`/seller/orders/${order.id}`}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-600"
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


                {/* Products */}
                <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

                    <div>
                        <h2 className="text-2xl font-black text-slate-900">
                            My Products
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Products added by your seller account.
                        </p>
                    </div>


                    {loading && (
                        <div className="flex justify-center py-16">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
                        </div>
                    )}


                    {!loading && products.length === 0 && (
                        <div className="py-16 text-center">

                            <Package className="mx-auto h-12 w-12 text-slate-300" />

                            <h3 className="mt-4 text-lg font-black text-slate-800">
                                No products yet
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Your products will appear here.
                            </p>

                        </div>
                    )}


                    {!loading && products.length > 0 && (
                        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                                >

                                    {product.image_url ? (
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="h-48 w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-48 items-center justify-center bg-slate-100">
                                            <Package className="h-12 w-12 text-slate-300" />
                                        </div>
                                    )}


                                    <div className="p-5">

                                        <h3 className="font-black text-slate-900">
                                            {product.name}
                                        </h3>

                                        <p className="mt-2 text-sm text-slate-500">
                                            {product.description}
                                        </p>


                                        <div className="mt-4 flex items-center justify-between">

                                            <span className="text-lg font-black text-violet-600">
                                                ${product.price}
                                            </span>

                                            <span className="text-sm font-bold text-slate-500">
                                                Stock: {product.stock}
                                            </span>

                                        </div>


                                        <div className="mt-5 flex gap-3">

                                            <Link
                                                to={`/products/edit/${product.id}`}
                                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                Edit
                                            </Link>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(product)
                                                }
                                                disabled={
                                                    deletingId === product.id
                                                }
                                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                <Trash2 className="h-4 w-4" />

                                                {deletingId === product.id
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </div>

            </div>

        </main>
    );
}

export default SellerDashboardPage;

