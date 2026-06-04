// src/components/layout/Header.tsx

"use client";

import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="font-semibold">
          YouthPeace
        </h2>
      </div>

      <button className="rounded-full p-2 hover:bg-slate-100">
        <Bell size={20} />
      </button>
    </header>
  );
}
