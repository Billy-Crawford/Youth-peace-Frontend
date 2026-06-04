"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { loginUser, getProfile } from "@/lib/auth";
import { storage } from "@/lib/storage";
import { useAuthStore } from "@/store/auth.store";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("jeune1@test.com");
  const [password, setPassword] = useState("Test123456");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const tokens = await loginUser(email, password);

      storage.setTokens(tokens.access, tokens.refresh);

      const profile = await getProfile();

      setUser(profile);

      toast.success("Connexion réussie");

      router.push("/feed");
    } catch (err) {
      console.error(err);
      toast.error("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 flex items-center justify-center px-4 overflow-hidden antialiased">
      {/* Background Orbs */}
      <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative w-full max-w-md rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Welcome back
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            Connecte-toi à l'espace YouthPeace
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-950/40 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-blue-500 focus:bg-slate-950/80 focus:ring-2 focus:ring-blue-500/20"
              placeholder="jeune1@test.com"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Mot de passe
              </label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-950/40 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-blue-500 focus:bg-slate-950/80 focus:ring-2 focus:ring-blue-500/20"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative flex w-full items-center justify-center rounded-xl bg-blue-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/10 transition-all hover:bg-blue-500 hover:shadow-blue-600/20 active:scale-98 disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Connexion en cours...
              </span>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm border-t border-slate-800/60 pt-5">
          <p className="text-slate-400">
            Pas encore de compte ?{" "}
            <Link href="/register" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors underline-offset-4 hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}