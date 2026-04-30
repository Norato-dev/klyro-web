const services = [
  {
    icon: "🌐",
    title: "Websites corporativos",
    description: "Presencia profesional que transmite confianza y genera oportunidades de negocio.",
    iconBg: "bg-cyan/10",
    gradient: "from-cyan to-teal",
  },
  {
    icon: "🛒",
    title: "Tiendas online",
    description: "E-commerce completo con pasarela de pagos, inventario y diseño que vende.",
    iconBg: "bg-teal/10",
    gradient: "from-teal to-accent",
  },
  {
    icon: "⚡",
    title: "Landing pages",
    description: "Páginas enfocadas en convertir visitantes en clientes con cada detalle.",
    iconBg: "bg-accent/10",
    gradient: "from-accent to-cyan",
  },
  {
    icon: "🔧",
    title: "Mantenimiento",
    description: "Soporte técnico continuo para que tu sitio esté siempre actualizado y seguro.",
    iconBg: "bg-teal/10",
    gradient: "from-teal to-cyan",
  },
  {
    icon: "📈",
    title: "Optimización SEO",
    description: "Posicionamos tu web en Google para que tus clientes te encuentren solos.",
    iconBg: "bg-cyan/10",
    gradient: "from-cyan to-orange",
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-20 px-6 md:px-12 max-w-[1080px] mx-auto">
      {/* Eyebrow */}
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="w-6 h-[1.5px] bg-gradient-to-r from-cyan to-teal rounded-full" />
        <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-cyan">
          Lo que hacemos
        </span>
      </div>

      <h2 className="font-display font-bold text-[36px] tracking-[-0.03em] text-white-soft mb-3 leading-[1.15]">
        Soluciones web a medida
      </h2>
      <p className="text-[16px] font-light text-ice-dim max-w-[460px] leading-[1.7] mb-12">
        Desde una landing page que convierte hasta una tienda online completa.
        Nos adaptamos a tu presupuesto y objetivos.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {services.map((s) => (
          <div
            key={s.title}
            className="group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-250 hover:border-cyan/25 hover:-translate-y-1"
          >
            {/* Línea inferior con gradiente al hover */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center mb-4 text-lg ${s.iconBg}`}>
              {s.icon}
            </div>
            <h3 className="font-display font-bold text-[17px] text-white-soft mb-1.5 tracking-[-0.01em]">
              {s.title}
            </h3>
            <p className="text-[14px] font-light text-ice-dim leading-[1.6]">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}