import * as path from "node:path";
import { fileURLToPath } from "node:url";

// Define __dirname in ESM mode
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    config.module.rules.push({
      test: /\.(woff|woff2|ttf|eot)$/,
      type: "asset/resource",
      generator: {
        filename: "static/fonts/[name].[hash][ext]",
      },
    });

    return config;
  },
  // output: "standalone", // Next.js 15 では experimental.outputStandalone は不要
  reactStrictMode: false,
  images: {
    domains: ["example.com", "images.vrcpic.com"],
  },
};

export default nextConfig;
