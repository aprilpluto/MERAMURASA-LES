export function getGasUrl(): string | undefined {
  return process.env.GAS_WEB_APP_URL?.trim();
}

export async function postToGas(
  body: Record<string, unknown>
): Promise<{ ok: true } | { ok: false; error: string }> {
  const url = getGasUrl();
  if (!url) {
    return { ok: false, error: "Backend belum dikonfigurasi (GAS_WEB_APP_URL)" };
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await res.text();
  let parsed: { status?: string; error?: string } = {};
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = { status: res.ok ? "OK" : "ERROR" };
  }

  if (!res.ok || parsed.status === "ERROR") {
    return { ok: false, error: parsed.error || "Gagal menghubungi server" };
  }

  return { ok: true };
}
