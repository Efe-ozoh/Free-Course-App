import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Terms of use", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Eduliver home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Image src={logo} alt="" />
          </span>
          <span className="text-[15px] font-bold tracking-tight text-[var(--foreground)]">
            Edu<span className="text-indigo-600">liver</span>
          </span>
        </Link>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-sm text-[var(--muted)]">© {new Date().getFullYear()} Eduliver</p>
      </div>
    </footer>
  );
}