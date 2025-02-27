import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname); // プロジェクトルートを "@" にマッピング
    return config;
  },
  images: {
    domains: ["example.com", "pbs.twimg.com", "i0.wp.com"], // 既存の "example.com" に加えて "pbs.twimg.com" を追加
  },
};

export default nextConfig;