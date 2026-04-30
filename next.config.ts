import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const securityHeaders = [
  // Evita que tu sitio sea embebido en iframes (clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Evita que el browser adivine el tipo de archivo
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Controla qué info se manda en el header Referer
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Desactiva features del browser que no usas
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Fuerza HTTPS por 2 años
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Básico XSS protection
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);