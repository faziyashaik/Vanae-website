interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup stale records every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStale(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  rateLimitStore.forEach((record, key) => {
    record.timestamps = record.timestamps.filter(
      (ts: number) => now - ts < windowMs
    );
    if (record.timestamps.length === 0) {
      rateLimitStore.delete(key);
    }
  });
}

/**
 * Checks if a key is currently rate-limited and records an attempt.
 * Used for general API rate limiting (e.g. public enquiries).
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  cleanupStale(windowMs);

  let record = rateLimitStore.get(key);
  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(key, record);
  }

  // Filter timestamps within the current window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
    };
  }

  record.timestamps.push(now);
  return {
    allowed: true,
    remaining: maxRequests - record.timestamps.length,
  };
}

/**
 * Checks if a key has exceeded its maximum attempts without recording a new attempt.
 */
export function isRateLimited(
  key: string,
  maxAttempts: number,
  windowMs: number
): { limited: boolean; remaining: number } {
  const now = Date.now();
  cleanupStale(windowMs);

  const record = rateLimitStore.get(key);
  if (!record) {
    return { limited: false, remaining: maxAttempts };
  }

  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= maxAttempts) {
    return { limited: true, remaining: 0 };
  }

  return { limited: false, remaining: maxAttempts - record.timestamps.length };
}

/**
 * Records a failed attempt for the specified key.
 */
export function recordAttempt(key: string, windowMs: number): number {
  const now = Date.now();
  cleanupStale(windowMs);

  let record = rateLimitStore.get(key);
  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(key, record);
  }

  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);
  record.timestamps.push(now);
  return record.timestamps.length;
}

/**
 * Resets the rate limit / lockout for a specific key.
 */
export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key);
}

/**
 * Clears all rate limits in memory.
 */
export function clearAllRateLimits(): void {
  rateLimitStore.clear();
}
