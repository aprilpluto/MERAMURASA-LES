/**
 * Meramu Rasa — Google Apps Script Backend
 *
 * Deploy sebagai Web App (Anyone) lalu set URL di Vercel:
 * GAS_REGISTER_URL = https://script.google.com/macros/library/d/1QjAxj16vJ-a2AuaugsDBf7wlkvv5OEoaRMfY52CUiK7O-DkkDUElEFHJ/2
 * GAS_UPLOAD_URL   = https://script.google.com/macros/library/d/1QjAxj16vJ-a2AuaugsDBf7wlkvv5OEoaRMfY52CUiK7O-DkkDUElEFHJ/3
 */

const CONFIG = {
  NOTIFY_EMAIL: "ardikamal1213@gmail.com",
  DRIVE_FOLDER_ID: "https://script.google.com/macros/library/d/1QjAxj16vJ-a2AuaugsDBf7wlkvv5OEoaRMfY52CUiK7O-DkkDUElEFHJ/3",
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

  sheet.appendRow([
    data.timestamp || new Date().toLocaleString("id-ID"),
    data.nama || "",
    data.email || "",
    data.pertemuan || "",
    data.jadwal || "",
    data.sosmed || "",
    data.wa || "",
    data.tujuan || "",
  ]);

  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAIL,
      subject: "Pendaftaran Baru — Meramu Rasa",
      body:
        "Peserta baru mendaftar!\n\n" +
        "Nama: " +
        data.nama +
        "\nEmail: " +
        data.email +
        "\nWhatsApp: " +
        data.wa +
        "\nPertemuan: " +
        data.pertemuan +
        "\nJadwal: " +
        data.jadwal +
        "\nTujuan: " +
        data.tujuan,
    });
  } catch (mailErr) {
    Logger.log("Email gagal: " + mailErr);
  }

  return jsonResponse({ status: "OK" });
}

function handleUpload(data) {
  if (!data.data || !data.fileName) {
    return jsonResponse({ status: "ERROR", error: "Data file tidak lengkap" });
  }

  const folderId = CONFIG.DRIVE_FOLDER_ID;
  if (!folderId || folderId === "YOUR_GOOGLE_DRIVE_FOLDER_ID") {
    return jsonResponse({
      status: "ERROR",
      error: "DRIVE_FOLDER_ID belum dikonfigurasi di Apps Script",
    });
  }

  const folder = DriveApp.getFolderById(folderId);
  const blob = Utilities.newBlob(
    Utilities.base64Decode(data.data),
    data.mimeType || "application/octet-stream",
    data.fileName
  );
  const file = folder.createFile(blob);

  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAIL,
      subject: "Karya Baru — Meramu Rasa",
      body:
        "File baru diunggah:\n\n" +
        "Nama file: " +
        data.fileName +
        "\nWaktu: " +
        (data.timestamp || "") +
        "\nLink: " +
        file.getUrl(),
    });
  } catch (mailErr) {
    Logger.log("Email gagal: " + mailErr);
  }

  return jsonResponse({ status: "OK", fileId: file.getId() });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
