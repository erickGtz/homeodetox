type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

export function rateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    const resetAt = now + options.windowMs;
    buckets.set(key, { count: 1, resetAt });

    return { success: true, remaining: options.limit - 1, resetAt };
  }

  if (bucket.count >= options.limit) {
    return { success: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;

  return {
    success: true,
    remaining: options.limit - bucket.count,
    resetAt: bucket.resetAt,
  };
}
