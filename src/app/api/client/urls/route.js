import { imageBaseUrls } from "@/server/unsplash";
import { ok } from "../../_lib";

// Unsplash serves absolute image URLs, so every base is empty.
export async function GET() {
  return ok({ urls: imageBaseUrls() });
}
