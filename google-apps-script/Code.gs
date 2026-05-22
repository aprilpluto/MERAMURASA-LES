/**
 * Meramu Rasa — Google Apps Script Backend
 *
 * Deploy sebagai Web App (Anyone) lalu set URL di Vercel:
 * GAS_REGISTER_URL = https://script.google.com/macros/s/.../exec
 * GAS_UPLOAD_URL   = (bisa URL yang sama)
 *
 * Notifikasi otomatis:
 * - Email → ardikamal1213@gmail.com (MailApp)
 * - WhatsApp → +62 838-7858-1733 (CallMeBot, isi CALLMEBOT_APIKEY)
 */

const CONFIG = {
  NOTIFY_EMAIL: "ardikamal1213@gmail.com",
  NOTIFY_WHATSAPP: "6283878581733",
  /** Daftar di https://www.callmebot.com/blog/free-api-whatsapp-messages/ lalu paste API key */
  CALLMEBOT_APIKEY: "",
  /** ID folder Drive dari URL: drive.google.com/drive/folders/XXXXXXXX */
  DRIVE_FOLDER_ID: "YOUR_GOOGLE_DRIVE_FOLDER_ID",
};

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action || "register";

    if (action === "upload") {
      return handleUpload(payload);
    }
    return handleRegister(payload);
  } catch (err) {
    return jsonResponse({ status: "ERROR", error: String(err) });
  }
}

function doGet() {
  return jsonResponse({ status: "OK", message: "Meramu Rasa API aktif" });
}

function sendWhatsAppNotification(text) {
  const key = (CONFIG.CALLMEBOT_APIKEY || "").trim();
  if (!key) return;

  const phone = String(CONFIG.NOTIFY_WHATSAPP || "").replace(/\D/g, "");
  if (!phone) return;

  const url =
    "https://api.callmebot.com/whatsapp.php?phone=" +
    encodeURIComponent(phone) +
    "&text=" +
    encodeURIComponent(text) +
    "&apikey=" +
    encodeURIComponent(key);

  try {
    UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  } catch (waErr) {
    Logger.log("WhatsApp gagal: " + waErr);
  }
}

function handleRegister(data) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Pendaftaran") ||
    SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Nama",
      "Email",
      "Pertemuan",
      "Jadwal",
      "Sosmed",
      "WhatsApp",
      "Tujuan",
    ]);
  }

  const ts = data.timestamp || new Date().toLocaleString("id-ID");

  sheet.appendRow([
    ts,
    data.nama || "",
    data.email || "",
    data.pertemuan || "",
    data.jadwal || "",
    data.sosmed || "",
    data.wa || "",
    data.tujuan || "",
  ]);

  const body =
    "Peserta baru mendaftar les Meramu Rasa!\n\n" +
    "Nama: " +
    data.nama +
    "\nEmail: " +
    data.email +
    "\nWhatsApp peserta: " +
    data.wa +
    "\nMedia sosial: " +
    (data.sosmed || "-") +
    "\nPertemuan: " +
    data.pertemuan +
    "\nJadwal: " +
    data.jadwal +
    "\nTujuan: " +
    data.tujuan +
    "\nWaktu: " +
    ts;

  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAIL,
      subject: "Pendaftaran Baru — Meramu Rasa",
      body: body,
    });
  } catch (mailErr) {
    Logger.log("Email gagal: " + mailErr);
  }

  sendWhatsAppNotification(
    "📋 Pendaftaran Baru — Meramu Rasa\n\n" +
      "Nama: " +
      data.nama +
      "\nEmail: " +
      data.email +
      "\nWA: " +
      data.wa +
      "\nPertemuan: " +
      data.pertemuan +
      "\nJadwal: " +
      data.jadwal +
      "\nTujuan: " +
      data.tujuan +
      "\nWaktu: " +
      ts
  );

  return jsonResponse({ status: "OK" });
}

function handleUpload(data) {
  if (!data.data || !data.fileName) {
    return jsonResponse({ status: "ERROR", error: "Data file tidak lengkap" });
  }

  const ts = data.timestamp || new Date().toLocaleString("id-ID");
  const blob = Utilities.newBlob(
    Utilities.base64Decode(data.data),
    data.mimeType || "application/octet-stream",
    data.fileName
  );

  var fileUrl = "";
  const folderId = (CONFIG.DRIVE_FOLDER_ID || "").trim();

  if (folderId && folderId !== "YOUR_GOOGLE_DRIVE_FOLDER_ID") {
    try {
      const folder = DriveApp.getFolderById(folderId);
      const file = folder.createFile(blob);
      fileUrl = file.getUrl();
    } catch (driveErr) {
      Logger.log("Drive gagal: " + driveErr);
    }
  }

  const body =
    "Karya baru diunggah ke Meramu Rasa!\n\n" +
    "Nama file: " +
    data.fileName +
    "\nWaktu: " +
    ts +
    (fileUrl ? "\nLink Drive: " + fileUrl : "\n\n(File dilampirkan di email ini.)");

  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAIL,
      subject: "Karya Baru — Meramu Rasa (" + data.fileName + ")",
      body: body,
      attachments: [blob],
    });
  } catch (mailErr) {
    Logger.log("Email gagal: " + mailErr);
  }

  sendWhatsAppNotification(
    "📜 Karya Baru — Meramu Rasa\n\n" +
      "File: " +
      data.fileName +
      "\nWaktu: " +
      ts +
      (fileUrl ? "\nDrive: " + fileUrl : "") +
      "\n\n(Lihat lampiran di Gmail Anda.)"
  );

  return jsonResponse({ status: "OK", fileUrl: fileUrl });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
