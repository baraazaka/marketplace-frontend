
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    MapPin
} from "lucide-react";

import { getOrderById } from "../services/api";

import OrderStatus from "../components/orders/OrderStatus";
import OrderItem from "../components/orders/OrderItem";


function OrderDetailsPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    async function loadOrder() {

        try {
            setLoading(true);
            setError("");

            const data = await getOrderById(id);

            setOrder(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }


    useEffect(() => {
        loadOrder();
    }, [id]);


    // Loading

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600" />

                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading order...
                    </p>

                </div>

            </div>
        );
    }


    // Error

    if (error || !order) {
        return (
            <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6">

                <div className="text-center">

                    <h1 className="text-2xl font-black text-slate-900">
                        Order Not Found
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        {error || "We couldn't find this order."}
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/orders")}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Orders
                    </button>

                </div>

            </div>
        );
    }


    const formattedDate =
        new Date(order.created_at).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );


    return (
        <div className="mx-auto max-w-7xl px-6 py-12">

            {/* Back Button */}

            <button
                type="button"
                onClick={() => navigate("/orders")}
                className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-violet-600"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Orders
            </button>


            {/* Header */}

            <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                        Order Details
                    </p>

                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                        Order #{order.id}
                    </h1>

                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">

                        <CalendarDays className="h-4 w-4" />

                        <span>
                            {formattedDate}
                        </span>

                    </div>

                </div>


                <OrderStatus status={order.status} />

            </div>


            {/* Main Content */}

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">

                {/* Items */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="font-black text-slate-900">
                        Order Items
                    </h2>


                    <div className="mt-6 divide-y divide-slate-100">

                        {order.order_items?.map((item) => (

                            <OrderItem
                                key={item.id}
                                item={item}
                            />

                        ))}

                    </div>

                </div>


                {/* Order Information */}

                <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="font-black text-slate-900">
                        Order Information
                    </h2>


                    {/* Shipping */}

                    <div className="mt-6">

                        <div className="flex items-center gap-2">

                            <MapPin className="h-4 w-4 text-violet-600" />

                            <p className="text-sm font-bold text-slate-700">
                                Shipping Address
                            </p>

                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            {order.shipping_address}
                        </p>

                    </div>


                    <div className="my-6 border-t border-slate-100" />


                    {/* Total */}

                    <div className="flex items-center justify-between">

                        <span className="text-lg font-black text-slate-900">
                            Total
                        </span>

                        <span className="text-2xl font-black text-violet-600">
                            ${Number(order.total_amount).toFixed(2)}
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default OrderDetailsPage;

