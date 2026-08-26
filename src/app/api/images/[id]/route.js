import { getPhoto } from "@/server/unsplash";
import { handle, ok } from "../../_lib";

// GET /api/images/:id
export async function GET(request, { params }) {
  return handle(async () => {
    const { id } = await params;
    const image = await getPhoto(id);
    return ok({ image, images: [image], detail: image });
  });
}
