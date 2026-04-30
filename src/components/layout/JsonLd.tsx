export function JsonLd({ locale }: { locale: string }) {
  const isEs = locale === "es";
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://klyro.co";

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Klyro Web Studio",
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/icon.png`,
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bogotá",
        addressCountry: "CO",
      },
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+57-314-414-7996",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
    sameAs: [
      "https://wa.me/573144147996",
    ],
    description: isEs
      ? "Estudio web boutique en Bogotá. Diseño y desarrollo web profesional para emprendedores y empresas."
      : "Boutique web studio in Bogotá. Professional web design and development for entrepreneurs and businesses.",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Klyro Web Studio",
    url: SITE_URL,
    inLanguage: ["es-CO", "en-US"],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/${locale}`,
    name: "Klyro Web Studio",
    image: `${SITE_URL}/og-image.png`,
    url: `${SITE_URL}/${locale}`,
    telephone: "+57-314-414-7996",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressRegion: "Cundinamarca",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.711,
      longitude: -74.0721,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    servesCuisine: undefined,
    areaServed: [
      {
        "@type": "Country",
        name: "Colombia",
      },
      {
        "@type": "AdministrativeArea",
        name: "International",
      },
    ],
    knowsAbout: [
      "Web Design",
      "Web Development",
      "E-commerce",
      "Landing Pages",
      "SEO",
      "Next.js",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
    </>
  );
}