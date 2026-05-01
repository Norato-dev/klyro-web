export type Project = {
    slug: string;
    liveUrl: string;
    image: string;
    imageAlt: { en: string; es: string };
    tag: { en: string; es: string };
    tagColor: string;
    title: string;
    summary: { en: string; es: string };
    description: { en: string; es: string };
    problem: { en: string; es: string };
    stack: string[];
    metrics: {
    label: { en: string; es: string };
    value: string;
    }[];
    gallery: string[];
};
export const projects: Project[] = [
    {
        slug: "meridian",
        liveUrl: "https://meridian.klyroweb.co",
        image: "/portfolio/meridian-hero.png",
        imageAlt: {
        en: "Meridian Advisory website screenshot",
        es: "Captura del sitio web de Meridian Advisory",
        },
        tag: { en: "Financial Advisory", es: "Consultoría Financiera" },
        tagColor: "text-teal",
        title: "Meridian Advisory",
        summary: {
        en: "High-converting landing page · 100/100 PageSpeed",
        es: "Landing de alta conversión · 100/100 PageSpeed",
        },
        description: {
        en: "A premium landing page for a financial advisory firm targeting SMEs in the US and Europe. Built for speed, clarity, and conversions.",
        es: "Una landing premium para una consultora financiera orientada a pymes en EEUU y Europa. Construida para velocidad, claridad y conversiones.",
        },
        problem: {
        en: "Growing SMEs make critical financial decisions without real visibility. They can't afford a full-time CFO but need strategic guidance. Meridian Advisory needed a landing page that communicated authority, built trust, and converted visitors into discovery calls — without sacrificing performance.",
        es: "Las pymes en crecimiento toman decisiones financieras críticas sin visibilidad real. No pueden costear un CFO de tiempo completo pero necesitan orientación estratégica. Meridian Advisory necesitaba una landing que transmitiera autoridad, generara confianza y convirtiera visitas en llamadas — sin sacrificar rendimiento.",
        },
        stack: ["Astro", "Tailwind CSS", "TypeScript", "Cal.com", "Playfair Display", "Inter"],
        metrics: [
        {
            label: { en: "PageSpeed Score", es: "PageSpeed Score" },
            value: "100/100",
        },
        {
            label: { en: "Load time", es: "Tiempo de carga" },
            value: "< 0.8s",
        },
        {
            label: { en: "Conversion rate increase", es: "Aumento en conversión" },
            value: "+38%",
        },
        {
            label: { en: "Monthly calls booked", es: "Llamadas agendadas/mes" },
            value: "23",
        },
        {
            label: { en: "Delivery time", es: "Tiempo de entrega" },
            value: "2 semanas",
        },
        ],
        gallery: [
        "/portfolio/meridian-hero.png",
        "/portfolio/meridian-roi.png",
        ],
    },
    {
        slug: "arco",
        liveUrl: "https://inmo.klyroweb.co",
        image: "/portfolio/arco-hero.png",
        imageAlt: {
            en: "Arco Inmobiliaria website screenshot",
            es: "Captura del sitio web de Arco Inmobiliaria",
        },
        tag: { en: "Real Estate", es: "Inmobiliaria" },
        tagColor: "text-orange",
        title: "Arco Inmobiliaria",
        summary: {
            en: "Property catalog + mortgage calculator · Mapbox",
            es: "Catálogo de propiedades + calculadora · Mapbox",
        },
        description: {
            en: "A premium real estate platform for a Bogotá-based agency, featuring a property catalog with filters, interactive Mapbox map, and mortgage calculator.",
            es: "Plataforma inmobiliaria premium para una agencia bogotana, con catálogo de propiedades con filtros, mapa interactivo con Mapbox y calculadora de hipoteca.",
        },
        problem: {
            en: "Real estate agencies in Colombia rely on outdated portals that feel impersonal and hard to navigate. Arco needed a modern, warm platform that reflected their boutique approach and made finding a property feel effortless.",
            es: "Las inmobiliarias en Colombia dependen de portales desactualizados que se sienten impersonales. Arco necesitaba una plataforma moderna y cálida que reflejara su enfoque boutique y hiciera que encontrar una propiedad fuera fácil.",
        },
        stack: ["Next.js", "Tailwind CSS v4", "TypeScript", "Mapbox GL JS", "Fraunces", "Plus Jakarta Sans"],
        metrics: [
            { label: { en: "Properties listed", es: "Propiedades listadas" }, value: "7" },
            { label: { en: "Interactive map", es: "Mapa interactivo" }, value: "Mapbox" },
            { label: { en: "Delivery time", es: "Tiempo de entrega" }, value: "3 semanas" },
            { label: { en: "Mortgage calculator", es: "Calculadora" }, value: "✓" },
            { label: { en: "PageSpeed Score", es: "PageSpeed Score" }, value: "98/100" },
        ],
        gallery: [
            "/portfolio/arco-interna.png",
            "/portfolio/arco-full.png",
        ],
    },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}