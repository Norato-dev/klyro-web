import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-cyan/[0.07] px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
      <span className="font-display font-extrabold text-[19px] text-white-soft/60 tracking-tight">
        Klyro Web Studio
      </span>
      <span className="text-[16px] text-ice-dim">
        {t("copy")}
      </span>
    </footer>
  );
}