import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname); // プロジェクトルートを "@" にマッピング
    return config;
  },
  images: {
    domains: [
      "vrcss-development.s3.ap-southeast-2.amazonaws.com",
      "pbs.twimg.com"
    ],
  },
};

export default nextConfig;