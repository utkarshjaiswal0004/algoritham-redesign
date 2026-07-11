"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, X, Send, Phone, CalendarClock, Sparkles,
  ArrowLeft, CheckCircle,
} from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTED = [
  "What services do you offer?",
  "Which industries do you serve?",
  "What's your uptime SLA?",
  "How do I get a free IT assessment?",
];

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm the Algoritham assistant. Ask me anything about our IT services, coverage, or track record — or use the buttons below to call us or schedule a meeting.",
};

type Panel = "chat" | "schedule" | "scheduled";

type Props = {
  phonePrimary: string;   // Princy
  phoneOffice?: string;
  email?: string;
};

export function ChatWidget({ phonePrimary, phoneOffice, email }: Props) {
  const [open, setOpen]         = useState(false);
  const [panel, setPanel]       = useState<Panel>("chat");
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput]       = useState("");
  const [busy, setBusy]         = useState(false);
  const [meeting, setMeeting]   = useState({ name: "", email: "", phone: "", message: "" });
  const [meetingBusy, setMeetingBusy] = useState(false);
  const [meetingErr,  setMeetingErr]  = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Restore session transcript
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("algo-chat");
      if (saved) setMessages(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    try { sessionStorage.setItem("algo-chat", JSON.stringify(messages.slice(-30))); } catch { /* ignore */ }
  }, [messages]);

  // Autoscroll on new content
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, panel]);

  const send = useCallback(async (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    setInput("");
    setBusy(true);

    const history: Msg[] = [...messages, { role: "user", content: question }];
    setMessages(history);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Don't send the canned greeting — only real conversation turns.
        body: JSON.stringify({ messages: history.filter((m) => m !== GREETING).slice(-12) }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({} as { error?: string }));
        setMessages((m) => [...m, {
          role: "assistant",
          content: data.error ?? `Something went wrong — please call ${phonePrimary} and we'll help right away.`,
        }]);
        return;
      }

      const isStream = (res.headers.get("content-type") ?? "").includes("text/plain");
      if (isStream && res.body) {
        // Streamed LLM answer — append tokens as they arrive
        setMessages((m) => [...m, { role: "assistant", content: "" }]);
        const reader  = res.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          if (!chunk) continue;
          setMessages((m) => {
            const next = [...m];
            next[next.length - 1] = {
              role: "assistant",
              content: next[next.length - 1].content + chunk,
            };
            return next;
          });
        }
      } else {
        const data = await res.json();
        setMessages((m) => [...m, { role: "assistant", content: data.reply ?? "…" }]);
      }
    } catch {
      setMessages((m) => [...m, {
        role: "assistant",
        content: `I'm having a connection issue. Please call ${phonePrimary} (Princy) — the team will help immediately.`,
      }]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }, [busy, messages, phonePrimary]);

  async function submitMeeting(e: React.FormEvent) {
    e.preventDefault();
    setMeetingBusy(true); setMeetingErr(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    meeting.name,
          email:   meeting.email,
          phone:   meeting.phone,
          service: "Meeting Request (Chat)",
          message: meeting.message || "Meeting requested via the website chat assistant.",
          hp: "",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({} as { error?: string }));
        throw new Error(data.error ?? "Could not submit");
      }
      setPanel("scheduled");
      setMeeting({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setMeetingErr(err instanceof Error ? err.message : "Could not submit — please try calling instead.");
    } finally {
      setMeetingBusy(false);
    }
  }

  return (
    <>
      {/* ── Launcher ──────────────────────────────────────────── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 16 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            aria-label="Open chat assistant"
            className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-xl shadow-violet-500/40 hover:shadow-violet-500/60 text-white flex items-center justify-center"
          >
            <MessageCircle size={22} />
            {/* Idle pulse ring */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] animate-ping opacity-20 pointer-events-none" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Panel ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed z-[60] bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 sm:w-[400px] flex flex-col rounded-3xl overflow-hidden border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-2xl shadow-violet-500/25"
            style={{ maxHeight: "min(640px, calc(100dvh - 2rem))" }}
            role="dialog"
            aria-label="Algoritham chat assistant"
          >
            {/* Header */}
            <div className="relative shrink-0 px-5 py-4 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white">
              <div className="flex items-center gap-3">
                {panel !== "chat" && (
                  <button
                    onClick={() => setPanel("chat")}
                    aria-label="Back to chat"
                    className="w-7 h-7 -ml-1 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                  >
                    <ArrowLeft size={14} />
                  </button>
                )}
                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm leading-tight">Algoritham Assistant</p>
                  <p className="text-[11px] text-white/75 leading-tight flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                    Online — replies instantly
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="ml-auto w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* ── CHAT PANEL ─────────────────────────────────── */}
            {panel === "chat" && (
              <>
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[260px]">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={
                          m.role === "user"
                            ? "max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm leading-relaxed text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] shadow-md shadow-violet-500/20"
                            : "max-w-[85%] rounded-2xl rounded-bl-md px-4 py-2.5 text-sm leading-relaxed text-[var(--text-1)] bg-[var(--bg-card-2)] border border-[var(--border)]"
                        }
                      >
                        {m.content || (busy && i === messages.length - 1 ? <TypingDots /> : "")}
                      </div>
                    </div>
                  ))}
                  {busy && messages[messages.length - 1]?.role === "user" && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-bl-md px-4 py-3 bg-[var(--bg-card-2)] border border-[var(--border)]">
                        <TypingDots />
                      </div>
                    </div>
                  )}

                  {/* Suggested questions — only while the conversation is fresh */}
                  {messages.length <= 1 && !busy && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {SUGGESTED.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="text-[12px] px-3 py-1.5 rounded-full border border-[var(--accent-violet-border)] bg-[var(--accent-violet-bg)] text-[var(--accent-violet)] hover:opacity-80 transition-opacity text-left"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick actions */}
                <div className="shrink-0 px-4 pt-2 pb-1 flex gap-2">
                  <a
                    href={`tel:${phonePrimary.replace(/\s/g, "")}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold border border-[var(--border)] bg-[var(--bg-card-2)] text-[var(--text-1)] hover:border-[var(--accent-violet-border)] transition-colors"
                  >
                    <Phone size={12} className="text-[var(--accent-violet)]" />
                    Call {phonePrimary}
                  </a>
                  <button
                    onClick={() => setPanel("schedule")}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 transition-shadow"
                  >
                    <CalendarClock size={12} />
                    Schedule a meeting
                  </button>
                </div>

                {/* Input */}
                <form
                  onSubmit={(e) => { e.preventDefault(); send(input); }}
                  className="shrink-0 p-3 flex gap-2 border-t border-[var(--border)] mt-1"
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about our services…"
                    maxLength={800}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border)] text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)] focus:outline-none focus:border-[var(--accent-violet-border)] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={busy || !input.trim()}
                    aria-label="Send message"
                    className="w-10 h-10 shrink-0 rounded-xl text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] flex items-center justify-center shadow-md shadow-violet-500/25 disabled:opacity-40 transition-opacity"
                  >
                    <Send size={15} />
                  </button>
                </form>
              </>
            )}

            {/* ── SCHEDULE PANEL ─────────────────────────────── */}
            {panel === "schedule" && (
              <form onSubmit={submitMeeting} className="flex-1 overflow-y-auto px-5 py-5 space-y-3.5">
                <div>
                  <h3 className="text-[var(--text-1)] font-bold text-base mb-1">Schedule a meeting</h3>
                  <p className="text-[var(--text-3)] text-xs leading-relaxed">
                    Leave your details — the team confirms a slot within 1 business day.
                    Prefer to talk now? Call {phonePrimary}{phoneOffice ? ` or ${phoneOffice}` : ""}.
                  </p>
                </div>
                {[
                  { k: "name",  ph: "Your name *",           type: "text",  req: true  },
                  { k: "email", ph: "Work email *",           type: "email", req: true  },
                  { k: "phone", ph: "Phone (optional)",       type: "tel",   req: false },
                ].map((f) => (
                  <input
                    key={f.k}
                    type={f.type}
                    required={f.req}
                    placeholder={f.ph}
                    value={meeting[f.k as keyof typeof meeting]}
                    onChange={(e) => setMeeting({ ...meeting, [f.k]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border)] text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)] focus:outline-none focus:border-[var(--accent-violet-border)] transition-colors"
                  />
                ))}
                <textarea
                  rows={3}
                  placeholder="What would you like to discuss? (optional)"
                  value={meeting.message}
                  onChange={(e) => setMeeting({ ...meeting, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card-2)] border border-[var(--border)] text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)] focus:outline-none focus:border-[var(--accent-violet-border)] transition-colors resize-none"
                />
                {meetingErr && <p className="text-xs text-rose-500">{meetingErr}</p>}
                <button
                  type="submit"
                  disabled={meetingBusy}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow disabled:opacity-60"
                >
                  <CalendarClock size={14} />
                  {meetingBusy ? "Sending…" : "Request meeting"}
                </button>
              </form>
            )}

            {/* ── CONFIRMATION ───────────────────────────────── */}
            {panel === "scheduled" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-10">
                <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center mb-4">
                  <CheckCircle size={26} className="text-green-500" />
                </div>
                <h3 className="text-[var(--text-1)] font-bold text-lg mb-1.5">Request received!</h3>
                <p className="text-[var(--text-2)] text-sm leading-relaxed mb-6">
                  The team will reach out within 1 business day to confirm your slot.
                  {email ? ` You can also write to ${email}.` : ""}
                </p>
                <button
                  onClick={() => setPanel("chat")}
                  className="text-sm font-semibold text-[var(--accent-violet)] hover:opacity-80 transition-opacity"
                >
                  ← Back to chat
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1.1, delay: i * 0.18, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-[var(--accent-violet)]"
        />
      ))}
    </span>
  );
}
