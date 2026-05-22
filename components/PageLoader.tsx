"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ASSETS } from "@/lib/constants";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-ink"
      aria-hidden={!loading}
    >
      <Image
        src={ASSETS.logo}
        alt="Logo Meramu Rasa"
        width={72}
        height={72}
        className="h-[72px] w-[72px] object-contain"
        priority
      />
      <div className="mt-6 h-10 w-10 animate-spin rounded-full border-2 border-glow/30 border-t-glow" />
      <p className="mt-4 font-serif text-lg italic text-gold-light">Meramu Rasa</p>
      <p className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-text-muted">
        Memuat...
      </p>
    </div>
  );
}
