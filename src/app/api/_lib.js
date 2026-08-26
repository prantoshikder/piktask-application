import { NextResponse } from "next/server";
import { UnsplashError } from "@/server/unsplash";

/** The original backend wrapped every payload in `{ status: true, ... }`. */
export const ok = (payload) => NextResponse.json({ status: true, ...payload });

export const fail = (message, status = 500) =>
  NextResponse.json({ status: false, message }, { status });

export const num = (value, fallback) => {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

/** Turns an Unsplash failure into the `{ status: false }` shape callers expect. */
export async function handle(fn) {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof UnsplashError) return fail(error.message, error.status);
    return fail(error?.message || "Unexpected error", 500);
  }
}
