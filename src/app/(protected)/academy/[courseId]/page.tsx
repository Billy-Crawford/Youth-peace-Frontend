// src/app/(protected)/academy/[courseId]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChevronRight, PlayCircle, Award, BarChart3, BookMarked, Loader2 } from "lucide-react";

import api from "@/lib/api";

interface Lesson {
  id: string;
  title: string;
  content: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  modules: Module[];
}

interface Progress {
  course: string;
  total_lessons: number;
  completed_lessons: number;
  progress_percentage: number;
  completed: boolean;
  quiz_id: string | null;
}

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [courseRes, progressRes] = await Promise.all([
        api.get(`/api/academy/courses/${courseId}/`),
        api.get(`/api/academy/courses/${courseId}/progress/`),
      ]);
      setCourse(courseRes.data);
      setProgress(progressRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du chargement des détails du cours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) loadData();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={28} />
        <p className="mt-3 text-sm font-semibold text-slate-700">Préparation de votre espace de cours...</p>
      </div>
    );
  }

  if (!course || !progress) {
    return (
      <div className="mx-auto max-w-md py-12 text-center text-sm font-bold text-slate-800">
        Cours ou progression introuvable.
      </div>
    );
  }

  const handleGoQuiz = () => {
    if (!progress.quiz_id) {
      toast.error("Aucun quiz n'est rattaché à ce module d'apprentissage");
      return;
    }
    router.push(`/academy/quiz/${progress.quiz_id}`);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-10 space-y-8">
      {/* HEADER */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl tracking-tight">
          {course.title}
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3 md:items-start">
        {/* MODULES & LESSONS (COLUMNS 1 & 2) */}
        <div className="space-y-5 md:col-span-2">
          <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <BookMarked size={18} className="text-blue-600" />
            Programme d'études
          </h2>

          {course.modules.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 p-6 bg-white text-center text-sm font-semibold text-slate-600">
              Aucun chapitre ou leçon disponible dans ce cours.
            </div>
          ) : (
            course.modules.map((module) => (
              <div key={module.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                    {module.title}
                  </h3>
                </div>

                {module.lessons.length === 0 ? (
                  <p className="p-4 text-xs font-semibold text-slate-500 italic">Aucune leçon dans ce chapitre.</p>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => router.push(`/academy/lesson/${lesson.id}`)}
                        className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-slate-50/70 group"
                      >
                        <div className="flex items-center gap-3 pr-2">
                          <PlayCircle size={18} className="text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                          <span className="text-sm font-bold text-slate-800 group-hover:text-slate-900">
                            {lesson.title}
                          </span>
                        </div>
                        <ChevronRight size={16} className="text-slate-400 transition-transform group-hover:translate-x-0.5 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* PROGRESSION & QUIZ SIDEBAR (COLUMN 3) */}
        <div className="space-y-4 md:sticky md:top-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-4">
              <BarChart3 size={16} className="text-blue-600" />
              Votre Progression
            </h2>

            <div className="space-y-2 text-sm font-bold text-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Cours suivis :</span>
                <span>{progress.completed_lessons} / {progress.total_lessons}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Pourcentage :</span>
                <span className="text-blue-600">{progress.progress_percentage}%</span>
              </div>
            </div>

            {/* BAR CONTAINER */}
            <div className="mt-4 h-2 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200/40">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                style={{ width: `${progress.progress_percentage}%` }}
              />
            </div>
          </div>

          {/* QUIZ COMPLETION TRIGGER CARD */}
          {progress.quiz_id && (
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700 border border-green-100">
                <Award size={20} />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Évaluation finale</h3>
              <p className="mt-1 text-xs font-medium text-slate-600 mb-4">
                Validez vos connaissances pour débloquer votre certificat de réussite.
              </p>
              <button
                onClick={handleGoQuiz}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-green-600/10 transition-all hover:bg-green-700 active:scale-98"
              >
                Passer le quiz final
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
