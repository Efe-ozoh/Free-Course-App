import { Search, SlidersHorizontal } from "lucide-react";

export default function CourseFilters({ search, category, categories, onSearchChange, onCategoryChange }: { search: string; category: string; categories: string[]; onSearchChange: (value: string) => void; onCategoryChange: (value: string) => void }) {
  // The parent owns filter state; this component only renders controls and emits changes.
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row">
      <label className="relative block flex-1">
        <Search className="absolute left-3.5 top-3.5 text-[#82918c]" size={17} />
        <input type="text" placeholder="Search your courses" value={search} onChange={(event) => onSearchChange(event.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-[var(--muted)] focus:border-[#e37445] focus:ring-2 focus:ring-[#e37445]/10" />
      </label>
      <label className="relative">
        <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-3.5 text-[#82918c]" size={16} />
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)} className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-10 text-sm font-semibold outline-none focus:border-[#e37445] sm:w-48">
          <option value="All">All categories</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
    </div>
  );
}
