"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Download, ExternalLink, Star, User, Calendar, Loader2 } from "lucide-react";

import api from "@/lib/api";

interface Resource {
  id: string;
  title: string;
  description: string;
  resource_type: string;
  file: string | null;
  external_url: string | null;
  creator_name: string;
  created_at: string;
}

export default function ResourceDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  // Prise en charge sécurisée de la clé selon la configuration de votre route dynamique [resourceId]
  const resourceId = params?.resourceId as string;

  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [favoriting, setFavoriting] = useState(false);

  const loadResource = async () => {
    try {
      if (!resourceId) return;
      const res = await api.get(`/api/resources/${resourceId}/`);
      setResource(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Impossible de charger la ressource");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResource();
  }, [resourceId]);

  const toggleFavorite = async () => {
    try {
      setFavoriting(true);
      await api.post(`/api/resources/${resourceId}/favorite/`, {});
      toast.success("Favoris mis à jour");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour des favoris");
    } finally {
      setFavoriting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={28} />
        <p className="mt-3 text-sm font-semibold text-slate-700">Ouverture de la ressource...</p>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="mx-auto max-w-md py-12 text-center text-sm font-bold text-slate-800">
        Ressource introuvable ou indisponible.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-10">
      {/* NAVIGATION ACTION BAR */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={14} />
          Retour aux ressources
        </button>
      </div>

      {/* DETAIL WORKSPACE */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        
        {/* Meta Header tags */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-block rounded-md bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-xs font-extrabold text-blue-700 tracking-wide uppercase">
            {resource.resource_type}
          </span>
        </div>

        <h1 className="text-2xl font-black text-slate-900 sm:text-3xl tracking-tight mb-4 leading-tight">
          {resource.title}
        </h1>

        {/* Creator Identity */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 border-b border-slate-100 pb-5 mb-5 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-1.5">
            <User size={14} className="text-slate-400" />
            <span>Proposé par {resource.creator_name}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 font-semibold">
            <Calendar size={14} />
            <span>Publié le {new Date(resource.created_at).toLocaleDateString("fr-FR")}</span>
          </div>
        </div>

        {/* Content Document text view */}
        <div className="mb-8">
          <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-slate-800">
            {resource.description}
          </p>
        </div>

        {/* COMPONENT ACTIONS FOOTER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-100 pt-6">
          <div className="flex flex-wrap gap-3">
            {resource.file && (
              <a
                href={resource.file}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-green-700 transition-colors"
              >
                <Download size={16} />
                Télécharger le fichier
              </a>
            )}

            {resource.external_url && (
              <a
                href={resource.external_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                <ExternalLink size={16} />
                Ouvrir le lien externe
              </a>
            )}
          </div>

          <button
            onClick={toggleFavorite}
            disabled={favoriting}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-5 py-2.5 text-sm font-bold text-amber-800 transition-colors hover:bg-amber-100 disabled:opacity-50 shrink-0"
          >
            <Star size={16} className="fill-amber-600 text-amber-600" />
            Ajouter aux favoris
          </button>
        </div>

      </div>
    </div>
  );
}

