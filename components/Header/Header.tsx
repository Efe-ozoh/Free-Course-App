"use client";

import { FormEvent, useState } from "react";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import logo from "@/public/logo.png";

const NAV_LINKS: Array<{ label: string; href: string; hasDropdown?: boolean }> = [
  { label: "Home", href: "/" },
  { label: "Terms Of Use", href: "/terms" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Always send searches to the course library, even when submitted from a detail page.
    const search = new FormData(event.currentTarget).get("search")?.toString().trim() ?? "";
    router.push(search ? `/?search=${encodeURIComponent(search)}` : "/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-6">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Image 
            src={logo}
            alt="Eduliver Logo" />
          </span>
          <span className="text-[15px] font-bold tracking-tight text-[var(--foreground)]">
            Edu<span className="text-indigo-600">liver</span>
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
               
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* Search bar (desktop) */}
        <form onSubmit={handleSearch} className="ml-auto hidden max-w-xs flex-1 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3.5 py-2 transition-colors focus-within:border-indigo-300 focus-within:bg-[var(--surface)] focus-within:ring-2 focus-within:ring-indigo-100 md:flex">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input name="search" type="search" placeholder="Search courses..." className="w-full bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none" />
        </form>

        {/* CTA (desktop) */}
        <a
          href="#get-started"
          className="hidden shrink-0 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 md:inline-block"
        >
          Get Started
        </a>

        {/* Mobile: search icon + hamburger */}
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <div className="flex md:hidden">
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
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--surface)] px-5 py-4 md:hidden">
          {/* search */}
          <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input name="search" type="search" placeholder="Search courses..." className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none" />
          </form>

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
