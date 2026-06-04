"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Star, Calendar, BookmarkX, ArrowRight, Loader2 } from "lucide-react";

import api from "@/lib/api";

interface Favorite {
  id: string;
  resource: string;
  resource_title: string;
  created_at: string;
}

export default function FavoriteResourcesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const loadFavorites = async () => {
    try {
      const res = await api.get("/api/resources/favorites/");
      setFavorites(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Impossible de charger vos favoris");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavorite = async (e: React.MouseEvent, favoriteId: string, resourceId: string) => {
    // Empêche le clic de déclencher le lien de redirection vers la ressource
    e.preventDefault();
    e.stopPropagation();

    try {
      setRemovingId(favoriteId);
      await api.post(`/api/resources/${resourceId}/favorite/`, {});
      setFavorites((prev) => prev.filter((f) => f.id !== favoriteId));
      toast.success("Ressource retirée des favoris");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression");
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={28} />
        <p className="mt-3 text-sm font-semibold text-slate-700">Chargement de vos favoris...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-10">
      {/* HEADER */}
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-amber-50 p-2 text-amber-500 border border-amber-100">
          <Star className="fill-amber-500" size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
            Mes favoris
          </h1>
          <p className="text-sm font-medium text-slate-600 mt-0.5">
            Retrouvez rapidement toutes les ressources que vous avez mises de côté.
          </p>
        </div>
      </div>

      {/* CONTENT LIST */}
      {favorites.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <Star className="mx-auto text-slate-300 mb-3" size={36} />
          <p className="text-sm font-bold text-slate-800">Aucun favori enregistré</p>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Cliquez sur l'étoile depuis la page d'une ressource pour l'ajouter ici.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {favorites.map((favorite) => (
            <Link
              key={favorite.id}
              href={`/resources/${favorite.resource}`}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
            >
              <div className="space-y-1.5 min-w-0 flex-1">
                <h2 className="text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600 truncate pr-2">
                  {favorite.resource_title}
                </h2>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Calendar size={14} className="text-slate-400 shrink-0" />
                  <span>
                    Ajouté le {new Date(favorite.created_at).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS (IN-ROW) */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => removeFavorite(e, favorite.id, favorite.resource)}
                  disabled={removingId === favorite.id}
                  title="Retirer des favoris"
                  className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition-colors hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 disabled:opacity-40"
                >
                  {removingId === favorite.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <BookmarkX size={16} />
                  )}
                </button>
                
                <div className="rounded-xl bg-slate-50 p-2.5 text-slate-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 sm:block hidden">
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

