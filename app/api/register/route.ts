import { NextRequest, NextResponse } from "next/server";

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

    const gasUrl = process.env.GAS_REGISTER_URL;

    if (!gasUrl) {
      return NextResponse.json({
        ok: true,
        demo: true,
        message:
          "Mode demo: set GAS_REGISTER_URL di Vercel untuk menyimpan ke Google Spreadsheet.",
      });
    }

    const gasRes = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "register",
        nama,
        email,
        pertemuan,
        jadwal,
        sosmed: sosmed || "",
        wa,
        tujuan,
        timestamp: timestamp || new Date().toLocaleString("id-ID"),
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
