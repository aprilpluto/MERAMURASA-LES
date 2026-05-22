# Meramu Rasa

Les cipta puisi daring — Next.js 15 + Tailwind. Form pendaftaran & upload karya dikirim ke **Gmail** dan **WhatsApp** Ardi Kamal Karima via Google Apps Script.

## Menjalankan

```bash
npm install
cp .env.example .env.local
npm run dev
```

Isi `GAS_WEB_APP_URL` di `.env.local` (lihat setup di bawah).

## Deploy Vercel

| Variabel | Nilai |
|----------|--------|
| `GAS_WEB_APP_URL` | URL Web App Apps Script (`.../exec`) |

## Setup Google Apps Script

1. Buat spreadsheet **Pendaftaran Meramu Rasa**, sheet `Pendaftaran`.
2. **Extensions → Apps Script** → salin `google-apps-script/Code.gs` (sudah berisi `CONFIG` di bawah).
3. Isi hanya `CALLMEBOT_APIKEY` di `CONFIG` — dari [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) (aktivasi dari **+62 838-7858-1733**).
4. **Deploy → Web app** (Execute as: Me, Anyone) → salin URL ke `GAS_WEB_APP_URL`.

**Sudah dikonfigurasi di `Code.gs`:**

| `CONFIG` | Nilai |
|----------|--------|
| `DRIVE_FOLDER_ID` | `143FV-G3XZGgJvqyRNo19u7-Ss5TBvRt5` — [TULISAN PERAMU RASA](https://drive.google.com/drive/folders/143FV-G3XZGgJvqyRNo19u7-Ss5TBvRt5?usp=sharing) |
| `NOTIFY_WHATSAPP` | `6283878581733` (+62 838-7858-1733) |
| `NOTIFY_EMAIL` | `ardikamal1213@gmail.com` |

Notifikasi otomatis ke email dan WhatsApp di atas setelah `CALLMEBOT_APIKEY` diisi dan Web App dideploy.

## Aset

Letakkan di `public/assets/`:

- `logo.png` — navbar
- `mentor.jpg` — foto mentor

## Kontak

- WhatsApp: [+62 838-7858-1733](https://wa.me/6283878581733)
- Email: [ardikamal1213@gmail.com](mailto:ardikamal1213@gmail.com)
