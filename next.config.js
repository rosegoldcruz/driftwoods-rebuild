/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.ing',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'toastability-production.s3.amazonaws.com',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
