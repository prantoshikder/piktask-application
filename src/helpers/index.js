export const getYear = (date) => {
  return date;
};

export const dateFormat = (time) => {
  return time;
};

const EMPTY_BASE_URLS = {
  bucket_base_url: "",
  profiles: "",
  images: "",
  categories: "",
  blog_images: "",
};

const BASE_URL_GLOBAL = "__PIKTASK_BASE_URLS__";
const BASE_URL_STORAGE_KEY = "imageBaseURL";

const pickBaseURLs = (urls) => ({
  bucket_base_url: urls.bucket_base_url,
  profiles: urls.profiles,
  images: urls.images,
  categories: urls.categories,
  blog_images: urls.blog_images,
});

/**
 * Seeds the image base URLs.
 *
 * Under CRA these came from a /client/urls call in App.jsx and lived only in
 * localStorage, which is unreachable during a server render. They are now also
 * mirrored onto a global so that getBaseURL() resolves identically on the
 * server, during hydration, and on the client.
 */
export const setBaseURL = (urls) => {
  if (!urls) return;

  const picked = pickBaseURLs(urls);
  globalThis[BASE_URL_GLOBAL] = picked;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(BASE_URL_STORAGE_KEY, JSON.stringify(urls));
  }
};

/**
 * Always returns an object, never undefined — call sites index straight into
 * the result (`getBaseURL().bucket_base_url`), so returning undefined as the
 * CRA version did would throw during SSR and on a cold cache.
 */
export const getBaseURL = () => {
  if (globalThis[BASE_URL_GLOBAL]) {
    return globalThis[BASE_URL_GLOBAL];
  }

  if (typeof window === "undefined") {
    return EMPTY_BASE_URLS;
  }

  const clientURL = window.localStorage.getItem(BASE_URL_STORAGE_KEY);
  if (!clientURL) return EMPTY_BASE_URLS;

  try {
    const picked = pickBaseURLs(JSON.parse(clientURL));
    globalThis[BASE_URL_GLOBAL] = picked;
    return picked;
  } catch {
    return EMPTY_BASE_URLS;
  }
};

export const imageObjSchema = (schemaData) => {
  if (typeof document === "undefined") return;

  const target = document.querySelector('script[data-test="image-object"]');
  if (!target) return;

  const schemaObj = {
    ...schemaData,
    "@context": "http://schema.org",
    "@type": "ImageObject",
    datePublished: schemaData.datePublished ? schemaData.datePublished : "05/12/2021",
    fileFormat: schemaData.fileFormat ? schemaData.fileFormat : "image/jpeg",
    license: "https://piktask.com/license-agreement",
  };

  target.textContent = JSON.stringify(schemaObj);
};

export const expiredLoginTime = () => {
  if (typeof window === "undefined") return undefined;

  window.localStorage.removeItem("token");
  return (window.location.href = "/login");
};

export const getWords = (amount, str) => {
  const strArray = String(str ?? "").split(" ");
  const newDescription = strArray.splice(0, amount).join(" ");

  return newDescription;
};
