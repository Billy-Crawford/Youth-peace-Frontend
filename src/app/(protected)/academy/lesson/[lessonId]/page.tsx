// src/app/(protected)/academy/lesson/[lessonId]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, CheckCircle2, FileText, Video, Loader2 } from "lucide-react";

import api from "@/lib/api";

interface Lesson {
  id: string;
  module: string;
  module_title: string;
  title: string;
  content: string;
  pdf: string | null;
  video_url: string | null;
  order: number;
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  const loadLesson = async () => {
    try {
      const res = await api.get(`/api/academy/lessons/${lessonId}/`);
      setLesson(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Impossible de charger la leçon");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lessonId) loadLesson();
  }, [lessonId]);

  const completeLesson = async () => {
    try {
      setCompleting(true);
      await api.post(`/api/academy/lessons/${lessonId}/complete/`, {});
      toast.success("Leçon marquée comme terminée !");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la validation");
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
        <p className="mt-3 text-sm font-semibold text-slate-700">Chargement des ressources de la leçon...</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="mx-auto max-w-md py-12 text-center text-sm font-bold text-slate-800">
        Leçon introuvable ou inexistante.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      {/* RETOUR & MODULE METADATA */}
      <div className="mb-4 flex flex-col gap-2 items-start">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={14} />
          Retour au cours
        </button>
        <span className="inline-block rounded-md bg-blue-50 border border-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
          Module : {lesson.module_title}
        </span>
      </div>

      <h1 className="text-2xl font-black text-slate-900 sm:text-3xl tracking-tight mb-6">
        {lesson.title}
      </h1>

      {/* TEXT CONTENT CARD */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-slate-800">
          {lesson.content}
        </p>
      </div>

      {/* ATTACHMENTS SECTION */}
      {(lesson.video_url || lesson.pdf) && (
        <div className="mb-6 space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">Ressources associées</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {lesson.video_url && (
              <a
                href={lesson.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-red-700 transition-colors"
              >
                <Video size={16} />
                Visionner le support vidéo
              </a>
            )}

            {lesson.pdf && (
              <a
                href={lesson.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                <FileText size={16} />
                Télécharger le document PDF
              </a>
            )}
          </div>
        </div>
      )}

      {/* ACTION COMPLETED */}
      <div className="border-t border-slate-200 pt-5 mt-6">
        <button
          onClick={completeLesson}
          disabled={completing}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-green-700 active:scale-98 disabled:opacity-50"
        >
          {completing ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <CheckCircle2 size={18} />
          )}
          Marquer cette leçon comme terminée
        </button>
      </div>
    </div>
  );
}

