/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The app server-renders, so it can no longer be served as static files
  // from nginx the way the CRA build was. `standalone` emits a self-contained
  // Node server at .next/standalone/server.js.
  output: "standalone",
  // MUI + tss-react need transpiling of ESM-only deps that ship untranspiled JSX/ESM.
  transpilePackages: ["tss-react"],
  images: {
    // Product/profile images are served from the API bucket, whose host comes
    // from /client/urls at runtime. Allow any https host so <Image> can be
    // adopted incrementally; tighten this once the bucket domain is fixed.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
