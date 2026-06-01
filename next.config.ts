import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Uncomment and set basePath if hosting on a GitHub project page (not a user page)
  basePath: "/portfolio_j_lopez",
};

export default nextConfig;
