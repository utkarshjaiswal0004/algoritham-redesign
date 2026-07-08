import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";
import { rateLimit, clientKey } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 4 * 1024; // 4 KB — subscriber form is tiny
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  // ── Rate limit: 5 requests per IP per 15 min ────────────────────────
  const rl = rateLimit(clientKey(req, "newsletter"), { limit: 5, windowMs: 15 * 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } },
    );
  }

  // ── Body size cap ───────────────────────────────────────────────────
  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  try {
    const body = await req.json().catch(() => null) as {
      email?: unknown; source?: unknown; hp?: unknown;
    } | null;
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

    // ── Honeypot: bots fill this hidden field; real users don't ───────
    if (typeof body.hp === "string" && body.hp.length > 0) {
      // Pretend success so bots don't retry
      return NextResponse.json({ ok: true });
    }

    const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const source = typeof body.source === "string" ? body.source.slice(0, 64) : undefined;

    const client = writeClient();
    await client.create({
      _type: "subscriber",
      email,
      source,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    // Log server-side, return generic to client — do not leak internals
    console.error("[api/newsletter]", e);
    return NextResponse.json({ error: "Could not save subscription" }, { status: 500 });
  }
}
