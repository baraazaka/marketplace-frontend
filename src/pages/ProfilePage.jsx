
import { useEffect, useState } from "react";

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

