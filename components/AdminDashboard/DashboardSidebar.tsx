import Link from "next/link";
import { BookOpen, LayoutDashboard, LogOut, Users } from "lucide-react";

export default function DashboardSidebar({ onLogout }: { onLogout: () => void }) {
  // Navigation and sign-out stay separate from the dashboard's course data concerns.
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-[#17332d] px-5 py-7 text-white lg:flex">
      <div className="flex items-center gap-3 px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e37445] text-lg font-black">T</div>
        <div>
          <p className="font-bold tracking-tight">Tutorial Lab</p>
          <p className="text-xs text-[#a8c1b8]">Admin workspace</p>
        </div>
      </div>
      <nav className="mt-12 space-y-2">
        <div className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3 text-sm font-semibold"><LayoutDashboard size={17} /> Overview</div>
        <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#a8c1b8] transition hover:bg-white/10 hover:text-white"><BookOpen size={17} /> Courses</Link>
        <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#a8c1b8]"><Users size={17} /> Learners</div>
      </nav>
      <div className="mt-auto rounded-2xl bg-[#24463d] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9dbbb0]">Keep building</p>
        <p className="mt-2 text-sm leading-6 text-white/90">A good course library is built one clear lesson at a time.</p>
      </div>
      <button onClick={onLogout} className="mt-6 flex items-center gap-3 px-3 py-2 text-sm text-[#a8c1b8] transition hover:text-white"><LogOut size={17} /> Sign out</button>
    </aside>
  );
}
