
import { useEffect, useState } from "react";
import {
    Store,
    ShoppingBag,
    ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";

import { getMyProfile } from "../services/api";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import EditProfileForm from "../components/profile/EditProfileForm";

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProfile() {
            try {
                setLoading(true);
                setError("");

                const data = await getMyProfile();

                setProfile(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, []);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-100">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Loading profile...
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">
                        Something went wrong
                    </h1>

                    <p className="mt-3 text-slate-500">
                        {error}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-12">
            <div className="mx-auto max-w-4xl">

                {/* Page Header */}
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                        Account
                    </p>

                    <h1 className="mt-2 text-4xl font-black text-slate-900">
                        My Profile
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Manage your account information.
                    </p>
                </div>


                {/* Profile Card */}
                <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
                    <ProfileHeader profile={profile} />

                    <ProfileInfo profile={profile} />
                </div>


                {/* Seller Center */}
                {profile?.role === "seller" && (
                    <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                                Seller
                            </p>

                            <h2 className="mt-2 text-2xl font-black text-slate-900">
                                Seller Center
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Manage your store and customer orders.
                            </p>
                        </div>


                        <div className="mt-6 grid gap-4 sm:grid-cols-2">

                            {/* Seller Dashboard */}
                            <Link
                                to="/seller/dashboard"
                                className="group rounded-2xl border border-slate-200 p-5 transition hover:border-violet-200 hover:bg-violet-50"
                            >
                                <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 transition group-hover:bg-white">
                                        <Store className="h-6 w-6 text-violet-600" />
                                    </div>

                                    <div>
                                        <h3 className="font-black text-slate-900">
                                            Seller Dashboard
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Manage your products.
                                        </p>
                                    </div>

                                </div>
                            </Link>


                            {/* Seller Orders */}
                            <Link
                                to="/seller/orders"
                                className="group rounded-2xl border border-slate-200 p-5 transition hover:border-violet-200 hover:bg-violet-50"
                            >
                                <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 transition group-hover:bg-white">
                                        <ShoppingBag className="h-6 w-6 text-violet-600" />
                                    </div>

                                    <div>
                                        <h3 className="font-black text-slate-900">
                                            Seller Orders
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Manage customer orders.
                                        </p>
                                    </div>

                                </div>
                            </Link>

                        </div>
                    </div>
                )}


{/* Admin Center */}
{profile?.role === "admin" && (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

        <div>
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                Administration
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900">
                Admin Center
            </h2>

            <p className="mt-2 text-sm text-slate-500">
                Manage and monitor the marketplace.
            </p>
        </div>


        <div className="mt-6">

            {/* Admin Dashboard */}
            <Link
                to="/admin/dashboard"
                className="group block rounded-2xl border border-slate-200 p-5 transition hover:border-violet-200 hover:bg-violet-50"
            >
                <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 transition group-hover:bg-white">
                        <ShieldCheck className="h-6 w-6 text-violet-600" />
                    </div>

                    <div>
                        <h3 className="font-black text-slate-900">
                            Admin Dashboard
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage and monitor the marketplace.
                        </p>
                    </div>

                </div>
            </Link>

        </div>

    </div>
)}


                {/* Edit Profile */}
                <EditProfileForm
                    profile={profile}
                    onProfileUpdated={setProfile}
                />

            </div>
        </main>
    );
}

export default ProfilePage;

