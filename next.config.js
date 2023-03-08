/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 180,
  },
  experimental: {
    appDir: true,
  },
})

module.exports = nextConfig
