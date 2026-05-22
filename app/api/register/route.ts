import { NextRequest, NextResponse } from "next/server";
import { formatRegisterWhatsApp, notifyWhatsApp } from "@/lib/notify";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, email, pertemuan, jadwal, sosmed, wa, tujuan, timestamp } =
      body;

    if (!nama || !email || !pertemuan || !jadwal || !wa || !tujuan) {
      return NextResponse.json(
        { ok: false, error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const payload = {
      nama,
      email,
      pertemuan,
      jadwal,
      sosmed: sosmed || "",
      wa,
      tujuan,
      timestamp: timestamp || new Date().toLocaleString("id-ID"),
    };

    void notifyWhatsApp(formatRegisterWhatsApp(payload));

    const gasUrl = process.env.GAS_REGISTER_URL;

    if (!gasUrl) {
      return NextResponse.json({
        ok: true,
        demo: true,
        message:
          "Data dicatat. Untuk email + spreadsheet penuh, set GAS_REGISTER_URL. WhatsApp aktif jika CALLMEBOT_APIKEY sudah diisi.",
      });
    }

    const gasRes = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "register", ...payload }),
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
        { ok: false, error: parsed.error || "Gagal menyimpan ke spreadsheet" },
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
