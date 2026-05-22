/**
 * Notifikasi otomatis ke WhatsApp Ardi (via CallMeBot).
 * Aktifkan dengan CALLMEBOT_APIKEY di .env.local / Vercel.
 */

const DEFAULT_WA_PHONE = "6283878581733";

export async function notifyWhatsApp(message: string): Promise<void> {
  const apikey = process.env.CALLMEBOT_APIKEY?.trim();
  if (!apikey) return;

  const phone = (
    process.env.NOTIFY_WHATSAPP_PHONE || DEFAULT_WA_PHONE
  ).replace(/\D/g, "");

  const url =
    "https://api.callmebot.com/whatsapp.php?" +
    new URLSearchParams({ phone, text: message, apikey }).toString();

  try {
    await fetch(url, { method: "GET", cache: "no-store" });
  } catch {
    /* notifikasi opsional — jangan gagalkan submit */
  }
}

export function formatRegisterWhatsApp(data: {
  nama: string;
  email: string;
  pertemuan: string;
  jadwal: string;
  sosmed?: string;
  wa: string;
  tujuan: string;
  timestamp?: string;
}): string {
  return [
    "📋 Pendaftaran Baru — Meramu Rasa",
    "",
    `Nama: ${data.nama}`,
    `Email: ${data.email}`,
    `WA peserta: ${data.wa}`,
    `Pertemuan: ${data.pertemuan}`,
    `Jadwal: ${data.jadwal}`,
    data.sosmed ? `Sosmed: ${data.sosmed}` : "",
    `Tujuan: ${data.tujuan}`,
    `Waktu: ${data.timestamp || new Date().toLocaleString("id-ID")}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function formatUploadWhatsApp(fileName: string, timestamp?: string): string {
  return [
    "📜 Karya Baru — Meramu Rasa",
    "",
    `File: ${fileName}`,
    `Waktu: ${timestamp || new Date().toLocaleString("id-ID")}`,
    "",
    "File juga dikirim ke Gmail Anda (via Google Apps Script).",
  ].join("\n");
}
