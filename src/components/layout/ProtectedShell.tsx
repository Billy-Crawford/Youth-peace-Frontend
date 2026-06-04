// src/components/layout/ProtectedShell.tsx

import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import Header from "./Header";

export default function ProtectedShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-6 pb-24 md:pb-6">
          {children}
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
