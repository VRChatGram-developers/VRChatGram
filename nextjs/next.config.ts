import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname); // プロジェクトルートを "@" にマッピング
    return config;
  },
  images: {
    domains: ["example.com", "pbs.twimg.com", "assets.react-photo-album.com"],
  },
};

export default nextConfig;