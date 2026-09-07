"use client";

import { motion } from "framer-motion";

interface CourseCardProps {
  category?: string;
  title: string;
  href?: string;
}

export default function CourseCard({
  category = "All Courses",
  title,
  href = "#",
}: CourseCardProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group block w-full max-w-sm overflow-hidden rounded-2xl bg-[#12141c] shadow-lg shadow-black/20 ring-1 ring-white/5"
    >
      {/* Collage header */}
      <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-[#1b2038] via-[#141726] to-[#0d0f18]">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-6 bottom-0 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl" />

      
      
      </div>

      {/* Body */}
      <div className="space-y-2 px-5 py-4">
        <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-300 ring-1 ring-white/10">
          {category}
        </span>
        <h3 className="text-[15px] font-semibold leading-snug text-white transition-colors group-hover:text-indigo-300">
          {title}
        </h3>
      </div>
    </motion.a>
  );
}
