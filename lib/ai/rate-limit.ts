import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

// Per-user limits for AI calls. Conservative by default; tune if needed.
export const AI_RATE_LIMIT = {
  perHour: 20,
  perDay: 80,
};

const TABLE_MISSING_CODES = new Set(["42P01", "PGRST205"]);

type LimitResult =
  | { ok: true }
  | { ok: false; reason: "hour" | "day"; retryAfterSeconds: number };

/**
 * Check whether a user is allowed to call an AI action right now.
 *
 * Fail-open behavior: if the ai_usage table is missing (migration not yet
 * applied) we allow the request but log a warning. This way the feature keeps
 * working in environments where the second migration hasn't been run, and
 * starts enforcing the limit automatically once it is.
 */
export async function checkAiRateLimit(
  supabase: SupabaseClient,
  userId: string,
): Promise<LimitResult> {
  const now = Date.now();
  const oneHourAgo = new Date(now - 60 * 60 * 1000).toISOString();
  const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("ai_usage")
    .select("created_at")
    .eq("user_id", userId)
    .gte("created_at", oneDayAgo)
    .order("created_at", { ascending: false });

  if (error) {
    if (error.code && TABLE_MISSING_CODES.has(error.code)) {
      console.warn(
        "[ai_rate_limit] ai_usage table not found — skipping check. " +
          "Run supabase/migrations/0002_ai_usage.sql to enable rate limiting.",
      );
      return { ok: true };
    }
    console.error("[ai_rate_limit] read failed:", error);
    return { ok: true };
  }

  const rows = data ?? [];
  if (rows.length >= AI_RATE_LIMIT.perDay) {
    return {
      ok: false,
      reason: "day",
      retryAfterSeconds: 60 * 60,
    };
  }

  const hourRows = rows.filter((r) => r.created_at >= oneHourAgo);
  if (hourRows.length >= AI_RATE_LIMIT.perHour) {
    return {
      ok: false,
      reason: "hour",
      retryAfterSeconds: 15 * 60,
    };
  }

  return { ok: true };
}

export async function logAiUsage(
  supabase: SupabaseClient,
  userId: string,
  action = "improve_prompt",
): Promise<void> {
  const { error } = await supabase
    .from("ai_usage")
    .insert({ user_id: userId, action });
  if (error && !(error.code && TABLE_MISSING_CODES.has(error.code))) {
    console.error("[ai_rate_limit] log failed:", error);
  }
}
