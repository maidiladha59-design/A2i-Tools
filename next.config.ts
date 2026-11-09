import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/id",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/id",
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@dnd-kit/sortable", "@dnd-kit/core"],
  },
};

export default withNextIntl(nextConfig);
