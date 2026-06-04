// src/components/layout/BottomNav.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  GraduationCap,
  User,
} from "lucide-react";

const links = [
  {
    href: "/feed",
    icon: Home,
    label: "Feed",
  },
  {
    href: "/academy",
    icon: GraduationCap,
    label: "Academy",
  },
  {
    href: "/profile",
    icon: User,
    label: "Profil",
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
      <div className="grid grid-cols-3">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-3 ${
                pathname === item.href
                  ? "text-blue-600"
                  : "text-slate-500"
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

