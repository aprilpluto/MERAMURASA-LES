import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/constants";
import { formatUploadWhatsApp, notifyWhatsApp } from "@/lib/notify";

export const runtime = "nodejs";

const MAX_BYTES = SITE.maxUploadBytes;
const ALLOWED = new Set<string>(SITE.allowedExtensions);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "File tidak ditemukan" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED.has(ext)) {
      return NextResponse.json(
        { ok: false, error: "Format tidak didukung" },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Ukuran melebihi 5 MB" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("id-ID");
    void notifyWhatsApp(formatUploadWhatsApp(file.name, timestamp));

    const gasUrl = process.env.GAS_UPLOAD_URL || process.env.GAS_REGISTER_URL;

    if (!gasUrl) {
      return NextResponse.json({
        ok: true,
        demo: true,
        message:
          "File diterima. Untuk email + Drive, set GAS_UPLOAD_URL. WhatsApp aktif jika CALLMEBOT_APIKEY sudah diisi.",
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const mimeType =
      (formData.get("mimeType") as string) || file.type || "application/octet-stream";

    const gasRes = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "upload",
        fileName: file.name,
        mimeType,
        data: base64,
        timestamp,
      }),
      cache: "no-store",
    });

    const text = await gasRes.text();
    let parsed: { status?: string; error?: string } = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { status: gasRes.ok ? "OK" : "ERROR" };
    }

    if (!gasRes.ok || parsed.status === "ERROR") {
      return NextResponse.json(
        { ok: false, error: parsed.error || "Gagal mengunggah ke Drive" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, demo: false });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
