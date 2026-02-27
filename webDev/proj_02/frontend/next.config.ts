/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow local public images (default, but we keep for clarity)
    unoptimized: false,

    // Remote images (Node backend / Cloud / CDN)
    remotePatterns: [
      // Local Node.js server (DEV)
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },

      // Production API Server
      {
        protocol: "https",
        hostname: "api.yoursite.com",
        pathname: "/uploads/**",
      },

      // Cloudinary (Example)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },

      // AWS S3 (Example)
      {
        protocol: "https",
        hostname: "your-bucket.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;