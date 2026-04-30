const values = [
  {
    icon: "⚡",
    title: "Rapidez sin sacrificar calidad",
    description:
      "Entregamos en 2 a 4 semanas porque respetamos tu tiempo. Sin apuros que arruinen el resultado.",
    color: "text-cyan",
    bg: "bg-cyan/10",
  },
  {
    icon: "🎯",
    title: "Enfocados en resultados",
    description:
      "No hacemos webs bonitas por hacerlas. Cada decisión de diseño tiene un propósito: convertir visitantes en clientes.",
    color: "text-teal",
    bg: "bg-teal/10",
  },
  {
    icon: "🤝",
    title: "Comunicación directa",
    description:
      "Sin intermediarios ni agencias enormes. Hablas directamente con quien diseña y desarrolla tu proyecto.",
    color: "text-orange",
    bg: "bg-orange/10",
  },
];

export function About() {
  return (
    <section id="nosotros" className="py-20 px-6 md:px-12 max-w-[1080px] mx-auto">
      {/* Eyebrow */}
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="w-6 h-[1.5px] bg-gradient-to-r from-cyan to-teal rounded-full" />
        <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-cyan">
          Nosotros
        </span>
      </div>

      {/* Layout: texto izquierda, valores derecha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

        {/* Izquierda — texto */}
        <div>
          <h2 className="font-display font-bold text-[34px] tracking-[-0.03em] text-white-soft mb-6 leading-[1.15]">
            Un estudio pequeño
            <br />
            con impacto{" "}
            <span className="bg-gradient-to-r from-cyan to-teal bg-clip-text text-transparent">
              grande
            </span>
          </h2>
          <p className="text-[16px] font-light text-ice-dim leading-[1.8] mb-4">
            Somos Klyro, un estudio web boutique basado en Bogotá. Trabajamos
            con emprendedores y empresas que quieren una presencia digital
            profesional sin los precios ni la burocracia de una agencia grande.
          </p>
          <p className="text-[16px] font-light text-ice-dim leading-[1.8]">
            Cada proyecto lo tratamos como si fuera el nuestro — con atención
            al detalle, plazos reales y comunicación honesta en cada paso.
          </p>

          {/* Mini stats */}
          {/* <div className="flex gap-8 mt-10">
            <div>
              <div className="font-display font-bold text-[28px] text-cyan tracking-tight">
                +20
              </div>
              <div className="text-[14px] text-ice-dim mt-0.5">
                proyectos entregados
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-[28px] text-teal tracking-tight">
                3
              </div>
              <div className="text-[14px] text-ice-dim mt-0.5">
                años de experiencia
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-[28px] text-orange tracking-tight">
                100%
              </div>
              <div className="text-[14px] text-ice-dim mt-0.5">
                clientes satisfechos
              </div>
            </div>
          </div> */}
        </div>

        {/* Derecha — valores */}
        <div className="flex flex-col gap-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="flex gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-cyan/20 transition-colors duration-200"
            >
              <div
                className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-lg shrink-0 ${v.bg}`}
              >
                {v.icon}
              </div>
              <div>
                <h3
                  className={`font-display font-bold text-[16px] mb-1 tracking-[-0.01em] ${v.color}`}
                >
                  {v.title}
                </h3>
                <p className="text-[14px] font-light text-ice-dim leading-[1.6]">
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}