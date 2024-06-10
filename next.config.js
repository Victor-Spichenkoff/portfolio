/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  exportPathMap: function () {
    return {
      '/404': { page: '/404', asPath: '/404' },
    };
  },
}

module.exports = nextConfig
