/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

module.exports = nextConfig;
