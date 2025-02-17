import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname); // プロジェクトルートを "@" にマッピング
    return config;
  },
  // 削除予定
  images: {
    domains: ['images.vrcpic.com'],
  },
};

export default nextConfig;
