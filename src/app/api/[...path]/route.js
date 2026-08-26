import { NextResponse } from "next/server";

/**
 * Catch-all for the parts of the original piktask API that Unsplash cannot
 * stand in for - auth, uploads, earnings, withdrawals, favourites and so on.
 *
 * It answers in the same `{ status: false, message }` envelope the app already
 * handles, so those screens show their empty state instead of throwing on a
 * network error.
 */
const notImplemented = async (request, { params }) => {
  const { path } = await params;
  return NextResponse.json(
    {
      status: false,
      message: `This deployment serves images from Unsplash; /${(path || []).join("/")} is not available.`,
    },
    { status: 501 }
  );
};

export const GET = notImplemented;
export const POST = notImplemented;
export const PUT = notImplemented;
export const PATCH = notImplemented;
export const DELETE = notImplemented;
