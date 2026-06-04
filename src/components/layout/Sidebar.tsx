"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Megaphone,
  GraduationCap,
  MapPinned,
  BookOpen,
  User,
  Compass,
} from "lucide-react";

const links = [
  { label: "Feed", href: "/feed", icon: Home },
  { label: "Initiatives", href: "/initiatives", icon: Megaphone },
//   { label: "Forum", href: "/forum", icon: Compass },
  { label: "Academy", href: "/academy", icon: GraduationCap },
  { label: "Map", href: "/map", icon: MapPinned },
  { label: "Resources", href: "/resources", icon: BookOpen },
  { label: "Profil", href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-72 sticky top-0 flex-col border-r border-slate-200/80 bg-white">
      {/* HEADER */}
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-2xl font-black tracking-tight text-blue-600">
          YouthPeace
        </h1>
        <p className="text-xs font-bold text-slate-600 mt-1 uppercase tracking-wider">
          Plateforme citoyenne
        </p>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >
              <Icon size={18} className={isActive ? "text-white" : "text-slate-500 group-hover:text-slate-900"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-100">
        <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs font-semibold text-slate-600 text-center">
          © YouthPeace 2026
        </div>
      </div>
    </aside>
  );
}