import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname); // プロジェクトルートを "@" にマッピング
    return config;
  },
};

module.exports = {
  images: {
    domains: ["example.com"],
  },
};

export default nextConfig;
