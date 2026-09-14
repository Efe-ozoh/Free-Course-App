"use client";

import { motion } from "framer-motion";
import CourseImage from "./CourseImage";

interface CourseCardProps {
  category?: string;
  title: string;
  image?: string;
  href?: string;
}

export default function CourseCard({
  category = "All Courses",
  title,
  image,
  href = "#",
}: CourseCardProps) {
  // The whole card is a link so browsing a course does not require a separate button.
  return (
    <motion.a
      href={href}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group block w-full max-w-sm overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-lg shadow-black/10"
    >
      {/* Collage header */}
      <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-[#1b2038] via-[#141726] to-[#0d0f18]">
        <CourseImage src={image} alt={`${title} cover`} className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105" />
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0f18]/80 via-transparent to-transparent" />

      
      
      </div>

      {/* Body */}
      <div className="space-y-2 px-5 py-4">
        <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-300 ring-1 ring-white/10">
          {category}
        </span>
        <h3 className="text-[15px] font-semibold leading-snug text-[var(--foreground)] transition-colors group-hover:text-indigo-500">
          {title}
        </h3>
      </div>
    </motion.a>
  );
}
