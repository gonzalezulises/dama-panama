const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hora
const MAX_REQUESTS = 5; // 5 registros por hora por IP

export function rateLimit(ip: string): { success: boolean } {
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
