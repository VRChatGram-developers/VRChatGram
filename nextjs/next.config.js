import path from "path";

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(".");
    return config;
  },
  images: {
    domains: ["vrcss-development.s3.ap-southeast-2.amazonaws.com"],
  },
};

export default nextConfig;

