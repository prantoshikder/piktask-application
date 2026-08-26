import { listTopics } from "@/server/unsplash";
import { handle, num, ok } from "../_lib";

// GET /api/categories  (Unsplash topics stand in for categories)
export async function GET(request) {
  return handle(async () => {
    const categories = await listTopics({ limit: num(request.nextUrl.searchParams.get("limit"), 30) });
    return ok({ categories, total: categories.length });
  });
}
