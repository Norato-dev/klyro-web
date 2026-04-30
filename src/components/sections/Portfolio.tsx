const projects = {
  main: {
    emoji: "🛍️",
    tag: "E-commerce",
    tagColor: "text-cyan",
    title: "Tienda de moda local",
    description: "Shopify + diseño personalizado · Lanzado en 3 semanas",
    bg: "from-navy via-[#0e3055] to-[#0d2040]",
    glow: "bg-cyan/20",
  },
  side: [
    {
      emoji: "💼",
      tag: "Servicios",
      tagColor: "text-teal",
      title: "Consultora financiera",
      description: "Landing de alta conversión · +40% leads",
      bg: "from-navy via-[#0d3030] to-[#0a2020]",
      glow: "bg-teal/20",
    },
    {
      emoji: "🏠",
      tag: "Inmobiliaria",
      tagColor: "text-orange",
      title: "Inmobiliaria Bogotá",
      description: "Sitio institucional + catálogo de propiedades",
      bg: "from-navy via-[#302010] to-[#201408]",
      glow: "bg-orange/20",
    },
  ],
};

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 px-6 md:px-12 max-w-[1080px] mx-auto">
      {/* Eyebrow */}
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="w-6 h-[1.5px] bg-gradient-to-r from-cyan to-teal rounded-full" />
        <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-cyan">
          Proyectos
        </span>
      </div>

      <h2 className="font-display font-bold text-[36px] tracking-[-0.03em] text-white-soft mb-3 leading-[1.15]">
        Portfolio
      </h2>
      <p className="text-[16px] font-light text-ice-dim max-w-[460px] leading-[1.7] mb-12">
        Proyectos que reflejan nuestro enfoque en diseño, velocidad y resultados reales.
      </p>

      {/* Grid asimétrico */}
      <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-3.5">
        {/* Card principal */}
        <PortfolioCard project={projects.main} thumbHeight="h-[180px]" />

        {/* Cards secundarias */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3.5">
          {projects.side.map((p) => (
            <PortfolioCard key={p.title} project={p} thumbHeight="h-[104px]" />
          ))}
        </div>
      </div>
    </section>
  );
}

type Project = {
  emoji: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  bg: string;
  glow: string;
};

function PortfolioCard({
  project,
  thumbHeight,
}: {
  project: Project;
  thumbHeight: string;
}) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] cursor-pointer transition-all duration-250 hover:-translate-y-1 hover:border-cyan/20">
      {/* Thumbnail */}
      <div
        className={`${thumbHeight} bg-gradient-to-br ${project.bg} flex items-center justify-center relative overflow-hidden`}
      >
        <div
          className={`absolute top-0 right-0 w-[120px] h-[120px] rounded-full ${project.glow} opacity-20 blur-2xl`}
        />
        <span className="text-4xl relative z-10">{project.emoji}</span>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className={`text-[12px] tracking-[0.1em] uppercase font-medium mb-1.5 ${project.tagColor}`}>
          {project.tag}
        </div>
        <h3 className="font-display font-bold text-[18px] text-white-soft mb-1">
          {project.title}
        </h3>
        <p className="text-[14px] text-ice-dim font-light">{project.description}</p>
      </div>
    </div>
  );
}