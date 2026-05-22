# Meramu Rasa — Panduan Deployment

Website les cipta puisi daring oleh **Ardi Kamal Karima**.

---

## 🚀 Cara Deploy ke Vercel (Gratis)

### Opsi 1 — Drag & Drop (Paling Mudah)
1. Buka [vercel.com](https://vercel.com) → Login / Daftar gratis
2. Klik **"Add New → Project"**
3. Pilih **"Deploy from a folder"** atau drag folder project Anda
4. Klik **Deploy** — selesai! URL otomatis tersedia.

### Opsi 2 — Via GitHub
1. Upload file ke GitHub repository baru
2. Di Vercel: **"Import Git Repository"** → pilih repo Anda
3. Klik **Deploy**

---

## 📋 Setup Google Apps Script (Formulir Pendaftaran)

Agar formulir pendaftaran menyimpan data ke Google Spreadsheet:

### Langkah 1 — Buat Google Spreadsheet
1. Buka [sheets.google.com](https://sheets.google.com) → buat spreadsheet baru
2. Beri nama: **"Pendaftaran Meramu Rasa"**
3. Buat header kolom: `Timestamp | Nama | Email | Pertemuan | Jadwal | Sosmed | WhatsApp | Tujuan`

### Langkah 2 — Buat Google Apps Script
1. Di Spreadsheet: **Extensions → Apps Script**
2. Hapus kode default, paste kode berikut:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.timestamp,
    data.nama,
    data.email,
    data.pertemuan,
    data.jadwal,
    data.sosmed,
    data.wa,
    data.tujuan
  ]);
  
  // Kirim notifikasi email ke mentor
  MailApp.sendEmail({
    to: 'ardikamal1213@gmail.com',
    subject: '🌟 Pendaftaran Baru — Meramu Rasa',
    body: `Peserta baru mendaftar!\n\nNama: ${data.nama}\nEmail: ${data.email}\nWhatsApp: ${data.wa}\nPertemuan: ${data.pertemuan}\nJadwal: ${data.jadwal}\nTujuan: ${data.tujuan}`
  });
  
  return ContentService
    .createTextOutput(JSON.stringify({status: 'OK'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Langkah 3 — Deploy Apps Script
1. Klik **Deploy → New Deployment**
2. Pilih type: **Web App**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Klik **Deploy** → Salin URL yang diberikan

### Langkah 4 — Update HTML
Di file `meramu-rasa.html`, cari baris:
```javascript
const GAS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
```
Ganti dengan URL Apps Script Anda.

---

## 📁 Setup Upload Google Drive (Opsional — Lebih Lanjut)

Untuk menyimpan file upload ke Google Drive:

### Di Apps Script yang sama, tambahkan fungsi:
```javascript
function doPostFile(e) {
  const folder = DriveApp.getFolderById('YOUR_FOLDER_ID');
  const blob = Utilities.newBlob(
    Utilities.base64Decode(e.postData.contents),
    e.parameter.mimeType,
    e.parameter.fileName
  );
  folder.createFile(blob);
  return ContentService.createTextOutput('OK');
}
```

1. Buat folder di Google Drive → Klik kanan → **Get link** → Salin ID dari URL
2. Ganti `'YOUR_FOLDER_ID'` dengan ID folder Anda
3. Re-deploy Apps Script

---

## 🔧 Kustomisasi

| Yang Ingin Diubah | Lokasi di HTML |
|---|---|
| Foto profil mentor | Ganti huruf `"A"` di `.mentor-avatar` dengan tag `<img>` |
| Warna dominan | CSS variables di `:root` |
| Konten FAQ | Array `faqs` di bagian `<script>` |
| Testimonial | Array `testis` di bagian `<script>` |
| Harga les | Section `.price-highlight` |

---

## 📞 Kontak Resmi
- **WhatsApp:** [+62 838-7858-1733](https://wa.me/6283878581733)
- **Email:** ardikamal1213@gmail.com

---

*Salam Meramu Rasa — Ardi Kamal Karima*
