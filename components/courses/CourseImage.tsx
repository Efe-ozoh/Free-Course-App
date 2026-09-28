"use client";

import { useState } from "react";

type CourseImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

export default function CourseImage({ src, alt, className = "" }: CourseImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div aria-label={alt} role="img" className={`bg-gradient-to-br from-indigo-600 via-slate-800 to-cyan-700 ${className}`} />
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}