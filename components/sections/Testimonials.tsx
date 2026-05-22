import Reveal from "@/components/Reveal";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <section id="testimonial" className="relative z-[1]">
      <div className="section-inner">
        <Reveal>
          <p className="section-label">Testimoni</p>
          <h2 className="section-title">
            Kata Mereka
            <br />
            tentang <em>Meramu Rasa</em>
          </h2>
          <div className="divider-line" />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Reveal key={t.author}>
              <article className="glass-card flex h-full flex-col p-8 transition hover:border-glow/40">
                <div className="mb-4 text-gold">{t.stars}</div>
                <p className="flex-1 font-serif text-lg font-light italic leading-relaxed text-text-dim">
                  &ldquo;{t.text}&rdquo;
                </p>
                <footer className="mt-6 border-t border-glow/15 pt-4">
                  <strong className="block font-serif text-cream">{t.author}</strong>
                  <span className="text-xs text-text-muted">{t.info}</span>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
