
import {
    Clock,
    CheckCircle,
    XCircle,
    Truck
} from "lucide-react";


function OrderStatus({ status }) {

    const statusConfig = {

        pending: {
            label: "Pending",
            icon: Clock,
            className: "bg-amber-50 text-amber-600"
        },

        processing: {
            label: "Processing",
            icon: Clock,
            className: "bg-blue-50 text-blue-600"
        },

        shipped: {
            label: "Shipped",
            icon: Truck,
            className: "bg-violet-50 text-violet-600"
        },

        completed: {
            label: "Completed",
            icon: CheckCircle,
            className: "bg-green-50 text-green-600"
        },

        cancelled: {
            label: "Cancelled",
            icon: XCircle,
            className: "bg-red-50 text-red-600"
        }

    };


    const config =
        statusConfig[status] || {
            label: status,
            icon: Clock,
            className: "bg-slate-100 text-slate-600"
        };


    const Icon = config.icon;


    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${config.className}`}
        >

            <Icon className="h-3.5 w-3.5" />

            {config.label}

        </span>
    );
}


export default OrderStatus;

