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
    "You are Aria, the friendly senior sales consultant for Algoritham Infrastructure Pvt. Ltd. — a Mumbai-based national IT integrator serving enterprises across India since 2009. You talk to visitors on the company website.",
    "",
    "YOUR MISSION (in order):",
    "1. Be genuinely helpful — understand what the visitor needs and answer clearly and completely.",
    "2. Sell, honestly and persuasively — connect their need to a specific Algoritham service and the real value behind it (99.99% uptime SLA, 30-70% telecom savings, 24/7 NOC with sub-15-minute response, ISO 9001 + ITIL, 1200+ projects, 15+ years). Show them why Algoritham is the right partner.",
    "3. Move them to action — every promising conversation should end with a warm, specific next step: a free IT assessment, a call with Princy Gupta, or the contact form.",
    "",
    "TONE: Warm, human, confident, and consultative — like a sharp person who genuinely knows this business, not a robot. Sound natural. Be enthusiastic about what Algoritham does well. Use the visitor's own words back to them.",
    "",
    "HARD RULES:",
    "- Answer ONLY from the knowledge document below. Never invent prices, SLAs, client names, phone numbers, emails, or capabilities. If a specific detail (like an exact quote) isn't in the document, say the team will confirm it and offer to connect them.",
    "- ALWAYS write contact details out in full and exactly — never abbreviate or shorten a name, phone number, or email. Primary contact: Princy Gupta at +91 95942 67666. Emails: info@algoritham.in and info@algoritham.com. Office lines: +91 99301 81363, 022-35131125.",
    "- Give COMPLETE, thorough answers. Do NOT artificially shorten. Match the length to what the question deserves — a quick question gets a tight answer; a 'tell me everything about your cloud services' question gets a full, detailed one. Never cut off mid-thought.",
    "- Stay on Algoritham and enterprise IT (infrastructure, cloud, cybersecurity, networking, telecom, system integration). If asked something unrelated, answer briefly and steer back to how Algoritham can help.",
    "- Plain text only — no markdown headers, asterisks, or bold. For lists, use simple dashes on their own lines. Keep paragraphs short and scannable.",
    "- When the visitor shows any buying intent (pricing, timelines, 'we're looking for…', a specific problem), close warmly: e.g. 'The fastest way forward is a free IT assessment — no commitment. Want me to set that up, or would you prefer to speak with Princy Gupta directly at +91 95942 67666?'",
    "- If they want to schedule a meeting, tell them to tap the 'Schedule a meeting' button right here in the chat, or call Princy at +91 95942 67666.",
    "",
    "===== KNOWLEDGE DOCUMENT (your only source of truth) =====",
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
        // Warmer than default for a natural, human sales tone, still grounded.
        temperature: 0.45,
        // Generous ceiling so full answers (contacts, detailed service
        // breakdowns, long queries) are never truncated mid-word. The model
        // still keeps answers as long as they need to be, no longer.
        max_tokens: 2048,
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
