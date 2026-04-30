import { getTranslations } from "next-intl/server";

export async function About() {
  const t = await getTranslations("About");

  const values = [
    {
      icon: "⚡",
      title: t("v1Title"),
      description: t("v1Desc"),
      color: "text-cyan",
      bg: "bg-cyan/10",
    },
    {
      icon: "🎯",
      title: t("v2Title"),
      description: t("v2Desc"),
      color: "text-teal",
      bg: "bg-teal/10",
    },
    {
      icon: "🤝",
      title: t("v3Title"),
      description: t("v3Desc"),
      color: "text-orange",
      bg: "bg-orange/10",
    },
  ];

  return (
    <section id="nosotros" className="py-20 px-6 md:px-12 max-w-[1080px] mx-auto">
      {/* Eyebrow */}
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="w-6 h-[1.5px] bg-gradient-to-r from-cyan to-teal rounded-full" />
        <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-cyan">
          {t("eyebrow")}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

        {/* Izquierda — texto */}
        <div>
          <h2 className="font-display font-bold text-[34px] tracking-[-0.03em] text-white-soft mb-6 leading-[1.15]">
            {t("title1")}
            <br />
            {t("title2")}{" "}
            <span className="bg-gradient-to-r from-cyan to-teal bg-clip-text text-transparent">
              {t("title3")}
            </span>
          </h2>
          <p className="text-[16px] font-light text-ice-dim leading-[1.8] mb-4">
            {t("p1")}
          </p>
          <p className="text-[16px] font-light text-ice-dim leading-[1.8]">
            {t("p2")}
          </p>
        </div>

        {/* Derecha — valores */}
        <div className="flex flex-col gap-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="flex gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-cyan/20 transition-colors duration-200"
            >
              <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-lg shrink-0 ${v.bg}`}>
                {v.icon}
              </div>
              <div>
                <h3 className={`font-display font-bold text-[16px] mb-1 tracking-[-0.01em] ${v.color}`}>
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