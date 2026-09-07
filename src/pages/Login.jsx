
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";

import { loginUser } from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await loginUser(
                formData.email,
                formData.password
            );

            localStorage.setItem(
                "access_token",
                data.access_token
            );

            navigate("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-16">
            <div className="w-full max-w-md">

                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
                        <LogIn className="h-7 w-7 text-white" />
                    </div>

                    <h1 className="mt-5 text-3xl font-black text-slate-900">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Login to continue shopping.
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Email
                            </label>

                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                                />
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition duration-300 hover:-translate-y-0.5 hover:from-violet-600 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <LogIn className="h-5 w-5" />

                            {loading ? "Logging in..." : "Login"}
                        </button>

                    </form>

                    {/* Register */}
                    <p className="mt-6 text-center text-sm text-slate-500">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-violet-600 transition hover:text-indigo-600"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Login;

