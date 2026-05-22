import Image from "next/image";
import Link from "next/link";
import { ASSETS, NAV_LINKS, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-glow/15 bg-deep/50 py-16">
      <div className="section-inner text-center">
        <div className="flex items-center justify-center gap-3">
          <Image
            src={ASSETS.logo}
            alt={`Logo ${SITE.name}`}
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
          <p className="font-serif text-2xl text-cream">
            Meramu<span className="text-gold">Rasa</span>
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-md font-serif text-lg font-light italic leading-relaxed text-text-dim">
          &ldquo;Di setiap kata yang dipilih dengan cermat,
          <br />
          tersimpan jiwa yang ingin dipahami.&rdquo;
        </p>
        <nav className="mt-8 flex flex-wrap justify-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted transition hover:text-gold-light"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#daftar"
            className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted transition hover:text-gold-light"
          >
            Pendaftaran
          </Link>
        </nav>
        <p className="mt-10 text-xs text-text-muted">
          © {new Date().getFullYear()} {SITE.name} · Bimbingan Cipta Puisi Daring ·{" "}
          {SITE.founder}
        </p>
      </div>
    </footer>
  );
}
