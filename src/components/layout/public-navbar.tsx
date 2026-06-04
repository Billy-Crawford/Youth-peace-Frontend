// src/components/layout/public-navbar.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/img/yp-rbg.png"
            alt="YouthPeace"
            width={42}
            height={42}
            priority
            className="object-contain"
          />

          <span className="text-xl font-bold text-slate-900">
            YouthPeace
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            Accueil
          </Link>

          <Link
            href="/login"
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            Connexion
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            Inscription
          </Link>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="flex flex-col p-4">
            <Link
              href="/"
              className="rounded-lg px-4 py-3 hover:bg-slate-100"
            >
              Accueil
            </Link>

            <Link
              href="/login"
              className="rounded-lg px-4 py-3 hover:bg-slate-100"
            >
              Connexion
            </Link>

            <Link
              href="/register"
              className="mt-2 rounded-lg bg-blue-600 px-4 py-3 text-center text-white"
            >
              Inscription
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

