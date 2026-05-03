import { getTranslations } from "next-intl/server";
import { OpenModalButton } from "@/components/ui/OpenModalButton";
import { Button } from "@/components/ui/Button";

export async function Hero() {
  const t = await getTranslations("Hero");

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label"), color: "text-cyan" },
    { value: t("stat2Value"), label: t("stat2Label"), color: "text-teal" },
    { value: t("stat3Value"), label: t("stat3Label"), color: "text-white-soft" },
    { value: t("stat4Value"), label: t("stat4Label"), color: "text-orange" },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 md:px-12 pb-20 pt-16 overflow-hidden">

      {/* Grid de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 38%, black 20%, transparent 100%)",
        }}
      />

      {/* Glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none top-[35%] left-[35%] -translate-x-1/2 -translate-y-1/2 animate-pulse-cyan"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.14) 0%, transparent 65%)" }}
      />
      <div className="absolute w-[320px] h-[320px] rounded-full pointer-events-none top-[20%] left-[75%] -translate-x-1/2 -translate-y-1/2 animate-pulse-teal"
        style={{ background: "radial-gradient(circle, rgba(15,224,176,0.10) 0%, transparent 65%)" }}
      />
      <div className="absolute w-[280px] h-[280px] rounded-full pointer-events-none top-[70%] left-[20%] -translate-x-1/2 -translate-y-1/2 animate-pulse-orange"
        style={{ background: "radial-gradient(circle, rgba(255,115,64,0.09) 0%, transparent 65%)" }}
      />

      {/* Noise grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 bg-cyan/[0.08] border border-cyan/25 text-cyan text-[11px] font-medium px-4 py-1.5 rounded-full mb-8 uppercase tracking-[0.06em] animate-fade-up">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#00d4ff] animate-blink" />
        {t("badge")}
      </div>

      {/* Título */}
      <h1 className="relative z-10 font-display font-extrabold text-[clamp(34px,5.2vw,60px)] leading-[1.07] tracking-[-0.04em] text-white-soft max-w-[700px] mb-6 animate-[fadeUp_0.6s_0.1s_ease_both]">
        {t("title1")}
        <br />
        <span className="bg-gradient-to-r from-cyan to-teal bg-clip-text text-transparent">
          {t("title2")}
        </span>
      </h1>

      {/* Descripción */}
      <p className="relative z-10 text-[16px] font-light leading-[1.75] text-ice-dim max-w-[460px] mb-10 animate-[fadeUp_0.6s_0.2s_ease_both]">
        {t("description")}
      </p>

      {/* Botones */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-3.5 items-center animate-[fadeUp_0.6s_0.3s_ease_both]">
        <OpenModalButton variant="primary" size="lg">
          {t("ctaPrimary")}
        </OpenModalButton>
        {/* <Button variant="ghost" size="lg">
          {t("ctaSecondary")}
        </Button> */}
      </div>

      {/* Stats bar */}
      <div className="relative z-10 flex mt-16 border border-cyan/[0.12] rounded-2xl overflow-x-auto bg-white/[0.025] backdrop-blur-md animate-[fadeUp_0.6s_0.4s_ease_both] max-w-full">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-8 py-[18px] text-center min-w-[130px] ${i < stats.length - 1 ? "border-r border-cyan/[0.08]" : ""}`}
          >
            <div className={`font-display font-bold text-2xl tracking-tight ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-[11px] text-ice-dim mt-1 tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}