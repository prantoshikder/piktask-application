import "server-only";

/**
 * Unsplash-backed replacement for the piktask image API.
 *
 * The app's components were written against the original backend's payloads, so
 * everything here maps Unsplash objects onto that shape (image_id, preview,
 * avatar, total_downloads, ...) rather than changing ~50 components.
 *
 * The access key is read from the server-only UNSPLASH_ACCESS_KEY, so it is
 * never included in the client bundle - every call goes through the route
 * handlers in src/app/api.
 */

const API = "https://api.unsplash.com";

// Unsplash's Demo tier allows only 50 requests/hour, so responses are cached
// aggressively. Without this, browsing a few pages would exhaust the quota.
const REVALIDATE = 3600;

class UnsplashError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function unsplash(path, params = {}, revalidate = REVALIDATE) {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) throw new UnsplashError("UNSPLASH_ACCESS_KEY is not configured", 500);

  const url = new URL(API + path);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${key}`,
      "Accept-Version": "v1",
    },
    next: { revalidate },
  });

  if (res.status === 403) {
    throw new UnsplashError("Unsplash rate limit reached (Demo apps allow 50 requests/hour)", 429);
  }
  if (!res.ok) {
    throw new UnsplashError(`Unsplash responded ${res.status}`, res.status);
  }

  return res.json();
}

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "photo";

const titleOf = (photo) => {
  const raw = photo.description || photo.alt_description || "Untitled photo";
  const clean = raw.trim().replace(/\s+/g, " ");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};

/**
 * Unsplash photo -> the product shape the UI renders.
 *
 * `preview`/`thumbnail`/`avatar` are absolute URLs. The components build image
 * sources by concatenating getBaseURL() parts in front of them, and /client/urls
 * now returns empty strings for those parts, so the absolute URL survives intact.
 */
export function mapPhoto(photo, categoryName = "photos") {
  return {
    id: photo.id,
    image_id: photo.id,
    title: titleOf(photo),
    slug: slugify(titleOf(photo)),
    preview: photo.urls?.regular,
    thumbnail: photo.urls?.small,
    original: photo.urls?.full,
    extension: "jpg",
    category: categoryName,
    item_for_sale: 0,
    width: photo.width,
    height: photo.height,
    color: photo.color,
    blur_hash: photo.blur_hash,

    // photographer -> "author"
    user_id: photo.user?.id,
    name: photo.user?.name,
    username: photo.user?.username,
    avatar: photo.user?.profile_image?.medium,
    total_followers: photo.user?.total_collections ?? 0,

    total_likes: photo.likes ?? 0,
    total_downloads: photo.downloads ?? photo.likes ?? 0,
    total_download: photo.downloads ?? photo.likes ?? 0,
    total_views: photo.views ?? 0,
    isLike: !!photo.liked_by_user,

    created_at: photo.created_at,
    updated_at: photo.updated_at,

    // Unsplash attribution is required by their API guidelines.
    unsplash_url: photo.links?.html,
    unsplash_download_location: photo.links?.download_location,
    attribution: photo.user?.name ? `Photo by ${photo.user.name} on Unsplash` : "Photo on Unsplash",
  };
}

/** Unsplash topic -> the category shape the UI renders. */
export function mapTopic(topic) {
  return {
    id: topic.id,
    name: topic.title,
    slug: topic.slug,
    description: topic.description,
    total_images: topic.total_photos ?? 0,
    thumbnail: topic.cover_photo?.urls?.small,
    preview: topic.cover_photo?.urls?.regular,
  };
}

/** Unsplash user -> the "top seller"/contributor shape. */
export function mapUser(user) {
  return {
    id: user.id,
    user_id: user.id,
    name: user.name,
    username: user.username,
    avatar: user.profile_image?.medium,
    total_images: user.total_photos ?? 0,
    total_likes: user.total_likes ?? 0,
    total_followers: user.followers_count ?? 0,
    bio: user.bio,
    unsplash_url: user.links?.html,
  };
}

/* ------------------------------------------------------------------ queries */

export async function listPhotos({ sort = "popular", page = 1, limit = 24 } = {}) {
  const data = await unsplash("/photos", {
    order_by: sort === "recent" || sort === "latest" ? "latest" : "popular",
    page,
    per_page: Math.min(limit, 30),
  });
  return data.map((p) => mapPhoto(p));
}

export async function getPhoto(id) {
  const photo = await unsplash(`/photos/${id}`);
  const topic = Object.values(photo.topic_submissions || {})[0];
  return mapPhoto(photo, topic?.status === "approved" ? "photos" : "photos");
}

export async function relatedPhotos(id, limit = 12) {
  const photo = await unsplash(`/photos/${id}`);
  const query =
    photo.tags?.[0]?.title || photo.topics?.[0]?.title || photo.alt_description || "nature";
  const data = await unsplash("/search/photos", { query, per_page: Math.min(limit, 30) });
  return (data.results || []).filter((p) => p.id !== id).map((p) => mapPhoto(p));
}

export async function searchPhotos({ query, page = 1, limit = 24 } = {}) {
  const data = await unsplash("/search/photos", {
    query: query || "design",
    page,
    per_page: Math.min(limit, 30),
  });
  return {
    results: (data.results || []).map((p) => mapPhoto(p)),
    total: data.total ?? 0,
    total_pages: data.total_pages ?? 0,
  };
}

export async function listTopics({ page = 1, limit = 30 } = {}) {
  const data = await unsplash("/topics", { page, per_page: Math.min(limit, 30), order_by: "featured" });
  return data.map(mapTopic);
}

export async function getTopic(slug) {
  const topic = await unsplash(`/topics/${slug}`);
  return mapTopic(topic);
}

export async function topicPhotos(slug, { page = 1, limit = 24 } = {}) {
  // Some call sites still pass the old backend's numeric category ids (the home
  // page hard-codes /categories/53). Unsplash topics are keyed by id-or-slug, so
  // a numeric value can never match; fall back to popular photos rather than
  // leaving the section empty.
  const numericLegacyId = /^\d+$/.test(String(slug));

  if (!numericLegacyId) {
    try {
      const [topic, photos] = await Promise.all([
        unsplash(`/topics/${slug}`),
        unsplash(`/topics/${slug}/photos`, { page, per_page: Math.min(limit, 30) }),
      ]);
      return {
        category: mapTopic(topic),
        images: photos.map((p) => mapPhoto(p, topic.title)),
      };
    } catch (error) {
      if (error.status !== 404) throw error;
    }
  }

  const images = await listPhotos({ sort: "popular", page, limit });
  return {
    category: {
      id: slug,
      name: "Featured",
      slug: String(slug),
      total_images: images.length,
      thumbnail: images[0]?.thumbnail,
      preview: images[0]?.preview,
    },
    images,
  };
}

export async function topContributors(limit = 8) {
  // Unsplash has no "top users" endpoint; the photographers behind the most
  // popular photos are a reasonable stand-in.
  const photos = await unsplash("/photos", { order_by: "popular", per_page: 30 });
  const seen = new Map();
  for (const p of photos) {
    if (p.user && !seen.has(p.user.id)) seen.set(p.user.id, p.user);
  }
  return [...seen.values()].slice(0, limit).map(mapUser);
}

/**
 * Base URLs the app prefixes onto image paths. Unsplash returns absolute URLs,
 * so every part is empty and the concatenation is a no-op.
 */
export function imageBaseUrls() {
  return {
    bucket_base_url: "",
    images: "",
    profiles: "",
    categories: "",
    blog_images: "",
  };
}

export { UnsplashError };
