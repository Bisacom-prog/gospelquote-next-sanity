/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Sanity CDN
      { protocol: 'https', hostname: 'cdn.sanity.io' }
    ]
  },
  experimental: {
    // keep defaults
  }
};

export default nextConfig;
