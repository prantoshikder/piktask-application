import { topContributors } from "@/server/unsplash";
import { handle, num, ok } from "../../_lib";

// GET /api/contributor/top/ - photographers behind the most popular photos
export async function GET(request) {
  return handle(async () => {
    const users = await topContributors(num(request.nextUrl.searchParams.get("limit"), 8));
    return ok({ users, contributors: users, sellers: users });
  });
}
