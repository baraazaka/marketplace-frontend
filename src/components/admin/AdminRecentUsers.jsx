
import { Link } from "react-router-dom";
import {
    Users,
    ArrowRight
} from "lucide-react";

function AdminRecentUsers({ users }) {
    if (!users || users.length === 0) {
        return (
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-slate-900">
                            Recent Users
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Latest registered users.
                        </p>
                    </div>

                    <Users className="h-6 w-6 text-slate-300" />
                </div>

                <div className="flex h-40 items-center justify-center">
                    <p className="text-sm font-semibold text-slate-400">
                        No users yet.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-slate-900">
                        Recent Users
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Latest registered users.
                    </p>
                </div>

                <Link
                    to="/admin/users"
                    className="flex items-center gap-1 text-sm font-bold text-violet-600 transition hover:text-violet-700"
                >
                    View All
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="mt-6 space-y-3">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:border-violet-100 hover:bg-violet-50/40"
                    >
                        <div className="flex min-w-0 items-center gap-4">
                            {/* Avatar */}
                            {user.avatar_url ? (
                                <img
                                    src={user.avatar_url}
                                    alt={user.full_name || "User"}
                                    className="h-11 w-11 shrink-0 rounded-2xl object-cover"
                                />
                            ) : (
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50">
                                    <Users className="h-5 w-5 text-violet-600" />
                                </div>
                            )}

                            {/* User Info */}
                            <div className="min-w-0">
                                <p className="truncate font-black text-slate-900">
                                    {user.full_name || "Unknown User"}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Joined{" "}
                                    {new Date(
                                        user.created_at
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {/* Role */}
                        <span
                            className={`ml-4 shrink-0 rounded-full px-3 py-1 text-xs font-bold capitalize ${
                                user.role === "admin"
                                    ? "bg-violet-50 text-violet-600"
                                    : user.role === "seller"
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-slate-100 text-slate-600"
                            }`}
                        >
                            {user.role}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminRecentUsers;

