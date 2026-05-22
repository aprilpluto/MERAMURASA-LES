"use client";

import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/constants";
import { FAQS, PROGRAM_CARDS } from "@/lib/data";

export default function Program() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="program" className="relative z-[1]">
      <div className="section-inner">
        <Reveal>
          <p className="section-label">Informasi Program</p>
          <h2 className="section-title">
            Program Les yang
            <br />
            <em>Dirancang</em> untuk Anda
          </h2>
          <div className="divider-line" />
          <p className="max-w-2xl font-serif text-lg font-light leading-relaxed text-text-dim">
            Setiap pertemuan adalah petualangan baru dalam dunia kata. Program les
            kami dirancang dengan penuh perhatian agar Anda dapat berkembang di
            setiap langkah perjalanan kreatif Anda.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAM_CARDS.map((card) => (
            <Reveal key={card.title}>
              <article className="group glass-card relative overflow-hidden p-8 transition duration-500 hover:-translate-y-1 hover:border-gold/25">
                <span className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                <span className="mb-4 block text-3xl">{card.icon}</span>
                <h3 className="mb-3 font-serif text-xl text-cream">{card.title}</h3>
                <p className="text-sm leading-relaxed text-text-dim">{card.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border border-gold/25 bg-price-glow p-8">
            <div>
              <p className="mb-2 text-[0.65rem] uppercase tracking-[0.25em] text-text-muted">
                Biaya Les
              </p>
              <p className="font-serif text-5xl font-light text-gold-light">
                Rp {SITE.pricePerSession.toLocaleString("id-ID")}{" "}
                <span className="text-base text-text-dim">/ pertemuan</span>
              </p>
              <p className="mt-2 text-sm text-text-muted">
                Durasi 1–2 jam · Materi termasuk · Akses Google Classroom
              </p>
            </div>
            <Link href="#daftar" className="btn-primary">
              Daftar Sekarang
            </Link>
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">
            Pertanyaan yang
            <br />
            Sering <em>Ditanyakan</em>
          </h2>
          <div className="divider-line" />
          <div className="mt-4 divide-y divide-glow/15">
            {FAQS.map((faq, i) => (
              <div key={faq.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-serif text-lg text-cream">{faq.q}</span>
                  <span
                    className={`shrink-0 text-2xl text-gold transition-transform ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden font-serif text-base font-light leading-relaxed text-text-dim transition-all duration-500 ${
                    openFaq === i ? "max-h-96 pb-5" : "max-h-0"
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
