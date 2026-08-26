import { relatedPhotos } from "@/server/unsplash";
import { handle, num, ok } from "../../../_lib";

// GET /api/images/:id/related_image
export async function GET(request, { params }) {
  return handle(async () => {
    const { id } = await params;
    const images = await relatedPhotos(id, num(request.nextUrl.searchParams.get("limit"), 12));
    return ok({ images, relatedImages: images });
  });
}
