import { createMDX } from "fumadocs-mdx/next";
import { NextConfig } from "next";

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
    eslint: {
    // ❌ Lint errors will not break the build
    ignoreDuringBuilds: true,
  },
};


export default withMDX(config);
