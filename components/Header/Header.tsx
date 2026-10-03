"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import logo from "@/public/logo.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Terms Of Use", href: "/terms" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Image 
            src={logo}
            alt="Eduliver Logo" />
          </span>
          <span className="text-[15px] font-bold tracking-tight text-[var(--foreground)]">
            Edu<span className="text-indigo-600">liver</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <div className="flex md:hidden">
          <button
            aria-label="Menu"
            aria-expanded={mobileOpen}
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
          {/* links */}
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
