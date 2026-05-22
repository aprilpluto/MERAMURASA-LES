import { NextRequest, NextResponse } from "next/server";
import { postToGas } from "@/lib/gas";

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

    const result = await postToGas({
      action: "register",
      nama,
      email,
      pertemuan,
      jadwal,
      sosmed: sosmed || "",
      wa,
      tujuan,
      timestamp: timestamp || new Date().toLocaleString("id-ID"),
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
