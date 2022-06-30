/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "avatars.githubusercontent.com"],
  },
  env: {
    IMAGE_URL: process.env.IMAGE_URL,
  },
};

module.exports = nextConfig;
