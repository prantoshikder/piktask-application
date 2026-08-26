import { topicPhotos } from "@/server/unsplash";
import { handle, num, ok } from "../../_lib";

// GET /api/categories/:slug - the category plus its photos
export async function GET(request, { params }) {
  return handle(async () => {
    const { slug } = await params;
    const q = request.nextUrl.searchParams;
    const { category, images } = await topicPhotos(slug, {
      page: num(q.get("page"), 1),
      limit: num(q.get("limit"), 24),
    });
    return ok({ category, categories: [category], images, total: category.total_images });
  });
}
