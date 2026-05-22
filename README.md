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
2. **Extensions → Apps Script** → salin `google-apps-script/Code.gs`.
3. Isi `CONFIG`:
   - `DRIVE_FOLDER_ID` — ID folder Google Drive untuk karya
   - `CALLMEBOT_APIKEY` — dari [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) (aktivasi dari +62 838-7858-1733)
4. **Deploy → Web app** (Execute as: Me, Anyone) → salin URL ke `GAS_WEB_APP_URL`.

Notifikasi otomatis ke **ardikamal1213@gmail.com** dan WhatsApp **+62 838-7858-1733**.

## Aset

Letakkan di `public/assets/`:

- `logo.png` — navbar
- `mentor.jpg` — foto mentor

## Kontak

- WhatsApp: [+62 838-7858-1733](https://wa.me/6283878581733)
- Email: [ardikamal1213@gmail.com](mailto:ardikamal1213@gmail.com)
