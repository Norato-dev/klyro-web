import { getTranslations } from "next-intl/server";

export async function Services() {
  const t = await getTranslations("Services");

  const services = [
    {
      icon: "🌐",
      title: t("s1Title"),
      description: t("s1Desc"),
      iconBg: "bg-cyan/10",
      gradient: "from-cyan to-teal",
    },
    {
      icon: "🛒",
      title: t("s2Title"),
      description: t("s2Desc"),
      iconBg: "bg-teal/10",
      gradient: "from-teal to-accent",
    },
    {
      icon: "⚡",
      title: t("s3Title"),
      description: t("s3Desc"),
      iconBg: "bg-accent/10",
      gradient: "from-accent to-cyan",
    },
    {
      icon: "🔧",
      title: t("s4Title"),
      description: t("s4Desc"),
      iconBg: "bg-teal/10",
      gradient: "from-teal to-cyan",
    },
    {
      icon: "📈",
      title: t("s5Title"),
      description: t("s5Desc"),
      iconBg: "bg-cyan/10",
      gradient: "from-cyan to-orange",
    },
  ];

  return (
    <section id="servicios" className="py-20 px-6 md:px-12 max-w-[1080px] mx-auto">
      {/* Eyebrow */}
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="w-6 h-[1.5px] bg-gradient-to-r from-cyan to-teal rounded-full" />
        <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-cyan">
          {t("eyebrow")}
        </span>
      </div>

      <h2 className="font-display font-bold text-[36px] tracking-[-0.03em] text-white-soft mb-3 leading-[1.15]">
        {t("title")}
      </h2>
      <p className="text-[16px] font-light text-ice-dim max-w-[460px] leading-[1.7] mb-12">
        {t("description")}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {services.map((s) => (
          <div
            key={s.title}
            className="group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-250 hover:border-cyan/25 hover:-translate-y-1"
          >
            <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
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