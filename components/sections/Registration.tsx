"use client";

import { FormEvent, useState } from "react";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/constants";

type FormState = "idle" | "loading" | "success" | "error";

export default function Registration() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");
    setMessage("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      nama: fd.get("nama") as string,
      email: fd.get("email") as string,
      pertemuan: fd.get("pertemuan") as string,
      jadwal: fd.get("jadwal") as string,
      sosmed: (fd.get("sosmed") as string) || "",
      wa: fd.get("wa") as string,
      tujuan: fd.get("tujuan") as string,
      timestamp: new Date().toLocaleString("id-ID"),
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.ok) {
        setState("success");
        setMessage(
          "✦ Pendaftaran Anda berhasil dikirim! Kami akan menghubungi Anda dalam 1×24 jam. Salam Meramu Rasa."
        );
        form.reset();
      } else {
        throw new Error(data.error || "Gagal mengirim");
      }
    } catch {
      setState("error");
      setMessage(
        `Gagal mengirim formulir. Silakan hubungi kami langsung via WhatsApp: ${SITE.whatsapp}`
      );
    }
  };

  return (
    <section id="daftar" className="relative z-[1] bg-section-blue">
      <div className="section-inner">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="section-label">Pendaftaran</p>
          <h2 className="section-title">
            Mulai Perjalanan
            <br />
            Puitis <em>Anda</em>
          </h2>
          <div className="divider-line mx-auto" />
          <p className="font-serif text-lg font-light leading-relaxed text-text-dim">
            Isi formulir berikut untuk mendaftar les cipta puisi bersama Meramu
            Rasa. Kami akan menghubungi Anda dalam waktu 1×24 jam.
          </p>
        </Reveal>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12 max-w-2xl"
          noValidate
        >
          <Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nama" className="mb-2 block text-[0.65rem] uppercase tracking-wider text-text-muted">
                  Nama Lengkap *
                </label>
                <input id="nama" name="nama" required className="form-input" placeholder="Nama lengkap Anda" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-[0.65rem] uppercase tracking-wider text-text-muted">
                  Alamat Email *
                </label>
                <input id="email" name="email" type="email" required className="form-input" placeholder="email@contoh.com" />
              </div>
              <div>
                <label htmlFor="pertemuan" className="mb-2 block text-[0.65rem] uppercase tracking-wider text-text-muted">
                  Jumlah Pertemuan *
                </label>
                <select id="pertemuan" name="pertemuan" required className="form-input">
                  <option value="">Pilih jumlah pertemuan</option>
                  <option value="4">4 Pertemuan — Rp 600.000</option>
                  <option value="8">8 Pertemuan — Rp 1.200.000</option>
                  <option value="12">12 Pertemuan — Rp 1.800.000</option>
                  <option value="custom">Sesuaikan dengan kebutuhan</option>
                </select>
              </div>
              <div>
                <label htmlFor="jadwal" className="mb-2 block text-[0.65rem] uppercase tracking-wider text-text-muted">
                  Kesepakatan Hari & Waktu *
                </label>
                <input id="jadwal" name="jadwal" required className="form-input" placeholder="Mis: Senin & Rabu, 19.00–20.00 WIB" />
              </div>
              <div>
                <label htmlFor="sosmed" className="mb-2 block text-[0.65rem] uppercase tracking-wider text-text-muted">
                  Akun Media Sosial
                </label>
                <input id="sosmed" name="sosmed" className="form-input" placeholder="@username Instagram / TikTok / dll" />
              </div>
              <div>
                <label htmlFor="wa" className="mb-2 block text-[0.65rem] uppercase tracking-wider text-text-muted">
                  Nomor WhatsApp *
                </label>
                <input id="wa" name="wa" type="tel" required className="form-input" placeholder="+62 8xx-xxxx-xxxx" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="tujuan" className="mb-2 block text-[0.65rem] uppercase tracking-wider text-text-muted">
                  Tujuan Mengikuti Les *
                </label>
                <textarea
                  id="tujuan"
                  name="tujuan"
                  required
                  rows={5}
                  className="form-input resize-y"
                  placeholder="Ceritakan mengapa Anda ingin belajar menulis puisi..."
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-8 text-center">
            <button
              type="submit"
              disabled={state === "loading"}
              className="btn-primary w-full max-w-md disabled:opacity-60 sm:w-auto"
            >
              {state === "loading" ? "Mengirim..." : "Kirim Pendaftaran"}
            </button>
            <p className="mt-4 text-[0.7rem] leading-relaxed text-text-muted">
              Les akan dimulai satu hari setelah konfirmasi pembayaran.
              <br />
              Silakan kirim bukti transfer ke WhatsApp kami.
            </p>
          </Reveal>

          {message && (
            <div
              role="alert"
              className={`mt-6 border px-5 py-4 text-center font-serif text-sm ${
                state === "success"
                  ? "border-gold/40 bg-gold/10 text-gold-light"
                  : "border-red-400/40 bg-red-900/20 text-red-200"
              }`}
            >
              {message}
              {state === "success" && (
                <p className="mt-2 text-xs">
                  <a href={SITE.whatsappUrl} className="underline">
                    WhatsApp
                  </a>
                  {" · "}
                  <a href={SITE.emailUrl} className="underline">
                    Email
                  </a>
                </p>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
