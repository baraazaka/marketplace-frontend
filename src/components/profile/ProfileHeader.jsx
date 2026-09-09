
import { ShieldCheck } from "lucide-react";

function ProfileHeader({ profile }) {
    return (
        <div className="bg-slate-900 px-6 py-8 md:px-10">
            <div className="flex flex-col items-center gap-5 sm:flex-row">

                {/* Avatar */}
                {profile.avatar_url ? (
                    <img
                        src={profile.avatar_url}
                        alt={profile.full_name || "User"}
                        className="h-24 w-24 rounded-full border-4 border-white/20 object-cover"
                    />
                ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-600 text-3xl font-black text-white">
                        {profile.full_name
                            ?.charAt(0)
                            .toUpperCase() || "U"}
                    </div>
                )}

                {/* Name + Role */}
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-black text-white">
                        {profile.full_name || "User"}
                    </h2>

                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold capitalize text-violet-300">
                        <ShieldCheck className="h-4 w-4" />
                        {profile.role}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;

