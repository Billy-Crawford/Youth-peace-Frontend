// src/app/(protected)/academy/page.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { BookOpen, User, Calendar, Loader2 } from "lucide-react";

import api from "@/lib/api";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  creator_name: string;
  created_at: string;
  is_published: boolean;
}

export default function AcademyPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCourses = async () => {
    try {
      const res = await api.get("/api/academy/courses/");
      setCourses(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Impossible de charger les cours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
        <p className="mt-3 text-sm font-semibold text-slate-700">Chargement du catalogue...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          YouthPeace Academy
        </h1>
        <p className="mt-2 text-base font-medium text-slate-600">
          Développez vos compétences en consolidation de la paix, leadership citoyen et gestion de projet.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <BookOpen className="mx-auto text-slate-400 mb-3" size={40} />
          <p className="text-sm font-bold text-slate-800">Aucun cours n'est disponible pour le moment.</p>
          <p className="text-xs font-medium text-slate-500 mt-1">Revenez très bientôt pour de nouveaux modules !</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100 border-b border-slate-100">
                  <Image
                    src={
                      course.thumbnail ||
                      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                    }
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-102"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold text-slate-900 leading-snug line-clamp-2 mb-2">
                    {course.title}
                  </h2>

                  <p className="text-sm font-medium leading-relaxed text-slate-700 line-clamp-3 mb-4">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 bg-slate-50/50 p-5">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <User size={14} className="text-slate-500" />
                    <span className="truncate max-w-[140px]">{course.creator_name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                    <Calendar size={14} className="text-slate-400" />
                    <span>{new Date(course.created_at).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>

                <Link
                  href={`/academy/${course.id}`}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700 active:scale-98 shadow-sm"
                >
                  Suivre le cours
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
