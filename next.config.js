/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {},
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "",
      // },
    ],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Strict-Transport-Security",
          value: "max-age=16070400; includeSubDomains; preload",
        },
      ],
    },
  ],
};

module.exports = nextConfig;
