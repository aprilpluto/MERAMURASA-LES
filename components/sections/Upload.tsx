"use client";

import { useCallback, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/constants";

type Props = { onToast: (msg: string) => void };

export default function Upload({ onToast }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateFile = (file: File): string | null => {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!SITE.allowedExtensions.includes(ext as (typeof SITE.allowedExtensions)[number])) {
      return "Format file tidak didukung. Gunakan PDF, DOCX, TXT, JPG, atau PNG.";
    }
    if (file.size > SITE.maxUploadBytes) {
      return "Ukuran file melebihi 5 MB. Harap kompres terlebih dahulu.";
    }
    return null;
  };

  const uploadFile = useCallback(
    async (file: File) => {
      const err = validateFile(file);
      if (err) {
        onToast(err);
        return;
      }

      setSuccess(false);
      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const xhr = new XMLHttpRequest();
        const result = await new Promise<{ ok: boolean; message?: string }>(
          (resolve, reject) => {
            xhr.upload.onprogress = (e) => {
              if (e.lengthComputable) {
                setProgress(Math.round((e.loaded / e.total) * 100));
              }
            };
            xhr.onload = () => {
              try {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
              } catch {
                resolve({ ok: xhr.status >= 200 && xhr.status < 300 });
              }
            };
            xhr.onerror = () => reject(new Error("network"));
            xhr.open("POST", "/api/upload");
            xhr.send(formData);
          }
        );

        if (result.ok) {
          setProgress(100);
          setSuccess(true);
          onToast("Karya Anda berhasil dikirim ✦");
        } else {
          throw new Error(result.message || "upload failed");
        }
      } catch {
        onToast(
          "Gagal mengunggah. Silakan kirim via WhatsApp atau coba lagi nanti."
        );
      } finally {
        setUploading(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [onToast]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  return (
    <section id="upload" className="relative z-[1]">
      <div className="section-inner grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="section-label">Kirim Karya</p>
          <h2 className="section-title">
            Upload
            <br />
            <em>Tulisanmu</em>
          </h2>
          <div className="divider-line" />
          <p className="font-serif text-lg font-light leading-relaxed text-text-dim">
            Bagikan karya puisi atau tulisanmu kepada kami. Upload file Anda dan
            kami akan memberikan umpan balik yang penuh perhatian.
          </p>
          <p className="mt-6 font-serif leading-relaxed text-text-dim">
            Setiap kata yang Anda tulis adalah langkah berani untuk mengungkapkan
            diri. Kami menantikan untuk membaca dan merespons karya Anda dengan
            penuh hormat dan semangat membangun.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-text-dim">
            {[
              "Format yang diterima: PDF, DOCX, TXT, JPG, PNG",
              "Ukuran maksimum: 5 MB",
              "File akan diterima langsung oleh mentor",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-gold">✓</span> {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`glass-card border-2 border-dashed p-10 text-center transition ${
              dragOver ? "border-glow bg-azure/10" : "border-glow/30"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,.txt,.jpg,.jpeg,.png,.webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadFile(file);
              }}
            />
            <div className="mb-4 text-5xl">📜</div>
            <p className="mb-2 font-serif text-xl text-cream">
              Letakkan Karya Anda di Sini
            </p>
            <p className="text-sm text-text-dim">
              Klik atau seret file ke area ini
              <br />
              PDF · DOCX · TXT · JPG · PNG · Maks 5 MB
            </p>
            <button
              type="button"
              className="btn-primary mt-6"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? "Mengunggah..." : "Pilih File"}
            </button>

            {uploading && (
              <div className="mt-8">
                <div className="h-1.5 overflow-hidden bg-deep">
                  <div
                    className="h-full bg-gradient-to-r from-azure to-sky transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-text-dim">
                  Mengunggah... {progress}%
                </p>
              </div>
            )}

            {success && (
              <p className="mt-6 border border-gold/30 bg-gold/10 px-4 py-3 font-serif italic text-gold-light">
                ✦ Karya Anda berhasil dikirim! Terima kasih telah berbagi tulisan
                Anda bersama Meramu Rasa.
              </p>
            )}
          </div>
          <p className="mt-4 text-center text-[0.7rem] leading-relaxed text-text-muted">
            Dengan mengirimkan karya, Anda menyetujui bahwa tulisan ini hanya
            digunakan untuk keperluan bimbingan dan evaluasi oleh mentor Meramu
            Rasa.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
