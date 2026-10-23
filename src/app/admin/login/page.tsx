"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!identifier.trim() || !password) {
      setError("Please enter both email/username and password.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials.");
      }

      // Successfully authenticated; navigate to dashboard
      window.location.href = "/admin/dashboard";
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Authentication failed.";
      setError(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#232323] flex flex-col justify-center items-center px-4 sm:px-6">
      <div className="w-full max-w-md bg-white border border-[#EAE1D1] rounded-xl p-8 sm:p-10 shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#C6A568] block mb-2">
            VANAE RESIDENCES
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#0D5A46] tracking-tight">
            Admin Login
          </h1>
          <p className="text-xs text-[#736B63] mt-2 font-sans">
            Sign in with authorized administrative credentials
          </p>
          <div className="h-[1px] w-12 bg-[#C6A568]/50 mx-auto mt-4" />
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans">
            <div>{error}</div>
            {error.includes("Too many login attempts") && (
              <button
                type="button"
                onClick={async () => {
                  try {
                    await fetch("/api/admin/reset-lockout", { method: "POST" });
                    setError("");
                  } catch {
                    // Ignore errors
                  }
                }}
                className="mt-2 text-[11px] underline font-semibold text-rose-800 hover:text-rose-950 block cursor-pointer"
              >
                Reset test lockout (Local Development)
              </button>
            )}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#736B63] mb-1.5 font-medium font-sans">
              Email or Username
            </label>
            <input
              type="text"
              autoComplete="username"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={isSubmitting}
              placeholder="admin@vanae.com"
              className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#EAE1D1] focus:border-[#0D5A46] focus:bg-white text-sm text-[#232323] outline-none transition-colors disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#736B63] mb-1.5 font-medium font-sans">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#EAE1D1] focus:border-[#0D5A46] focus:bg-white text-sm text-[#232323] outline-none transition-colors disabled:opacity-60"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-lg bg-[#0D5A46] hover:bg-[#093F31] text-white font-medium text-xs tracking-wider uppercase transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Signing in..." : "Log In"}
            </button>
          </div>
        </form>
      </div>

      <p className="mt-8 text-xs text-[#736B63]/70 font-sans">
        Protected system · Authorized personnel only
      </p>
    </div>
  );
}
