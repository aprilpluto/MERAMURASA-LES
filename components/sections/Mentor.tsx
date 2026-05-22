"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ASSETS, SITE } from "@/lib/constants";
import { copyToClipboard } from "@/lib/hooks";

type Props = { onToast: (msg: string) => void };

export default function Mentor({ onToast }: Props) {
  const handleCopyEmail = async () => {
    const ok = await copyToClipboard(SITE.email);
    onToast(ok ? "Email tersalin!" : "Gagal menyalin");
  };

  return (
    <section id="mentor" className="relative z-[1] bg-section-blue">
      <div className="section-inner grid items-start gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
        <Reveal>
          <div className="glass-card relative mx-auto max-w-md p-8 lg:mx-0">
            <span className="absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-gold" />
            <span className="absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-gold" />

            <div className="relative mb-6 aspect-square w-full overflow-hidden bg-gradient-to-br from-navy via-blue to-azure">
              <Image
                src={ASSETS.mentor}
                alt={`Foto profil ${SITE.founder}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 380px"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            </div>

            <p className="mb-1 font-serif text-2xl text-cream">{SITE.founder}</p>
            <p className="mb-6 text-[0.65rem] uppercase tracking-[0.2em] text-gold">
              Founder & Mentor Utama · Meramu Rasa
            </p>

            <div className="flex gap-2">
              <Link
                href={SITE.emailUrl}
                className="flex h-9 w-9 items-center justify-center border border-glow/25 text-text-dim transition hover:border-gold hover:text-gold"
                title="Email"
              >
                ✉
              </Link>
              <Link
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center border border-glow/25 text-text-dim transition hover:border-gold hover:text-gold"
                title="WhatsApp"
              >
                W
              </Link>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex h-9 w-9 items-center justify-center border border-glow/25 text-text-dim transition hover:border-gold hover:text-gold"
                title="Salin Email"
              >
                @
              </button>
            </div>

            <Link
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 border border-[#25d366]/30 bg-[#25d366]/10 px-4 py-2.5 text-[0.68rem] uppercase tracking-wider text-[#25d366] transition hover:bg-[#25d366]/20"
            >
              Hubungi via WhatsApp
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <p className="section-label">Mentor Utama</p>
          <h2 className="section-title">
            Bimbingan dari
            <br />
            Jiwa yang <em>Menulis</em>
          </h2>
          <div className="divider-line" />
          <div className="space-y-4 font-serif text-lg font-light leading-relaxed text-text-dim">
            <p>
              Ardi Kamal Karima adalah seorang penulis dan pendidik sastra yang
              percaya bahwa puisi bukan sekadar seni — ia adalah cara manusia
              berbicara kepada dirinya sendiri dan kepada dunia dengan kejujuran
              paling murni.
            </p>
            <p>
              Dengan pengalaman mendalam dalam dunia cipta sastra, Ardi mendirikan{" "}
              <em>Meramu Rasa</em> sebagai ruang yang hangat, personal, dan penuh
              inspirasi bagi siapapun yang ingin belajar menulis puisi — tanpa
              memandang latar belakang atau pengalaman sebelumnya.
            </p>
            <p>
              Setiap sesi bimbingan dirancang untuk menyentuh inti kreativitas Anda:
              mengeksplorasi emosi, membangun kepekaan bahasa, dan menemukan suara
              puitis Anda yang paling autentik.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "Cipta Puisi",
              "Sastra Modern",
              "Pendidikan Kreatif",
              "Bimbingan Personal",
              "Apresiasi Sastra",
            ].map((tag) => (
              <span
                key={tag}
                className="border border-gold/30 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-gold"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
