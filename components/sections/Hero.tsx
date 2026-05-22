import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-[1] flex min-h-screen flex-col items-center justify-center bg-hero-gradient px-6 pb-16 pt-28 text-center"
    >
      <div className="max-w-3xl">
        <Reveal>
          <p className="mb-8 text-[0.68rem] uppercase tracking-[0.35em] text-gold">
            Les Cipta Puisi Daring · Profesional · Personal
          </p>
        </Reveal>
        <Reveal delay="0.1s">
          <h1 className="font-serif text-[clamp(3.5rem,12vw,8.5rem)] font-light leading-[0.92] text-cream">
            Meramu
            <br />
            <em className="text-gold-light">Rasa</em>
          </h1>
        </Reveal>
        <Reveal delay="0.2s">
          <div className="mx-auto my-8 h-px w-14 bg-gold" />
        </Reveal>
        <Reveal delay="0.3s">
          <p className="mx-auto max-w-xl font-serif text-[clamp(1rem,2.5vw,1.3rem)] font-light italic leading-relaxed text-text-dim">
            Di antara kata dan makna, tersimpan ruang yang menunggu untuk diisi.
            <br />
            Belajarlah mencipta puisi — dengan hati, dengan bimbingan.
          </p>
        </Reveal>
        <Reveal delay="0.4s">
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="#daftar" className="btn-primary">
              Daftar Les
            </Link>
            <Link href="#kontak" className="btn-outline">
              Hubungi Kami
            </Link>
          </div>
        </Reveal>
      </div>
      <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-70">
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-text-muted">
          Gulir
        </span>
        <div className="h-10 w-px animate-scroll-line bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
