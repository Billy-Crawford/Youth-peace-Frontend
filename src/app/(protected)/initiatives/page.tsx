// src/app/(protected)/initiatives/page.tsx

"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PlusCircle, MapPin, Tag, User, ImageIcon, Loader2 } from "lucide-react";

import { getInitiatives, createInitiative } from "@/lib/initiatives";
import { Initiative } from "@/types/initiatives";

export default function InitiativesPage() {
  const [items, setItems] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("PAIX");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const load = async () => {
    try {
      const data = await getInitiatives();
      setItems(data);
    } catch {
      toast.error("Erreur chargement initiatives");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    try {
      await createInitiative({
        title,
        category,
        description,
        location,
        image,
      });

      toast.success("Initiative créée");

      setTitle("");
      setCategory("PAIX");
      setDescription("");
      setLocation("");
      setImage(null);

      load();
    } catch {
      toast.error("Erreur création initiative");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Initiatives citoyennes
        </h1>
        <p className="mt-1 text-sm font-medium text-slate-600">
          Proposez vos projets ou rejoignez des actions concrètes pour bâtir la paix.
        </p>
      </div>

      {/* FORM */}
      <div className="mb-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-bold text-slate-900 flex items-center gap-2">
          <PlusCircle size={18} className="text-blue-600" />
          Lancer une nouvelle initiative
        </h2>
        
        <div className="space-y-4">
          <div>
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              placeholder="Titre de l'initiative"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <select
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-bold text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="PAIX">🕊️ Paix</option>
                <option value="VBG">🛡️ VBG</option>
                <option value="DIALOGUE">💬 Dialogue</option>
                <option value="COHESION">🤝 Cohésion</option>
                <option value="JEUNESSE">⚡ Jeunesse</option>
              </select>
            </div>

            <div>
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
                placeholder="Localisation (ex: Lomé, Paris...)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div>
            <textarea
              className="min-h-[100px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              placeholder="Décrivez l'objectif et l'impact de votre action..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 pt-4">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100 hover:text-blue-600">
              <ImageIcon size={16} />
              <span>{image ? "Image sélectionnée" : "Ajouter une photo"}</span>
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </label>

            <button
              onClick={handleCreate}
              disabled={!title.trim() || !description.trim()}
              className="rounded-xl bg-green-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-green-700 active:scale-98 disabled:pointer-events-none disabled:opacity-40"
            >
              Créer l'initiative
            </button>
          </div>
        </div>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-blue-600" size={28} />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((i) => (
            <div
              key={i.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
            >
              <div>
                {i.image && (
                  <div className="border-b border-slate-100 bg-slate-50">
                    <img
                      src={i.image}
                      alt={i.title}
                      className="max-h-48 w-full object-cover"
                    />
                  </div>
                )}

                <div className="p-5">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700 border border-blue-100">
                      <Tag size={12} />
                      {i.category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
                      <MapPin size={12} className="text-slate-500" />
                      {i.location}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 leading-snug">
                    {i.title}
                  </h2>

                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700 line-clamp-4">
                    {i.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3">
                <div className="rounded-full bg-slate-200 p-1 text-slate-600">
                  <User size={14} />
                </div>
                <span className="text-xs font-bold text-slate-700">
                  Par {i.author_name}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}