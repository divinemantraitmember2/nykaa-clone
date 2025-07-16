/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      'storage.googleapis.com',
      'images-static.nykaa.com',
      'cdn.dummyjson.com',
    ],
  },
};

export default nextConfig;
