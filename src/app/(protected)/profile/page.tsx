"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LogOut, CheckCircle, ShieldAlert, Calendar, User, Info, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { getProfile } from "@/lib/auth";
import { storage } from "@/lib/storage";
import { User as UserType } from "@/types/auth";

export default function ProfilePage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch {
        toast.error("Impossible de charger le profil");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const logout = () => {
    storage.clearTokens();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
        <Loader2 className="animate-spin text-blue-600" size={32} />
        <p className="mt-3 text-sm font-semibold text-slate-700">Chargement de votre espace...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 text-center">
        <div className="inline-flex rounded-full bg-red-50 p-3 text-red-600">
          <ShieldAlert size={28} />
        </div>
        <h2 className="mt-4 text-lg font-bold text-slate-900">Utilisateur introuvable</h2>
        <p className="mt-1 text-sm text-slate-600">Veuillez vous reconnecter pour rafraîchir la session.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Profile Header Background Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
        
        {/* Core Profile Card Body */}
        <div className="relative px-6 pb-6 sm:px-8">
          
          {/* Avatar Positionnement */}
          <div className="absolute -top-16 left-6 sm:left-8">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar utilisateur"
                className="h-28 w-28 rounded-full border-4 border-white bg-white object-cover shadow-md"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-3xl font-black text-white shadow-md">
                {user.first_name?.[0]?.toUpperCase() || <User size={32} />}
              </div>
            )}
          </div>

          {/* User Details */}
          <div className="pt-16 sm:flex sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">
                {user.email}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                  ⚡ Rôle : {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Informational Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <div className={`rounded-xl p-2.5 ${user.is_verified ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Compte Vérifié</p>
                <p className="text-sm font-bold text-slate-900">{user.is_verified ? "Vérifié avec succès" : "En attente"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Membre depuis le</p>
                <p className="text-sm font-bold text-slate-900">
                  {new Date(user.created_at).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Biography Block */}
          <div className="mt-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-2">
              <Info size={14} className="text-slate-500" />
              Biographie
            </h2>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/40 p-4">
              <p className="text-sm font-medium leading-relaxed text-slate-800 whitespace-pre-wrap">
                {user.bio || "Aucune biographie renseignée pour le moment."}
              </p>
            </div>
          </div>

          {/* LogOut Action Block */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <button
              onClick={logout}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 text-sm font-bold text-red-600 transition-all hover:bg-red-100 active:scale-98"
            >
              <LogOut size={16} />
              Déconnexion de la plateforme
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}