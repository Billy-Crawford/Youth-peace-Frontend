// src/app/page.tsx

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  MessageCircle,
  Shield,
  Users,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50/50 text-slate-900 antialiased">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/70 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          <Link href="/" className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl p-1">
            <div className="transition group-hover:scale-105 duration-300">
              <Image
                src="/img/yp-rbg.png"
                alt="YouthPeace"
                width={46}
                height={46}
                priority
                className="object-contain"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text">
                YouthPeace
              </h1>
              <p className="text-xs font-medium text-slate-500 tracking-wide">
                Building Peace Together
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Connexion
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/10 transition-all hover:bg-blue-700 hover:shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-98"
            >
              Inscription
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100">
        {/* Background Gradients Délicats */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/70 via-transparent to-green-50/50" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            {/* LEFT */}
            <div className="flex flex-col items-start lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                🌍 Plateforme numérique pour la paix
              </span>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:leading-[1.15]">
                Construisons une jeunesse{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  engagée pour la paix.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                YouthPeace connecte les jeunes, les organisations et les
                communautés autour de l'éducation à la paix, du dialogue,
                de la prévention des conflits et de l'engagement citoyen.
              </p>

              <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-98"
                >
                  Rejoindre YouthPeace
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-98"
                >
                  Se connecter
                </Link>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex justify-center lg:col-span-5">
              <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
                {/* Halo lumineux */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-green-400 blur-3xl opacity-20 animate-spin-slow" />
                <div className="absolute -inset-4 rounded-full bg-slate-100/50 border border-slate-200/60 shadow-inner scale-95" />
                
                <div className="relative p-8 drop-shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-transform duration-700 hover:rotate-3">
                  <Image
                    src="/img/yp-rbg.png"
                    alt="YouthPeace Illustration"
                    width={380}
                    height={380}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="relative z-10 -mt-8 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-slate-200/60 bg-white/90 p-4 shadow-xl shadow-slate-200/50 backdrop-blur-md md:grid-cols-4 md:p-6">
            <div className="flex flex-col items-center justify-center rounded-2xl py-6 px-4 transition-colors hover:bg-slate-50">
              <span className="text-3xl font-extrabold tracking-tight text-blue-600 md:text-4xl">
                100+
              </span>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Jeunes engagés
              </p>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl py-6 px-4 transition-colors hover:bg-slate-50 border-l border-slate-100 max-md:border-l-0">
              <span className="text-3xl font-extrabold tracking-tight text-green-600 md:text-4xl">
                50+
              </span>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Cours disponibles
              </p>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl py-6 px-4 transition-colors hover:bg-slate-50 border-l border-slate-100">
              <span className="text-3xl font-extrabold tracking-tight text-purple-600 md:text-4xl">
                20+
              </span>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Initiatives
              </p>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl py-6 px-4 transition-colors hover:bg-slate-50 border-l border-slate-100">
              <span className="text-3xl font-extrabold tracking-tight text-red-500 md:text-4xl">
                24/7
              </span>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Accès plateforme
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Une plateforme complète
            </h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-blue-600" />
            <p className="mt-4 text-lg text-slate-600">
              Tout ce dont vous avez besoin pour apprendre, échanger et agir efficacement.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="group relative rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/5">
              <div className="inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                YouthPeace Academy
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Cours complets, modules interactifs, quiz et obtention de certificats numériques.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-md hover:shadow-green-500/5">
              <div className="inline-flex rounded-2xl bg-green-50 p-3 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-bold text-slate-900 group-hover:text-green-600 transition-colors">
                Community
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Publications, espaces d'échanges collaboratifs et portage d'initiatives citoyennes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-md hover:shadow-purple-500/5">
              <div className="inline-flex rounded-2xl bg-purple-50 p-3 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                Messagerie
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Communiquez instantanément et en toute sécurité avec l'ensemble des membres.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group relative rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-md hover:shadow-red-500/5">
              <div className="inline-flex rounded-2xl bg-red-50 p-3 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                Peace Map
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Outils de cartographie, signalement précoce des tensions et prévention active.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 sm:px-8 mb-12">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 py-20 px-8 text-white shadow-xl shadow-blue-900/10 text-center">
          {/* Motifs géométriques décoratifs en arrière-plan */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
          
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Rejoignez le mouvement YouthPeace
            </h2>

            <p className="mt-4 text-base sm:text-lg text-blue-100/90 leading-relaxed">
              Ensemble, favorisons le dialogue inclusif, renforçons la cohésion sociale et
              propulsons l'engagement d'une jeunesse actrice du changement.
            </p>

            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-blue-600 shadow-md shadow-black/5 transition-all hover:bg-slate-50 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-98"
            >
              Créer un compte
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200/60 bg-white py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 text-center">
          <div className="rounded-2xl bg-slate-50 p-1.5 border border-slate-100 transition-transform hover:scale-105">
            <Image
              src="/img/yp-rbg.png"
              alt="YouthPeace Logo"
              width={46}
              height={46}
              className="object-contain"
            />
          </div>

          <p className="text-sm font-medium text-slate-500">
            © 2026 YouthPeace — Tous droits réservés.
          </p>
        </div>
      </footer>
    </main>
  );
}

