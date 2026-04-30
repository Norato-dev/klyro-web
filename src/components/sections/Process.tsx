const steps = [
  {
    num: "01",
    title: "Consulta",
    description: "Hablamos de tu proyecto, metas y presupuesto. Sin compromisos.",
    numStyle: "bg-cyan/[0.12] text-cyan border border-cyan/35 shadow-[0_0_16px_rgba(0,212,255,0.2)]",
  },
  {
    num: "02",
    title: "Propuesta",
    description: "En 48h recibes un presupuesto detallado y cronograma de entrega.",
    numStyle: "bg-teal/10 text-teal border border-teal/30 shadow-[0_0_16px_rgba(15,224,176,0.15)]",
  },
  {
    num: "03",
    title: "Desarrollo",
    description: "Diseñamos y programamos con revisiones semanales para tu aprobación.",
    numStyle: "bg-accent/[0.12] text-accent border border-accent/30 shadow-[0_0_16px_rgba(91,155,213,0.15)]",
  },
  {
    num: "04",
    title: "Lanzamiento",
    description: "Tu web en vivo con 30 días de soporte gratuito incluido.",
    numStyle: "bg-orange/10 text-orange border border-orange/30 shadow-[0_0_16px_rgba(255,115,64,0.15)]",
  },
];

export function Process() {
  return (
    <section id="proceso" className="py-20 px-6 md:px-12 max-w-[1080px] mx-auto">
      {/* Eyebrow */}
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="w-6 h-[1.5px] bg-gradient-to-r from-cyan to-teal rounded-full" />
        <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-cyan">
          Cómo trabajamos
        </span>
      </div>

      <h2 className="font-display font-bold text-[36px] tracking-[-0.03em] text-white-soft leading-[1.15]">
        Simple, claro y sin sorpresas
      </h2>

      {/* Steps */}
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 mt-12">
        {/* Línea conectora */}
        <div className="hidden md:block absolute top-[23px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-cyan via-teal to-cyan opacity-30" />

        {steps.map((step) => (
          <div key={step.num} className="text-center px-3.5 relative">
            <div
              className={`w-[46px] h-[46px] rounded-full flex items-center justify-center font-display font-bold text-[16px] mx-auto mb-4 relative z-10 ${step.numStyle}`}
            >
              {step.num}
            </div>
            <h4 className="font-display font-bold text-[16px] text-white-soft mb-1.5 tracking-[-0.01em]">
              {step.title}
            </h4>
            <p className="text-[14px] font-light text-ice-dim leading-[1.6]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}