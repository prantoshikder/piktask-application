import { listPhotos } from "@/server/unsplash";
import { handle, num, ok } from "../_lib";

// GET /api/images?sort_by=popular|recent&limit=&page=
export async function GET(request) {
  return handle(async () => {
    const q = request.nextUrl.searchParams;
    const images = await listPhotos({
      sort: q.get("sort_by") || "popular",
      page: num(q.get("page"), 1),
      limit: num(q.get("limit"), 24),
    });
    return ok({ images, total: images.length });
  });
}
