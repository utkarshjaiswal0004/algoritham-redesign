import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json();
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const client = writeClient();
    await client.create({
      _type: "subscriber",
      email,
      source: typeof source === "string" ? source : undefined,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
