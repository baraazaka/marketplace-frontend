
import { MapPin, CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import OrderStatus from "./OrderStatus";
import OrderItem from "./OrderItem";

function OrderCard({ order }) {

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
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Order
                    </p>

                    <h2 className="mt-1 text-xl font-black text-slate-900">
                        #{order.id}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                        <CalendarDays className="h-4 w-4" />
                        <span>{formattedDate}</span>
                    </div>
                </div>

                <OrderStatus status={order.status} />
            </div>


            <div className="px-6">

                <div className="divide-y divide-slate-100">

                    {order.order_items?.map((item) => (
                        <OrderItem
                            key={item.id}
                            item={item}
                        />
                    ))}

                </div>

            </div>


            <div className="border-t border-slate-100 bg-slate-50/50 p-6">

                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-violet-600" />

                            <p className="text-sm font-bold text-slate-700">
                                Shipping Address
                            </p>
                        </div>

                        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                            {order.shipping_address}
                        </p>

                    </div>


                    <div className="sm:text-right">

                        <p className="text-sm font-semibold text-slate-500">
                            Order Total
                        </p>

                        <p className="mt-1 text-2xl font-black text-violet-600">
                            ${Number(order.total_amount).toFixed(2)}
                        </p>

                    </div>

                </div>


                {/* View Details */}

                <div className="mt-6 flex justify-end">

                    <Link
                        to={`/orders/${order.id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
                    >
                        View Details

                        <ArrowRight className="h-4 w-4" />
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default OrderCard;

