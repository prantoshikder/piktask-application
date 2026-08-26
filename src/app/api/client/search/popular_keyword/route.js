import { listTopics } from "@/server/unsplash";
import { handle, num, ok } from "../../../_lib";

// GET /api/client/search/popular_keyword?limit=
// Unsplash has no trending-terms endpoint; featured topic titles stand in.
// Consumers render these directly (`keyWord.toLowerCase()`), so this must be a
// plain array of strings, not objects.
export async function GET(request) {
  return handle(async () => {
    const limit = num(request.nextUrl.searchParams.get("limit"), 12);
    const topics = await listTopics({ limit: Math.min(limit, 30) });
    const keywords = topics.map((t) => t.name).filter(Boolean);
    return ok({ keywords });
  });
}
