import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://klyroweb.co";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Bots de búsqueda normales — acceso total
        userAgent: ["Googlebot", "Bingbot", "Slurp", "DuckDuckBot"],
        allow: "/",
      },
      {
        // Bots de AI que hacen búsqueda en tiempo real — dejar pasar
        // (Perplexity, ChatGPT search, Claude search)
        userAgent: [
          "PerplexityBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-User",
          "anthropic-ai",
        ],
        allow: "/",
      },
      {
        // Bots de ENTRENAMIENTO de AI — bloqueados
        // No quieres que entrenen modelos con tu contenido gratis
        userAgent: [
          "GPTBot",
          "Google-Extended",
          "CCBot",
          "FacebookBot",
          "Amazonbot",
          "Bytespider",
          "PetalBot",
        ],
        disallow: "/",
      },
      {
        // Todo lo demás — acceso normal
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}