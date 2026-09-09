
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PackageOpen, ArrowRight } from "lucide-react";

import { getMyOrders } from "../services/api";

import OrdersHeader from "../components/orders/OrdersHeader";
import OrderCard from "../components/orders/OrderCard";


function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    async function loadOrders() {

        try {
            setLoading(true);
            setError("");

            const data = await getMyOrders();

            setOrders(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }


    useEffect(() => {
        loadOrders();
    }, []);


    // Loading

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600" />

                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading your orders...
                    </p>

                </div>

            </div>
        );
    }


    // Error

    if (error) {
        return (
            <div className="mx-auto max-w-7xl px-6 py-12">

                <div className="rounded-2xl bg-red-50 p-6 text-center">

                    <p className="font-semibold text-red-600">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={loadOrders}
                        className="mt-4 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }


    // Empty Orders

    if (orders.length === 0) {
        return (
            <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6">

                <div className="text-center">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-50">

                        <PackageOpen className="h-9 w-9 text-violet-600" />

                    </div>


                    <h1 className="mt-6 text-3xl font-black text-slate-900">
                        No Orders Yet
                    </h1>


                    <p className="mt-3 text-slate-500">
                        You haven't placed any orders yet.
                    </p>


                    <Link
                        to="/"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
                    >
                        Start Shopping

                        <ArrowRight className="h-4 w-4" />

                    </Link>

                </div>

            </div>
        );
    }


    // Orders

    return (
        <div className="mx-auto max-w-7xl px-6 py-12">

            <OrdersHeader />


            <div className="mt-10 space-y-6">

                {orders.map((order) => (

                    <OrderCard
                        key={order.id}
                        order={order}
                    />

                ))}

            </div>

        </div>
    );
}


export default OrdersPage;

