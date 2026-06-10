import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";

type Body = {
  name?:    unknown; email?:   unknown; company?: unknown;
  phone?:   unknown; service?: unknown; message?: unknown;
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const name    = str(body.name);
    const email   = str(body.email);
    const message = str(body.message);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const client = writeClient();
    await client.create({
      _type:     "contactSubmission",
      name,
      email,
      company:   str(body.company)  || undefined,
      phone:     str(body.phone)    || undefined,
      service:   str(body.service)  || undefined,
      message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
