
import { User } from "lucide-react";

function ProfileInfo({ profile }) {
    return (
        <div className="p-6 md:p-10">

            {/* Section Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                    <User className="h-5 w-5 text-violet-600" />
                </div>

                <div>
                    <h3 className="font-black text-slate-900">
                        Account Information
                    </h3>

                    <p className="text-sm text-slate-500">
                        Your profile details
                    </p>
                </div>
            </div>

            {/* Information */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">

                {/* Full Name */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Full Name
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                        {profile.full_name || "Not provided"}
                    </p>
                </div>

                {/* Role */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Account Role
                    </p>

                    <p className="mt-2 font-bold capitalize text-slate-900">
                        {profile.role}
                    </p>
                </div>

                {/* User ID */}
                <div className="sm:col-span-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        User ID
                    </p>

                    <p className="mt-2 break-all font-mono text-sm text-slate-600">
                        {profile.id}
                    </p>
                </div>

                {/* Created At */}
                <div className="sm:col-span-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Member Since
                    </p>

                    <p className="mt-2 font-bold text-slate-900">
                        {new Date(
                            profile.created_at
                        ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;

