import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const isProd = 'production';

const nextConfig: NextConfig = {
  trailingSlash: true,

};

module.exports = nextConfig;
