
import { Package } from "lucide-react";

function OrdersHeader() {
    return (
        <div>
            <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
                    <Package className="h-5 w-5 text-violet-600" />
                </div>

                <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                        My Orders
                    </p>

                    <h1 className="mt-1 text-4xl font-black tracking-tight text-slate-900">
                        Your Orders
                    </h1>
                </div>

            </div>

            <p className="mt-3 text-slate-500">
                View and track all your orders in one place.
            </p>
        </div>
    );
}

export default OrdersHeader;

