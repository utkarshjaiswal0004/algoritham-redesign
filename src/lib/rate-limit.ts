/**
 * Tiny in-memory token-bucket rate limiter for Route Handlers.
 *
 * Per Vercel serverless-instance, not global — but that's fine here:
 *   - each instance still enforces its own limit
 *   - Vercel routes bursts to a small handful of instances, so a real
 *     attacker still hits the limit within seconds
 *   - we're protecting Sanity write quota + your inbox, not doing WAF
 *
 * For strict global rate limiting later, swap `buckets` for Upstash Redis.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Best-effort cleanup so the map doesn't grow unbounded.
function maybeSweep(now: number) {
  if (buckets.size < 5_000) return;
  for (const [key, b] of buckets) if (b.resetAt < now) buckets.delete(key);
}

export type RateLimitResult = {
  ok:        boolean;
  remaining: number;
  resetAt:   number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  maybeSweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt < now) {
    const b: Bucket = { count: 1, resetAt: now + windowMs };
    buckets.set(key, b);
    return { ok: true, remaining: limit - 1, resetAt: b.resetAt };
  }

  existing.count += 1;
  const ok = existing.count <= limit;
  return { ok, remaining: Math.max(0, limit - existing.count), resetAt: existing.resetAt };
}

/**
 * Best-effort client IP from Vercel's forwarding headers.
 * Falls back to a static bucket so localhost/dev still gets limited.
 */
export function clientKey(req: Request, tag: string): string {
  const h = req.headers;
  const ip =
    h.get("x-real-ip") ??
    (h.get("x-forwarded-for") ?? "").split(",")[0].trim() ??
    "unknown";
  return `${tag}:${ip || "unknown"}`;
}
