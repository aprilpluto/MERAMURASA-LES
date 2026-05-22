import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/constants";
import { postToGas } from "@/lib/gas";

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

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await postToGas({
      action: "upload",
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      data: buffer.toString("base64"),
      timestamp: new Date().toLocaleString("id-ID"),
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: result.error.includes("dikonfigurasi") ? 503 : 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
