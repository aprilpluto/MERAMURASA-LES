"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/constants";
import { copyToClipboard } from "@/lib/hooks";

type Props = { onToast: (msg: string) => void };

export default function Contact({ onToast }: Props) {
  const copy = async (text: string, msg: string) => {
    const ok = await copyToClipboard(text);
    onToast(ok ? msg : "Gagal menyalin");
  };

  return (
    <section id="kontak" className="relative z-[1] bg-section-blue">
      <div className="section-inner">
        <Reveal className="text-center">
          <p className="section-label">Pemesanan & Konsultasi</p>
          <h2 className="section-title">
            Hubungi <em>Kami</em>
          </h2>
          <div className="divider-line mx-auto" />
        </Reveal>

        <Reveal>
          <blockquote className="mx-auto mt-8 max-w-2xl border-l-2 border-gold/50 bg-gradient-to-r from-azure/10 to-transparent py-4 pl-6 font-serif text-lg font-light italic leading-relaxed text-text-dim">
            Les akan dilaksanakan satu hari setelah proses pembayaran dikonfirmasi
            dengan melampirkan bukti transfer/pembayaran ke nomor WhatsApp yang
            diberikan. Terima kasih atas kepercayaan Anda dalam memilih layanan les
            kami.
            <footer className="mt-4 not-italic text-gold-light">
              — Salam Meramu Rasa.
            </footer>
          </blockquote>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="glass-card p-8 transition hover:border-glow/40">
              <p className="mb-2 text-[0.65rem] uppercase tracking-wider text-text-muted">
                WhatsApp Resmi
              </p>
              <p className="mb-6 font-serif text-2xl text-cream">{SITE.whatsapp}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#25d366]/40 bg-[#25d366]/15 px-5 py-2 text-[0.68rem] uppercase tracking-wider text-[#25d366] transition hover:bg-[#25d366]/25"
                >
                  Buka WhatsApp
                </Link>
                <button
                  type="button"
                  onClick={() => copy(SITE.whatsappRaw, "Nomor WA tersalin!")}
                  className="border border-glow/30 px-5 py-2 text-[0.68rem] uppercase tracking-wider text-text-dim transition hover:border-gold hover:text-gold"
                >
                  Salin
                </button>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="glass-card p-8 transition hover:border-glow/40">
              <p className="mb-2 text-[0.65rem] uppercase tracking-wider text-text-muted">
                Email Resmi
              </p>
              <p className="mb-6 font-serif text-2xl text-cream">{SITE.email}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={SITE.emailUrl}
                  className="border border-azure/40 bg-azure/15 px-5 py-2 text-[0.68rem] uppercase tracking-wider text-mist transition hover:bg-azure/25"
                >
                  Kirim Email
                </Link>
                <button
                  type="button"
                  onClick={() => copy(SITE.email, "Email tersalin!")}
                  className="border border-glow/30 px-5 py-2 text-[0.68rem] uppercase tracking-wider text-text-dim transition hover:border-gold hover:text-gold"
                >
                  Salin
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
