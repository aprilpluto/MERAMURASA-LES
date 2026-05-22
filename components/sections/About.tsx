import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="tentang" className="relative z-[1]">
      <div className="section-inner grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="section-label">Filosofi</p>
          <blockquote className="relative border-l-0 pl-8 font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-light italic leading-snug text-cream before:absolute before:left-0 before:top-0 before:text-6xl before:text-gold/40 before:content-['\201C']">
            Rasa adalah bahan baku.
            <br />
            Kata adalah alatnya.
            <br />
            Puisi adalah karya jiwa.
          </blockquote>
        </Reveal>
        <Reveal>
          <p className="section-label">Tentang Meramu Rasa</p>
          <h2 className="section-title">
            Ruang Belajar
            <br />
            yang <em>Bermakna</em>
          </h2>
          <div className="divider-line" />
          <div className="space-y-4 font-serif text-lg font-light leading-relaxed text-text-dim">
            <p>
              <strong className="font-normal text-cream">Meramu Rasa</strong> lahir
              dari keyakinan bahwa setiap orang menyimpan puisi di dalam dirinya —
              menunggu untuk ditemukan, dirangkai, dan dibagikan kepada dunia.
            </p>
            <p>
              Platform les cipta puisi daring ini hadir untuk menemani perjalanan
              kreatif Anda: dari meraba emosi yang belum terwakili, hingga merangkai
              kata menjadi baris-baris yang hidup, bergetar, dan membekas.
            </p>
            <p>
              Bersama mentor yang berpengalaman, Anda akan belajar bukan sekadar
              teknik menulis — melainkan cara merasakan, memaknai, dan menuangkan
              dunia batin ke dalam bentuk yang paling jujur: puisi.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6">
            {[
              { num: "100%", label: "Daring & Fleksibel" },
              { num: "1–2 jam", label: "Per Sesi" },
              { num: "Personal", label: "Bimbingan Langsung" },
              { num: "Zoom", label: "/ Google Meet" },
            ].map((s) => (
              <div key={s.label} className="border-l-2 border-gold pl-4">
                <div className="font-serif text-3xl font-light text-gold-light">
                  {s.num}
                </div>
                <div className="mt-1 text-[0.65rem] uppercase tracking-wider text-text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
