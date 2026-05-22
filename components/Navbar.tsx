"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ASSETS, NAV_LINKS, SITE } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-6 py-5 transition-all duration-500 md:px-10 ${
          scrolled
            ? "border-b border-glow/20 bg-ink/92 py-4 backdrop-blur-xl"
            : ""
        }`}
      >
        <Link
          href="#hero"
          className="flex items-center gap-3 font-serif text-xl font-semibold tracking-wide text-cream"
        >
          <Image
            src={ASSETS.logo}
            alt={`Logo ${SITE.name}`}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span>
            Meramu<span className="text-gold">Rasa</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[0.72rem] uppercase tracking-[0.2em] text-text-dim transition-colors hover:text-gold-light"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={SITE.whatsappRegisterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline hidden text-[0.68rem] md:inline-block"
        >
          Daftar Les
        </Link>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-1 md:hidden"
          aria-label="Buka menu"
          onClick={() => setMobileOpen(true)}
        >
          <span className="block h-0.5 w-6 bg-text-dim" />
          <span className="block h-0.5 w-6 bg-text-dim" />
          <span className="block h-0.5 w-6 bg-text-dim" />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 bg-ink/97 transition-opacity md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          className="absolute right-6 top-6 text-3xl text-text-dim"
          aria-label="Tutup menu"
          onClick={() => setMobileOpen(false)}
        >
          ×
        </button>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-lg uppercase tracking-[0.3em] text-text-dim hover:text-gold-light"
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href={SITE.whatsappRegisterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          onClick={() => setMobileOpen(false)}
        >
          Daftar Les
        </Link>
      </div>
    </>
  );
}
