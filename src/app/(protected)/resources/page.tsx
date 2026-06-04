"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Search,
  FileText,
  Video,
  Headphones,
  BookOpen,
  LayoutGrid,
  User,
  Calendar,
  Loader2,
  Star,
} from "lucide-react";

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

export default function ResourcesPage() {
  const router = useRouter();

  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const loadResources = async () => {
    try {
      const res = await api.get("/api/resources/");
      setResources(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Impossible de charger les ressources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        resource.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        filter === "ALL"
          ? true
          : resource.resource_type === filter;

      return matchesSearch && matchesType;
    });
  }, [resources, search, filter]);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return (
          <FileText
            className="text-red-500"
            size={24}
          />
        );

      case "VIDEO":
        return (
          <Video
            className="text-blue-500"
            size={24}
          />
        );

      case "PODCAST":
        return (
          <Headphones
            className="text-purple-500"
            size={24}
          />
        );

      case "ARTICLE":
        return (
          <BookOpen
            className="text-emerald-500"
            size={24}
          />
        );

      default:
        return (
          <LayoutGrid
            className="text-slate-500"
            size={24}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <Loader2
          className="animate-spin text-blue-600"
          size={32}
        />
        <p className="mt-3 text-sm font-semibold text-slate-700">
          Chargement de la bibliothèque...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">

      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Ressources éducatives
          </h1>

          <p className="mt-2 text-base font-medium text-slate-600">
            Accédez aux guides pratiques,
            documentations, podcasts et
            partages de connaissances de la
            communauté.
          </p>
        </div>

        <Link
          href="/resources/favorites"
          className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 text-sm font-bold text-white shadow transition hover:bg-yellow-600"
        >
          <Star size={18} />
          Mes favoris
        </Link>
      </div>

      {/* FILTRES */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">

        <div className="relative flex-1">
          <Search
            className="absolute top-3.5 left-4 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Rechercher un guide, un article, un mot-clé..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-11 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="min-w-[160px] cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition-all focus:border-blue-500"
        >
          <option value="ALL">
            Tous formats
          </option>

          <option value="PDF">
            Documents PDF
          </option>

          <option value="VIDEO">
            Vidéos
          </option>

          <option value="PODCAST">
            Podcasts
          </option>

          <option value="ARTICLE">
            Articles
          </option>
        </select>
      </div>

      {/* LISTE */}
      {filteredResources.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <BookOpen
            className="mx-auto mb-3 text-slate-400"
            size={36}
          />

          <p className="text-sm font-bold text-slate-800">
            Aucune ressource trouvée
          </p>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Ajustez vos filtres ou affinez
            votre mot-clé de recherche.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              onClick={() =>
                router.push(
                  `/resources/${resource.id}`
                )
              }
              className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
            >
              <div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 transition-colors group-hover:bg-white">
                  {getResourceIcon(
                    resource.resource_type
                  )}
                </div>

                <h2 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-600">
                  {resource.title}
                </h2>

                <p className="mb-4 line-clamp-3 text-sm font-medium leading-relaxed text-slate-600">
                  {resource.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
                <div className="flex max-w-[150px] items-center gap-1.5 truncate">
                  <User
                    size={14}
                    className="shrink-0 text-slate-400"
                  />

                  <span className="truncate">
                    {resource.creator_name}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-1 font-semibold text-slate-400">
                  <Calendar size={14} />

                  <span>
                    {new Date(
                      resource.created_at
                    ).toLocaleDateString(
                      "fr-FR"
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

