import { searchPhotos } from "@/server/unsplash";
import { handle, num, ok } from "../../_lib";

// GET /api/client/search/?title=&category_id=&limit=&page=
export async function GET(request) {
  return handle(async () => {
    const q = request.nextUrl.searchParams;
    // The tag page calls this with ?tag=, the search page with ?title=.
    const term = q.get("title") || q.get("tag") || q.get("q") || q.get("keyword") || "";
    const { results, total, total_pages } = await searchPhotos({
      query: term,
      page: num(q.get("page"), 1),
      limit: num(q.get("limit"), 24),
    });
    // Consumers read `results` here but `images` on the listing endpoints.
    return ok({ results, images: results, total, total_pages });
  });
}
