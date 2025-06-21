/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // Increase from default 1mb to 5mb
    },
  },
  // Ensure proper static file handling
  trailingSlash: false,
  // Add image optimization configuration
  images: {
    domains: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp", "image/avif"],
    unoptimized: true, // disable built-in image optimization in production
  },
  // Ensure public folder is properly handled
  assetPrefix: "",
};

export default nextConfig;
