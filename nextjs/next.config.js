import path from "path";

const nextConfig = {
  async headers() {
    return [
      {
        source: "/login",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(".");
    return config;
  },
  trailingSlash: true,
  images: {
    domains: ["vrcss-development.s3.ap-southeast-2.amazonaws.com", "pbs.twimg.com", "booth.pximg.net", "assets.react-photo-album.com", "d1fwce1abq7aw6.cloudfront.net", "d3o6x7pz3sf2lk.cloudfront.net"],
  },
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com/__/auth/:path*`,
      },
    ];
  },
  devIndicators: false,
};

export default nextConfig;

