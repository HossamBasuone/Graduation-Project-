import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  trailingSlash: true,
  output: 'export',
  basePath: '/Graduation-Project-', // 🔁 Change this to your GitHub repo name
  assetPrefix: isProd ? '/Graduation-Project-/' : '',
};

module.exports = nextConfig;
