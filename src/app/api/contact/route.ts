import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";
import { rateLimit, clientKey } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 32 * 1024; // 32 KB
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  name?:    unknown; email?:   unknown; company?: unknown;
  phone?:   unknown; service?: unknown; message?: unknown;
  hp?:      unknown;  // honeypot
};

// Trim, cap length, drop non-strings.
const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  // ── Rate limit: 3 submissions per IP per 10 min ─────────────────────
  const rl = rateLimit(clientKey(req, "contact"), { limit: 3, windowMs: 10 * 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } },
    );
  }

  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  try {
    const body = (await req.json().catch(() => null)) as Body | null;
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

    // ── Honeypot ─────────────────────────────────────────────────────
    if (typeof body.hp === "string" && body.hp.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const name    = str(body.name,    120);
    const email   = str(body.email,   254);
    const message = str(body.message, 5_000);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const client = writeClient();
    // Node built-in crypto for the document ID — no transitive uuid dependency.
    await client.create({
      _id:       `contactSubmission.${randomUUID()}`,
      _type:     "contactSubmission",
      name,
      email,
      company:   str(body.company, 200) || undefined,
      phone:     str(body.phone,    40) || undefined,
      service:   str(body.service,  80) || undefined,
      message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    const status = (e as { statusCode?: number })?.statusCode;
    console.error("[api/contact] failed", status ? `(sanity status ${status})` : "", e);
    return NextResponse.json({ error: "Could not submit message" }, { status: 500 });
  }
}
