import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { ContactModalProvider } from "@/components/ui/ContactModalContext";
import { ContactModal } from "@/components/ui/ContactModal";
import { JsonLd } from "@/components/layout/JsonLd";
import { Analytics } from "@vercel/analytics/next"
import "../globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://klyro.co";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isEs = locale === "es";

  const title = isEs
    ? "Klyro Web Studio · Diseño y desarrollo web en Bogotá"
    : "Klyro Web Studio · Web Design & Development in Bogotá";

  const description = isEs
    ? "Diseñamos y desarrollamos sitios web profesionales para emprendedores y empresas que quieren crecer online. Rápido, sin sorpresas, con resultados."
    : "We design and build professional websites for entrepreneurs and businesses ready to grow online. Fast, no surprises, with real results.";

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),

    // Canonical + hreflang — crítico para mercado mixto
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "en": "/en",
        "es": "/es",
        "x-default": "/en",
      },
    },

    // Open Graph — lo que aparece al compartir en WhatsApp, LinkedIn, etc.
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: "Klyro Web Studio",
      locale: isEs ? "es_CO" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_CO",
      type: "website",
      images: [
        {
          url: "/og-image.png", // lo creamos después
          width: 1200,
          height: 630,
          alt: "Klyro Web Studio",
        },
      ],
    },

    // Twitter / X card
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <JsonLd locale={locale} />
      </head>
      <body className="font-sans bg-navy-dark text-ice antialiased">
        <NextIntlClientProvider>
          <ContactModalProvider>
            <Navbar />
            {children}
            <ContactModal />
          </ContactModalProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}