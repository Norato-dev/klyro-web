import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  // Le dice a next-intl dónde está el archivo request.ts
  "./src/i18n/request.ts"
);

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);