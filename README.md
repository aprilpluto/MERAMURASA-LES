# Meramu Rasa

Platform informasi dan pendaftaran **les cipta puisi daring** — nuansa sastra modern, elegan, dan artistik.

- **Founder & Mentor:** Ardi Kamal Karima
- **Stack:** Next.js 15 (App Router) + Tailwind CSS
- **Deploy:** Vercel Free
- **Backend data:** Google Apps Script + Spreadsheet + Drive (gratis)

---

## Fitur

- Hero interaktif dengan animasi bintang
- Tentang, Mentor, Program Les + FAQ accordion
- Formulir pendaftaran → Google Spreadsheet + **email & WhatsApp otomatis**
- Upload karya (PDF/DOCX/TXT/JPG/PNG, max 5 MB) → Gmail (lampiran) + Drive + WhatsApp
- Kontak WhatsApp & Email + floating WA button
- SEO metadata & Open Graph
- Slot aset: `public/assets/logo.png`, `public/assets/mentor.jpg`

---

## Menjalankan Lokal

```bash
npm install
cp .env.example .env.local
# Isi GAS_REGISTER_URL setelah setup Apps Script
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

---

## Deploy ke Vercel

1. Push project ke GitHub (atau import folder langsung di Vercel).
2. **Import Project** di [vercel.com](https://vercel.com).
3. Framework: **Next.js** (otomatis terdeteksi).
4. **Environment Variables** (Settings → Environment Variables):

   | Nama | Nilai |
   |------|--------|
   | `GAS_REGISTER_URL` | URL Web App Apps Script |
   | `GAS_UPLOAD_URL` | (opsional, bisa sama) |
   | `CALLMEBOT_APIKEY` | API key CallMeBot (notifikasi WA otomatis) |

5. Klik **Deploy**.

Tanpa `GAS_*`, formulir & upload tetap sukses; **WhatsApp** aktif jika `CALLMEBOT_APIKEY` diisi. **Email** membutuhkan Apps Script (lihat bawah).

---

## Setup Google Apps Script

### 1. Spreadsheet Pendaftaran

1. Buat spreadsheet: **Pendaftaran Meramu Rasa**
2. Buat sheet bernama `Pendaftaran` (atau gunakan sheet aktif).
3. **Extensions → Apps Script**
4. Salin isi file `google-apps-script/Code.gs` ke editor.
5. Set `CONFIG.DRIVE_FOLDER_ID` dan `CONFIG.CALLMEBOT_APIKEY` di `Code.gs` (langkah 2 & 3).

### 2. Folder Google Drive (Upload Karya)

1. Buat folder **Upload Meramu Rasa**
2. Buka folder → salin ID dari URL:  
   `https://drive.google.com/drive/folders/XXXXXXXX` → `XXXXXXXX`
3. Paste ke `CONFIG.DRIVE_FOLDER_ID` di `Code.gs`.

### 3. Deploy Web App

1. **Deploy → New deployment → Web app**
2. Execute as: **Me**
3. Who has access: **Anyone**
4. Salin URL deployment (berakhiran `/exec`).
5. Masukkan ke Vercel: `GAS_REGISTER_URL` dan `GAS_UPLOAD_URL` (bisa URL sama).

### 4. Izin pertama kali

Saat pertama dijalankan, Apps Script meminta otorisasi Gmail (notifikasi) dan Drive (upload).

### 5. Notifikasi WhatsApp otomatis (CallMeBot)

1. Buka [CallMeBot — API WhatsApp gratis](https://www.callmebot.com/blog/free-api-whatsapp-messages/).
2. Kirim pesan aktivasi ke bot CallMeBot dari nomor **+62 838-7858-1733**.
3. Salin **API key** yang diberikan.
4. Paste ke `CONFIG.CALLMEBOT_APIKEY` di `google-apps-script/Code.gs` **dan** ke `CALLMEBOT_APIKEY` di Vercel / `.env.local`.
5. Deploy ulang Web App (versi baru) setelah mengubah Apps Script.

Setiap pendaftaran atau upload akan mengirim ringkasan ke WhatsApp Anda; file karya juga dilampirkan di **ardikamal1213@gmail.com**.

---

## Slot Aset (Logo & Foto Mentor)

Letakkan file di `public/assets/`:

| File | Keterangan |
|------|------------|
| `logo.png` | Logo navbar (disarankan 200×200, PNG transparan) |
| `mentor.jpg` | Foto Ardi Kamal Karima (persegi, min. 800×800) |

Path aset di `lib/constants.ts` (sudah mengarah ke PNG/JPG):

```ts
export const ASSETS = {
  logo: "/assets/logo.png",
  mentor: "/assets/mentor.jpg",
};
```

Untuk file HTML statis `meramu-rasa.html`, gambar memakai path relatif `public/assets/...` dari folder project.

---

## Kontak Resmi

- **WhatsApp:** [+62 838-7858-1733](https://wa.me/6283878581733)
- **Email:** [ardikamal1213@gmail.com](mailto:ardikamal1213@gmail.com)

---

*Salam Meramu Rasa — Ardi Kamal Karima*
