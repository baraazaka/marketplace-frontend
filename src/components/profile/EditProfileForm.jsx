
import { useState } from "react";
import { Save } from "lucide-react";

import { updateMyProfile } from "../../services/api";

function EditProfileForm({ profile, onProfileUpdated }) {
    const [fullName, setFullName] = useState(profile.full_name || "");
    const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!fullName.trim()) {
            setError("Full name is required.");
            return;
        }

        try {
            setLoading(true);

            const updatedProfile = await updateMyProfile(
                fullName.trim(),
                avatarUrl.trim() || null
            );

            setSuccess("Profile updated successfully.");

            if (onProfileUpdated) {
                onProfileUpdated(updatedProfile);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-10">
            <div>
                <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                    Settings
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                    Edit Profile
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Update your personal profile information.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                {/* Full Name */}
                <div>
                    <label
                        htmlFor="full-name"
                        className="text-sm font-bold text-slate-700"
                    >
                        Full Name
                    </label>

                    <input
                        id="full-name"
                        type="text"
                        value={fullName}
                        onChange={(event) =>
                            setFullName(event.target.value)
                        }
                        placeholder="Enter your full name"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    />
                </div>

                {/* Avatar URL */}
                <div>
                    <label
                        htmlFor="avatar-url"
                        className="text-sm font-bold text-slate-700"
                    >
                        Avatar URL
                    </label>

                    <input
                        id="avatar-url"
                        type="url"
                        value={avatarUrl}
                        onChange={(event) =>
                            setAvatarUrl(event.target.value)
                        }
                        placeholder="https://example.com/avatar.jpg"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                        Enter a public image URL for your profile picture.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
                        {success}
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Save className="h-4 w-4" />

                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}

export default EditProfileForm;

