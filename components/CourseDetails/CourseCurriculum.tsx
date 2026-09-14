"use client";

import { useState } from "react";
import { ChevronDown, PlayCircle } from "lucide-react";

export interface CurriculumSection {
  title: string;
  lessons: string[];
}

export default function CourseCurriculum({
  sections,
}: {
  sections: CurriculumSection[];
}) {
  // Only one section is expanded at a time to keep long curricula scannable.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200">
      {sections.map((section, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={section.title}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-indigo-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-semibold text-slate-900">
                  {section.title}
                </span>
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
              }`}
            >
              <ul className="min-h-0 space-y-2 px-5 pl-11 text-sm text-slate-600">
                {section.lessons.map((lesson) => (
                  <li key={lesson} className="flex items-start gap-2">
                    <PlayCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
