"use client";

import { useState } from "react";
import { Search, Menu, X, ChevronDown, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Courses", href: "/courses" },
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "About", href: "/about" },
];

const CATEGORY_LINKS = [
  "AI & Machine Learning",
  "Web Development",
  "Video Editing",
  "Design",
  "Marketing",
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-6">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="text-[15px] font-bold tracking-tight text-slate-900">
            tutorial<span className="text-indigo-600">app</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
                  {link.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      categoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {categoriesOpen && (
                  <div className="absolute left-0 top-full w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-900/5">
                    {CATEGORY_LINKS.map((cat) => (
                      <a
                        key={cat}
                        href="#"
                        className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      >
                        {cat}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* Search bar (desktop) */}
        <div className="ml-auto hidden flex-1 max-w-xs items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 transition-colors focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 md:flex">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        {/* CTA (desktop) */}
        <a
          href="#get-started"
          className="hidden shrink-0 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 md:inline-block"
        >
          Get Started
        </a>

        {/* Mobile: search icon + hamburger */}
        <div className="ml-auto flex items-center gap-1 md:hidden">
          <button
            aria-label="Search"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-50"
            onClick={() => setMobileOpen(true)}
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="Menu"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
          {/* search */}
          <div className="mb-4 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* links */}
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#get-started"
            className="mt-4 block rounded-full bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}
