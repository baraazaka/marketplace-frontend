
import { useEffect, useMemo, useState } from "react";
import { Users, ShieldCheck } from "lucide-react";

import { getAdminUsers } from "../services/api";

import AdminUsersFilters from "../components/admin/AdminUsersFilters";
import AdminUsersTable from "../components/admin/AdminUsersTable";

function AdminUsersPage() {
    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");
    const [role, setRole] = useState("all");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadUsers() {
            try {
                setLoading(true);
                setError("");

                const data = await getAdminUsers();

                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, []);

    function handleUserUpdated(updatedUser) {
        setUsers((currentUsers) =>
            currentUsers.map((user) =>
                user.id === updatedUser.id
                    ? updatedUser
                    : user
            )
        );
    }

    function handleUserDeleted(userId) {
        setUsers((currentUsers) =>
            currentUsers.filter(
                (user) => user.id !== userId
            )
        );
    }

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.full_name
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesRole =
                role === "all" ||
                user.role === role;

            return matchesSearch && matchesRole;
        });
    }, [users, search, role]);

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50">
                            <ShieldCheck className="h-6 w-6 text-violet-600" />
                        </div>

                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                                Administration
                            </p>

                            <h1 className="mt-1 text-4xl font-black text-slate-900">
                                Users Management
                            </h1>
                        </div>
                    </div>

                    <p className="mt-3 text-slate-500">
                        Manage marketplace users and their roles.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
                        {error}
                    </div>
                )}

                {/* Main Card */}
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-violet-600" />

                                <h2 className="text-xl font-black text-slate-900">
                                    All Users
                                </h2>
                            </div>

                            <p className="mt-1 text-sm text-slate-500">
                                {filteredUsers.length} users found
                            </p>
                        </div>
                    </div>

                    <AdminUsersFilters
                        search={search}
                        setSearch={setSearch}
                        role={role}
                        setRole={setRole}
                    />

                    {loading ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-9 w-9 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
                        </div>
                    ) : (
                        <AdminUsersTable
                            users={filteredUsers}
                            onUserUpdated={
                                handleUserUpdated
                            }
                            onUserDeleted={
                                handleUserDeleted
                            }
                        />
                    )}
                </div>
            </div>
        </main>
    );
}

export default AdminUsersPage;

