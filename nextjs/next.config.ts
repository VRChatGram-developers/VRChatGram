import type { NextConfig } from "next";
import * as path from "node:path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname); // プロジェクトルートを "@" にマッピング

    config.module.rules.push({
      test: /\.(woff|woff2|ttf|eot)$/,
      type: "asset/resource",
      generator: {
        filename: "static/fonts/[name].[hash][ext]",
      },
    });

    return config;
  },
  output: "standalone", // Next.js 15 では experimental.outputStandalone は不要
  reactStrictMode: false,
  images: {
    domains: ["example.com", "images.vrcpic.com"],
  },
};

export default nextConfig;
