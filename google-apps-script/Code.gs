/**
 * Meramu Rasa — Google Apps Script
 * Deploy Web App (Anyone) → set GAS_WEB_APP_URL di Vercel / .env.local
 */

const CONFIG = {
  NOTIFY_EMAIL: "ardikamal1213@gmail.com",
  NOTIFY_WHATSAPP: "6283878581733",
  CALLMEBOT_APIKEY: "",
  DRIVE_FOLDER_ID: "",
};

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    if (payload.action === "upload") return handleUpload(payload);
    return handleRegister(payload);
  } catch (err) {
    return jsonResponse({ status: "ERROR", error: String(err) });
  }
}

function doGet() {
  return jsonResponse({ status: "OK" });
}

function sendWhatsApp(text) {
  var key = (CONFIG.CALLMEBOT_APIKEY || "").trim();
  if (!key) return;
  var phone = String(CONFIG.NOTIFY_WHATSAPP).replace(/\D/g, "");
  var url =
    "https://api.callmebot.com/whatsapp.php?phone=" +
    encodeURIComponent(phone) +
    "&text=" +
    encodeURIComponent(text) +
    "&apikey=" +
    encodeURIComponent(key);
  try {
    UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  } catch (e) {
    Logger.log(e);
  }
}

function handleRegister(data) {
  var sheet =
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

  var ts = data.timestamp || new Date().toLocaleString("id-ID");
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

  var body =
    "Pendaftaran baru — Meramu Rasa\n\n" +
    "Nama: " +
    data.nama +
    "\nEmail: " +
    data.email +
    "\nWA peserta: " +
    data.wa +
    "\nSosmed: " +
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
  } catch (e) {
    Logger.log("Email: " + e);
  }

  sendWhatsApp(body);
  return jsonResponse({ status: "OK" });
}

function handleUpload(data) {
  if (!data.data || !data.fileName) {
    return jsonResponse({ status: "ERROR", error: "Data file tidak lengkap" });
  }

  var ts = data.timestamp || new Date().toLocaleString("id-ID");
  var blob = Utilities.newBlob(
    Utilities.base64Decode(data.data),
    data.mimeType || "application/octet-stream",
    data.fileName
  );

  var fileUrl = "";
  var folderId = (CONFIG.DRIVE_FOLDER_ID || "").trim();
  if (folderId) {
    try {
      var file = DriveApp.getFolderById(folderId).createFile(blob);
      fileUrl = file.getUrl();
    } catch (e) {
      Logger.log("Drive: " + e);
    }
  }

  var body =
    "Karya baru — Meramu Rasa\n\nFile: " +
    data.fileName +
    "\nWaktu: " +
    ts +
    (fileUrl ? "\nDrive: " + fileUrl : "");

  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAIL,
      subject: "Karya Baru — " + data.fileName,
      body: body,
      attachments: [blob],
    });
  } catch (e) {
    Logger.log("Email: " + e);
  }

  sendWhatsApp(body);
  return jsonResponse({ status: "OK", fileUrl: fileUrl });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
