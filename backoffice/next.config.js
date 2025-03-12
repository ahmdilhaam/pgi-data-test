/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_URL: 'http://127.0.0.1:3001',
  },
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/",
        destination: "/"
      },
      {
        source: "/dashboard",
        destination: "/"
      },
      {
        source: "/about",
        destination: "/"
      },

      {
        source: "/login",
        destination: "/"
      }
    ];
  }
};

module.exports = nextConfig;
