/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.68.108",
        port: "8000",
        pathname: "/storage/**",
      },
    ],
  },
};

module.exports = nextConfig;
