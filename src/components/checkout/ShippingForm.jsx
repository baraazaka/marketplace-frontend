
import { MapPin, Phone } from "lucide-react";

function ShippingForm({
    city,
    setCity,
    address,
    setAddress,
    phone,
    setPhone
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Header */}

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                    <MapPin className="h-5 w-5 text-violet-600" />
                </div>

                <div>
                    <h2 className="font-black text-slate-900">
                        Shipping Information
                    </h2>

                    <p className="text-sm text-slate-500">
                        Enter your delivery information.
                    </p>
                </div>

            </div>


            {/* Form */}

            <div className="mt-6 space-y-5">

                {/* City */}

                <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                        City
                    </label>

                    <input
                        type="text"
                        value={city}
                        onChange={(event) =>
                            setCity(event.target.value)
                        }
                        placeholder="e.g. Jenin"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    />
                </div>


                {/* Delivery Address */}

                <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                        Delivery Address
                    </label>

                    <textarea
                        value={address}
                        onChange={(event) =>
                            setAddress(event.target.value)
                        }
                        placeholder="Street, area, building number..."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    />
                </div>


                {/* Phone */}

                <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                        Phone Number
                    </label>

                    <div className="relative">

                        <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <input
                            type="tel"
                            value={phone}
                            onChange={(event) =>
                                setPhone(event.target.value)
                            }
                            placeholder="059xxxxxxxx"
                            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                        />

                    </div>
                </div>

            </div>

        </div>
    );
}

export default ShippingForm;

