"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://youth-peace-backend.onrender.com/api/auth/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            password_confirm: password, // important
            role: "JEUNE", // important (par défaut backend)
          }),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.detail || "Erreur inscription");
      }

      toast.success("Compte créé avec succès");

      router.push("/login");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erreur inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 flex items-center justify-center px-4 overflow-hidden antialiased">
      {/* Background Orbs */}
      <div className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-green-600/10 blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl" />

      <div className="relative w-full max-w-md rounded-2xl border border-slate-800/80 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Créer un compte
          </h1>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            Rejoins la communauté YouthPeace
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Prénom
              </label>
              <input
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-2 w-full rounded-xl bg-slate-950/40 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-green-500 focus:bg-slate-950/80 focus:ring-2 focus:ring-green-500/20"
                placeholder="John"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Nom
              </label>
              <input
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-2 w-full rounded-xl bg-slate-950/40 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-green-500 focus:bg-slate-950/80 focus:ring-2 focus:ring-green-500/20"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-950/40 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-green-500 focus:bg-slate-950/80 focus:ring-2 focus:ring-green-500/20"
              placeholder="jeune1@test.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-950/40 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-green-500 focus:bg-slate-950/80 focus:ring-2 focus:ring-green-500/20"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Confirmer mot de passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 w-full rounded-xl bg-slate-950/40 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-green-500 focus:bg-slate-950/80 focus:ring-2 focus:ring-green-500/20"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative flex w-full items-center justify-center rounded-xl bg-green-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-green-600/10 transition-all hover:bg-green-500 hover:shadow-green-600/20 active:scale-98 disabled:pointer-events-none disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Création en cours...
              </span>
            ) : (
              "Créer mon compte"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm border-t border-slate-800/60 pt-5">
          <p className="text-slate-400">
            Déjà inscrit ?{" "}
            <Link href="/login" className="font-semibold text-green-400 hover:text-green-300 transition-colors underline-offset-4 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

