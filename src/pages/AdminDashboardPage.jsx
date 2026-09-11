
import { useEffect, useState } from "react";

import {
    getAdminDashboard,
    getAdminAnalytics,
    getAdminOverview
} from "../services/api";

import {
    Package,
    ShoppingCart,
    Users,
    FolderPlus
} from "lucide-react";
import { Link } from "react-router-dom";

import AdminStats from "../components/admin/AdminStats";
import AdminSalesOverview from "../components/admin/AdminSalesOverview";
import AdminRecentOrders from "../components/admin/AdminRecentOrders";
import AdminRecentUsers from "../components/admin/AdminRecentUsers";

function AdminDashboardPage() {
    const [stats, setStats] = useState({
        usersCount: 0,
        sellersCount: 0,
        productsCount: 0,
        ordersCount: 0,
        totalRevenue: 0
    });

    const [analytics, setAnalytics] = useState({
        totalRevenue: 0,
        salesByMonth: []
    });

    const [recentOrders, setRecentOrders] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [analyticsLoading, setAnalyticsLoading] = useState(true);
    const [overviewLoading, setOverviewLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
            try {
                setLoading(true);
                setAnalyticsLoading(true);
                setOverviewLoading(true);
                setError("");

                const [
                    dashboardData,
                    analyticsData,
                    overviewData
                ] = await Promise.all([
                    getAdminDashboard(),
                    getAdminAnalytics(),
                    getAdminOverview()
                ]);

                setStats(dashboardData);
                setAnalytics(analyticsData);

                setRecentOrders(
                    overviewData.recentOrders || []
                );

                setRecentUsers(
                    overviewData.recentUsers || []
                );

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
                setAnalyticsLoading(false);
                setOverviewLoading(false);
            }
        }

        loadDashboard();
    }, []);

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                        Administration
                    </p>

                    <h1 className="mt-2 text-4xl font-black text-slate-900">
                        Admin Dashboard
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Monitor and manage your marketplace.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                        {error}
                    </div>
                )}

                {/* Statistics */}
                <AdminStats
                    stats={stats}
                    loading={loading}
                />

                {/* Management Shortcuts */}
                <div className="mt-8">
                    <div className="mb-4">
                        <h2 className="text-xl font-black text-slate-900">
                            Management
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Quickly access marketplace management tools.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">

                        {/* Products */}
                        <Link
                            to="/admin/products"
                            className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 transition group-hover:bg-violet-100">
                                    <Package className="h-6 w-6 text-violet-600" />
                                </div>

                                <span className="text-sm font-bold text-violet-600">
                                    Manage →
                                </span>
                            </div>

                            <h3 className="mt-5 text-lg font-black text-slate-900">
                                Products
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage products, sellers, prices, and inventory.
                            </p>
                        </Link>

                        {/* Orders */}
                        <Link
                            to="/admin/orders"
                            className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 transition group-hover:bg-violet-100">
                                    <ShoppingCart className="h-6 w-6 text-violet-600" />
                                </div>

                                <span className="text-sm font-bold text-violet-600">
                                    Manage →
                                </span>
                            </div>

                            <h3 className="mt-5 text-lg font-black text-slate-900">
                                Orders
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Review orders and update their status.
                            </p>
                        </Link>

                        {/* Users */}
                        <Link
                            to="/admin/users"
                            className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 transition group-hover:bg-violet-100">
                                    <Users className="h-6 w-6 text-violet-600" />
                                </div>

                                <span className="text-sm font-bold text-violet-600">
                                    Manage →
                                </span>
                            </div>

                            <h3 className="mt-5 text-lg font-black text-slate-900">
                                Users
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage users and control their roles.
                            </p>
                        </Link>
<Link
    to="/admin/categories"
    className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
>
    <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
            <FolderPlus className="h-6 w-6 text-violet-600" />
        </div>

        <span className="text-sm font-bold text-violet-600">
            Manage →
        </span>
    </div>

    <h3 className="mt-5 text-lg font-black text-slate-900">
        Categories
    </h3>

    <p className="mt-1 text-sm text-slate-500">
        Add and manage marketplace categories.
    </p>
</Link>
                    </div>
                </div>

                {/* Sales Overview */}
                <AdminSalesOverview
                    analytics={analytics}
                    loading={analyticsLoading}
                />

                {/* Recent Activity */}
                <div className="mt-8 grid gap-8 lg:grid-cols-2">

                    <AdminRecentOrders
                        orders={recentOrders}
                        loading={overviewLoading}
                    />

                    <AdminRecentUsers
                        users={recentUsers}
                        loading={overviewLoading}
                    />

                </div>

            </div>
        </main>
    );
}

export default AdminDashboardPage;

