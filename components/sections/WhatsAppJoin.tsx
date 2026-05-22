import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/constants";

export default function WhatsAppJoin() {
  return (
    <section id="daftar" className="relative z-[1] bg-section-blue">
      <div className="section-inner">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="section-label">Pendaftaran & Karya</p>
          <h2 className="section-title">
            Lanjutkan via
            <br />
            <em>WhatsApp</em>
          </h2>
          <div className="divider-line mx-auto" />
          <p className="font-serif text-lg font-light leading-relaxed text-text-dim">
            Untuk mendaftar les atau mengirim karya puisi/tulisan, hubungi kami
            langsung melalui WhatsApp. Kami akan merespons dan membimbing Anda
            dari sana.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="glass-card flex h-full flex-col p-8 text-center">
              <p className="mb-2 text-[0.65rem] uppercase tracking-wider text-text-muted">
                Daftar Les
              </p>
              <p className="mb-6 flex-1 font-serif text-base font-light leading-relaxed text-text-dim">
                Sampaikan nama, jumlah pertemuan, jadwal yang diinginkan, dan
                tujuan Anda mengikuti les.
              </p>
              <Link
                href={SITE.whatsappRegisterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                Daftar via WhatsApp
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="glass-card flex h-full flex-col p-8 text-center">
              <p className="mb-2 text-[0.65rem] uppercase tracking-wider text-text-muted">
                Kirim Karya
              </p>
              <p className="mb-6 flex-1 font-serif text-base font-light leading-relaxed text-text-dim">
                Kirim puisi atau tulisan Anda sebagai file atau teks langsung di
                chat. Kami akan memberikan umpan balik melalui WhatsApp.
              </p>
              <Link
                href={SITE.whatsappKaryaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full"
              >
                Kirim Karya via WhatsApp
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8 text-center">
          <p className="text-[0.7rem] leading-relaxed text-text-muted">
            Les dimulai satu hari setelah konfirmasi pembayaran.
            <br />
            Kirim bukti transfer ke {SITE.whatsapp}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
