
import { Search } from "lucide-react";

function AdminUsersFilters({
    search,
    setSearch,
    role,
    setRole
}) {
    return (
        <div className="mt-6 flex flex-col gap-4 md:flex-row">
            {/* Search */}
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users..."
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
            </div>

            {/* Role Filter */}
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="seller">Sellers</option>
                <option value="admin">Admins</option>
            </select>
        </div>
    );
}

export default AdminUsersFilters;

