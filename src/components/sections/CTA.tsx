import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { OpenModalButton } from "@/components/ui/OpenModalButton";

export async function CTA() {
  const t = await getTranslations("CTA");

  const whatsappUrl = `https://wa.me/573144147996?text=${encodeURIComponent(t("whatsappMessage"))}`;

  return (
    <section className="mx-4 md:mx-12 mb-18 relative overflow-hidden rounded-3xl border border-cyan/[0.15] bg-white/[0.02] px-6 md:px-12 py-16 text-center">
      {/* Glow central */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-gradient-radial from-cyan/[0.12] via-teal/[0.06] to-transparent pointer-events-none" />

      {/* Línea superior */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-60" />

      <h2 className="relative z-10 font-display font-extrabold text-[34px] tracking-[-0.035em] text-white-soft mb-3.5 leading-[1.1]">
        {t("title1")}
        <br />
        {t("title2")}{" "}
        <span className="bg-gradient-to-r from-cyan to-teal bg-clip-text text-transparent">
          {t("title3")}
        </span>
      </h2>

      <p className="relative z-10 text-[18px] font-light text-ice-dim mb-9 leading-[1.7] whitespace-pre-line">
        {t("description")}
      </p>

      <div className="relative z-10 flex flex-col sm:flex-row gap-3.5 justify-center items-center">
        <OpenModalButton variant="primary" size="lg" className="w-full sm:w-auto">
          {t("ctaPrimary")}
        </OpenModalButton>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
            </svg>
            {t("ctaWhatsapp")}
          </Button>
        </a>
      </div>
    </section>
  );
}