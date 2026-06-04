"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Award, FileDown, CheckCircle, XCircle, FileQuestion, Loader2 } from "lucide-react";

import api from "@/lib/api";

interface Choice {
  id: string;
  choice_text: string;
}

interface Question {
  id: string;
  question_text: string;
  choices: Choice[];
}

interface Quiz {
  id: string;
  title: string;
  passing_score: number;
  questions: Question[];
}

export default function QuizPage() {
  const params = useParams();
  const quizId = params?.quizId as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        if (!quizId) return;
        const res = await api.get(`/api/academy/quizzes/${quizId}/`);
        setQuiz(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger l'évaluation");
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId]);

  const selectAnswer = (questionId: string, choiceId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: choiceId,
    }));
  };

  const submitQuiz = async () => {
    if (quiz && Object.keys(answers).length < quiz.questions.length) {
      toast.error("Veuillez répondre à toutes les questions avant de soumettre");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        answers: Object.entries(answers).map(([question_id, choice_id]) => ({
          question_id,
          choice_id,
        })),
      };

      const res = await api.post(`/api/academy/quizzes/${quizId}/submit/`, payload);
      setResult(res.data);
      toast.success("Quiz soumis avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la soumission de vos réponses");
    } finally {
      setSubmitting(false);
    }
  };

  const downloadCertificate = (certificateNumber: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    window.open(`${baseUrl}/api/certificates/${certificateNumber}/download/`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={28} />
        <p className="mt-3 text-sm font-semibold text-slate-700">Chargement de votre fiche de quiz...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="mx-auto max-w-md py-12 text-center text-sm font-bold text-slate-800">
        Évaluation introuvable.
      </div>
    );
  }

  /* RENDER RESULT ONCE SUBMITTED */
  if (result) {
    const hasCertificate = Boolean(result.certificate);

    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:py-10">
        <h1 className="text-2xl font-black text-slate-900 mb-6">Résultat de votre évaluation</h1>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-slate-50/50 p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Score Final obtenu</p>
              <p className="text-3xl font-black text-slate-900">{result.score}%</p>
            </div>
            <div className="text-right text-sm font-bold text-slate-800 space-y-0.5">
              <p><span className="text-emerald-600">{result.correct_answers}</span> Réponses correctes</p>
              <p className="text-slate-500 font-medium">{result.total_questions} Questions totales</p>
            </div>
          </div>

          <div className="p-6">
            {result.passed ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5 text-emerald-900 space-y-4">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="text-emerald-600 shrink-0" size={22} />
                  <span className="text-base font-extrabold">Félicitations ! Vous avez validé ce module.</span>
                </div>
                <p className="text-sm font-medium leading-relaxed text-emerald-800">
                  Votre maîtrise du sujet est confirmée. Votre certificat officiel porte le numéro d'enregistrement unique : <strong className="font-bold">{result.certificate}</strong>.
                </p>

                {hasCertificate && (
                  <button
                    onClick={() => downloadCertificate(result.certificate)}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
                  >
                    <FileDown size={16} />
                    Télécharger mon certificat officiel
                  </button>
                )}
              </div>
            ) : (
              <div className="rounded-2xl bg-rose-50 border border-rose-100 p-5 text-rose-900">
                <div className="flex items-center gap-2.5 mb-2">
                  <XCircle className="text-rose-600 shrink-0" size={22} />
                  <span className="text-base font-extrabold">Le score requis n'a pas été atteint.</span>
                </div>
                <p className="text-sm font-medium leading-relaxed text-rose-800">
                  Ne vous découragez pas ! Nous vous invitons à relire posément les chapitres de la leçon, puis à retenter votre chance à l'évaluation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-6 flex items-center gap-2.5">
        <div className="rounded-xl bg-blue-50 p-2 text-blue-600 border border-blue-100">
          <FileQuestion size={20} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{quiz.title}</h1>
      </div>

      {/* QUESTIONS GENERATOR */}
      <div className="space-y-4">
        {quiz.questions.map((q, qIndex) => (
          <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-start gap-2">
              <span className="text-xs bg-slate-100 text-slate-700 font-extrabold px-2 py-0.5 rounded mt-0.5">
                Q{qIndex + 1}
              </span>
              <span>{q.question_text}</span>
            </h2>

            <div className="grid gap-2">
              {q.choices.map((c) => {
                const isSelected = answers[q.id] === c.id;
                return (
                  <label
                    key={c.id}
                    className={`flex items-center gap-3 rounded-xl border p-3.5 transition-all cursor-pointer text-sm font-bold select-none
                      ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/50 text-slate-900"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500/20"
                      checked={isSelected}
                      onChange={() => selectAnswer(q.id, c.id)}
                    />
                    <span>{c.choice_text}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* SUBMISSION BLOCK */}
      <div className="mt-6 border-t border-slate-200 pt-5">
        <button
          onClick={submitQuiz}
          disabled={submitting || Object.keys(answers).length < quiz.questions.length}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700 active:scale-98 disabled:pointer-events-none disabled:opacity-40"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Calcul de vos scores...
            </>
          ) : (
            <>
              <Award size={16} />
              Soumettre mes réponses pour correction
            </>
          )}
        </button>
      </div>
    </div>
  );
}