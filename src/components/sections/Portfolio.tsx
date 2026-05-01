import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export async function Portfolio() {
  const t = await getTranslations("Portfolio");

  return (
    <section id="portfolio" className="py-20 px-6 md:px-12 max-w-[1080px] mx-auto">
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

      {/* Grid asimétrico */}
      <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-3.5">

        {/* Card principal — Meridian (con imagen real + link) */}
        <Link
          href={`/portfolio/${t("mainSlug")}`}
          className="group rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] cursor-pointer transition-all duration-250 hover:-translate-y-1 hover:border-cyan/20"
        >
          {/* Imagen real */}
          <div className="h-[280px] relative overflow-hidden">
            <Image
              src="/portfolio/meridian-hero.png"
              alt={t("mainTitle")}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
          </div>
          <div className="p-5">
            <div className="text-[12px] tracking-[0.1em] uppercase font-medium mb-1.5 text-teal">
              {t("mainTag")}
            </div>
            <h3 className="font-display font-bold text-[18px] text-white-soft mb-1">
              {t("mainTitle")}
            </h3>
            <p className="text-[14px] text-ice-dim font-light">{t("mainDesc")}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[12px] text-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {t("viewProject")}
            </span>
          </div>
        </Link>

        {/* Cards secundarias */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3.5">
          {/* Arco — ya real, clickeable */}
          <Link
            href={`/portfolio/arco`}
            className="group rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] flex-1 transition-all duration-250 hover:-translate-y-1 hover:border-cyan/20"
          >
            <div className="h-[104px] relative overflow-hidden">
              <Image
                src="/portfolio/arco-hero.png"
                alt="Arco Inmobiliaria"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 to-transparent" />
            </div>
            <div className="p-5">
              <div className="text-[12px] tracking-[0.1em] uppercase font-medium mb-1.5 text-orange">
                {t("side1Tag")}
              </div>
              <h3 className="font-display font-bold text-[18px] text-white-soft mb-1">
                {t("side1Title")}
              </h3>
              <p className="text-[14px] text-ice-dim font-light">{t("side1Desc")}</p>
              <span className="mt-2 inline-flex items-center text-[11px] text-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t("viewProject")}
              </span>
            </div>
          </Link>

          {/* E-commerce — placeholder */}
          <div className="group rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] flex-1 transition-all duration-250">
            <div className="h-[104px] bg-gradient-to-br from-navy via-[#0e3055] to-[#0d2040] flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-cyan/20 opacity-20 blur-2xl" />
              <span className="text-4xl relative z-10">🛍️</span>
            </div>
            <div className="p-5">
              <div className="text-[12px] tracking-[0.1em] uppercase font-medium mb-1.5 text-cyan">
                {t("side2Tag")}
              </div>
              <h3 className="font-display font-bold text-[18px] text-white-soft mb-1">
                {t("side2Title")}
              </h3>
              <p className="text-[14px] text-ice-dim font-light">{t("side2Desc")}</p>
              <span className="mt-2 inline-flex items-center text-[11px] text-ice-dim/30">
                {t("comingSoon")}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}