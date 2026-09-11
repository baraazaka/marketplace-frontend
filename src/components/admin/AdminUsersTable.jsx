
import { useState } from "react";
import {
    Users,
    X,
    Save,
    Loader2,
    Trash2,
    AlertTriangle
} from "lucide-react";

import {
    updateAdminUserRole,
    deleteAdminUser
} from "../../services/api";

function AdminUsersTable({ users, onUserUpdated, onUserDeleted }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");

    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [error, setError] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    function openManage(user) {
        setSelectedUser(user);
        setSelectedRole(user.role);
        setError("");
        setShowDeleteConfirm(false);
    }

    function closeManage() {
        if (saving || deleting) return;

        setSelectedUser(null);
        setSelectedRole("");
        setError("");
        setShowDeleteConfirm(false);
    }

    async function handleSave() {
        if (!selectedUser) return;

        try {
            setSaving(true);
            setError("");

            const updatedUser =
                await updateAdminUserRole(
                    selectedUser.id,
                    selectedRole
                );

            onUserUpdated(updatedUser);

            closeManage();
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!selectedUser) return;

        try {
            setDeleting(true);
            setError("");

            await deleteAdminUser(
                selectedUser.id
            );

            onUserDeleted(selectedUser.id);

            closeManage();
        } catch (error) {
            setError(error.message);
        } finally {
            setDeleting(false);
        }
    }

    if (!users || users.length === 0) {
        return (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-12 text-center">
                <Users className="mx-auto h-10 w-10 text-slate-300" />

                <h3 className="mt-4 font-black text-slate-900">
                    No users found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or filter.
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Users Table */}
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50">
                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                    User
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                    Joined
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50"
                                >
                                    {/* User */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {user.avatar_url ? (
                                                <img
                                                    src={user.avatar_url}
                                                    alt={
                                                        user.full_name ||
                                                        "User"
                                                    }
                                                    className="h-11 w-11 rounded-2xl object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50">
                                                    <Users className="h-5 w-5 text-violet-600" />
                                                </div>
                                            )}

                                            <div>
                                                <p className="font-black text-slate-900">
                                                    {user.full_name ||
                                                        "Unknown User"}
                                                </p>

                                                <p className="mt-1 max-w-[220px] truncate text-xs text-slate-400">
                                                    {user.id}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Role */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                                                user.role === "admin"
                                                    ? "bg-violet-50 text-violet-600"
                                                    : user.role === "seller"
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-slate-100 text-slate-600"
                                            }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* Joined */}
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                openManage(user)
                                            }
                                            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                                        >
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Manage Modal */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-6 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl md:p-8">

                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                                    User Management
                                </p>

                                <h2 className="mt-2 text-2xl font-black text-slate-900">
                                    Manage User
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={closeManage}
                                disabled={saving || deleting}
                                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="mt-6 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                            {selectedUser.avatar_url ? (
                                <img
                                    src={selectedUser.avatar_url}
                                    alt={
                                        selectedUser.full_name ||
                                        "User"
                                    }
                                    className="h-14 w-14 rounded-2xl object-cover"
                                />
                            ) : (
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
                                    <Users className="h-6 w-6 text-violet-600" />
                                </div>
                            )}

                            <div>
                                <p className="font-black text-slate-900">
                                    {selectedUser.full_name ||
                                        "Unknown User"}
                                </p>

                                <p className="mt-1 text-sm text-slate-500">
                                    Current role:{" "}
                                    <span className="font-bold capitalize">
                                        {selectedUser.role}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Change Role */}
                        <div className="mt-6">
                            <label className="mb-2 block text-sm font-bold text-slate-700">
                                Change Role
                            </label>

                            <select
                                value={selectedRole}
                                onChange={(e) =>
                                    setSelectedRole(
                                        e.target.value
                                    )
                                }
                                disabled={
                                    saving ||
                                    deleting
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:bg-slate-100"
                            >
                                <option value="user">
                                    User
                                </option>

                                <option value="seller">
                                    Seller
                                </option>

                                <option value="admin">
                                    Admin
                                </option>
                            </select>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Save / Cancel */}
                        {!showDeleteConfirm && (
                            <div className="mt-6 flex gap-3">
                                <button
                                    type="button"
                                    onClick={closeManage}
                                    disabled={
                                        saving ||
                                        deleting
                                    }
                                    className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={
                                        saving ||
                                        deleting
                                    }
                                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:opacity-60"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Delete */}
                        {!showDeleteConfirm && (
                            <button
                                type="button"
                                onClick={() =>
                                    setShowDeleteConfirm(
                                        true
                                    )
                                }
                                disabled={
                                    saving ||
                                    deleting
                                }
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete User
                            </button>
                        )}

                        {/* Delete Confirmation */}
                        {showDeleteConfirm && (
                            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
                                <div className="flex gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
                                        <AlertTriangle className="h-5 w-5 text-red-600" />
                                    </div>

                                    <div>
                                        <h3 className="font-black text-red-700">
                                            Delete this user?
                                        </h3>

                                        <p className="mt-1 text-sm text-red-600">
                                            This action cannot be
                                            undone.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowDeleteConfirm(
                                                false
                                            )
                                        }
                                        disabled={deleting}
                                        className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={deleting}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
                                    >
                                        {deleting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Deleting...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="h-4 w-4" />
                                                Delete
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminUsersTable;

