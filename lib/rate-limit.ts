import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// --- Upstash Redis rate limiter (persistent, works across cold starts) ---

function createUpstashLimiter() {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }

  return new Ratelimit({
    redis: new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    prefix: "dama:ratelimit",
  });
}

let upstashLimiter: Ratelimit | null | undefined;

function getUpstashLimiter() {
  if (upstashLimiter === undefined) {
    upstashLimiter = createUpstashLimiter();
  }
  return upstashLimiter;
}

// --- In-memory fallback (for local development without Redis) ---

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hora
const MAX_REQUESTS = 5;

function inMemoryRateLimit(ip: string): { success: boolean } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.lastReset > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return { success: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false };
  }

  entry.count++;
  return { success: true };
}

// --- Public API (same signature as before) ---

export async function rateLimit(ip: string): Promise<{ success: boolean }> {
  const limiter = getUpstashLimiter();

  if (limiter) {
    const { success } = await limiter.limit(ip);
    return { success };
  }

  return inMemoryRateLimit(ip);
}
