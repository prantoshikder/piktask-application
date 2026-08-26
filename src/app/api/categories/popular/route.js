import { listTopics } from "@/server/unsplash";
import { handle, num, ok } from "../../_lib";

// GET /api/categories/popular?limit=6
export async function GET(request) {
  return handle(async () => {
    const categories = await listTopics({ limit: num(request.nextUrl.searchParams.get("limit"), 6) });
    return ok({ categories });
  });
}
