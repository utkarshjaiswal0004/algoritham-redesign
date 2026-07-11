/**
 * Chat endpoint for the site assistant.
 *
 * With CHATBOT_API_KEY set  → streams a grounded LLM answer (any
 *   OpenAI-compatible provider: Groq, OpenAI, Together, etc.).
 * Without a key             → instant keyword-matched answer from the
 *   curated FAQ base (still useful, zero cost).
 *
 * Guardrails: full company knowledge doc in the system prompt, strict
 * on-topic instructions, short-answer style, rate limiting, size caps.
 */
import { NextResponse } from "next/server";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { knowledgeDoc, fallbackAnswer } from "@/lib/chatbot/knowledge";

const MAX_BODY_BYTES = 16 * 1024;
const MAX_MESSAGES   = 20;
const MAX_MSG_CHARS  = 1_000;

const API_URL   = process.env.CHATBOT_API_URL?.trim()  || "https://api.groq.com/openai/v1";
const API_KEY   = process.env.CHATBOT_API_KEY?.trim()  || "";
const MODEL     = process.env.CHATBOT_MODEL?.trim()    || "llama-3.3-70b-versatile";

type ChatMessage = { role: "user" | "assistant"; content: string };

function systemPrompt(knowledge: string): string {
  return [
    "You are the website assistant for Algoritham Infrastructure Pvt. Ltd., a Mumbai-based national IT integrator.",
    "Answer ONLY using the knowledge document below. If the answer is not in it, say you don't have that detail and offer the contact options instead. Never invent prices, SLAs, client names, or capabilities.",
    "Stay strictly on topics related to Algoritham and enterprise IT services (infrastructure, cloud, cybersecurity, networking, telecom, system integration). If asked about anything else, politely steer back to how Algoritham can help.",
    "Style: warm, professional, concise — 1-4 short sentences unless the user asks for detail. Plain text only, no markdown syntax.",
    "When the user shows buying intent (pricing, timelines, wanting to talk), offer: call Princy Gupta at +91 95942 67666, email info@algoritham.in, or the free IT assessment via the contact page.",
    "If the user asks to schedule a meeting, tell them they can use the 'Schedule a meeting' button right here in the chat, or call the numbers above.",
    "",
    "===== KNOWLEDGE DOCUMENT =====",
    knowledge,
  ].join("\n");
}

export async function POST(req: Request) {
  const rl = rateLimit(clientKey(req, "chat"), { limit: 20, windowMs: 5 * 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many messages — please wait a moment." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } },
    );
  }

  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    if (!Array.isArray(body?.messages)) throw new Error("bad shape");
    messages = (body.messages as ChatMessage[])
      .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-MAX_MESSAGES)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MSG_CHARS) }));
    if (messages.length === 0 || messages[messages.length - 1].role !== "user") throw new Error("no user msg");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const lastUser = messages[messages.length - 1].content;

  // ── No key configured → instant grounded fallback ────────────────────
  if (!API_KEY) {
    return NextResponse.json({ reply: fallbackAnswer(lastUser), mode: "faq" });
  }

  // ── LLM path: stream a grounded answer ───────────────────────────────
  try {
    const knowledge = await knowledgeDoc();

    const upstream = await fetch(`${API_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.3,
        max_tokens: 400,
        messages: [
          { role: "system", content: systemPrompt(knowledge) },
          ...messages,
        ],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const detail = await upstream.text().catch(() => "");
      console.error("[api/chat] upstream error", upstream.status, detail.slice(0, 300));
      // Graceful degrade: keyword answer instead of an error bubble
      return NextResponse.json({ reply: fallbackAnswer(lastUser), mode: "faq" });
    }

    // Re-stream plain text: parse the OpenAI SSE format, emit only deltas.
    const reader  = upstream.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
      async pull(controller) {
        const { done, value } = await reader.read();
        if (done) { controller.close(); return; }
        const text = decoder.decode(value, { stream: true });
        for (const line of text.split("\n")) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const delta = JSON.parse(payload)?.choices?.[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          } catch { /* partial JSON across chunks — skip */ }
        }
      },
      cancel() { reader.cancel().catch(() => {}); },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Chat-Mode": "llm",
      },
    });
  } catch (e) {
    console.error("[api/chat] failed", e);
    return NextResponse.json({ reply: fallbackAnswer(lastUser), mode: "faq" });
  }
}
