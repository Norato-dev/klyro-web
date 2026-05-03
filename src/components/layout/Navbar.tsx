"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { OpenModalButton } from "@/components/ui/OpenModalButton";

export function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t("services"), href: "#servicios" },
    { label: t("process"), href: "#proceso" },
    { label: t("portfolio"), href: "#portfolio" },
    { label: t("about"), href: "#nosotros" },
  ];

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 flex items-center justify-between px-11 py-5",
          "border-b border-cyan/[0.08]",
          "backdrop-blur-[18px] transition-colors duration-300",
          scrolled || menuOpen ? "bg-navy-dark/90" : "bg-transparent"
        )}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-3 group"
          aria-label="Klyro inicio"
        >
          <KlyroIcon className="w-8 h-8 fill-ice group-hover:fill-white-soft transition-colors duration-200" />
          <span className="font-display font-extrabold text-[20px] text-white-soft tracking-tight">
            Klyro
          </span>
        </a>

        {/* Links — desktop */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[13px] text-ice-dim hover:text-cyan transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Derecha: language switcher + CTA + hamburguesa */}
        <div className="flex items-center gap-3">

          {/* Language Switcher */}
          <div className="flex items-center gap-1 rounded-lg border border-white/10 p-1">
            {(["en", "es"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => switchLocale(lang)}
                className={cn(
                  "text-[11px] font-display font-bold uppercase tracking-widest px-2 py-1 rounded-md transition-all duration-200",
                  locale === lang
                    ? "bg-cyan/20 text-cyan"
                    : "text-ice-dim hover:text-ice"
                )}
              >
                {lang}
              </button>
            ))}
          </div>

          <OpenModalButton variant="nav" size="sm" className="hidden md:inline-flex">
            {t("cta")}
          </OpenModalButton>

          {/* Botón hamburguesa — solo mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg border border-white/10 hover:border-cyan/30 transition-colors duration-200"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={cn("block w-4 h-[1.5px] bg-ice rounded-full transition-all duration-300", menuOpen && "rotate-45 translate-y-[6px]")} />
            <span className={cn("block w-4 h-[1.5px] bg-ice rounded-full transition-all duration-300", menuOpen && "opacity-0 scale-x-0")} />
            <span className={cn("block w-4 h-[1.5px] bg-ice rounded-full transition-all duration-300", menuOpen && "-rotate-45 -translate-y-[6px]")} />
          </button>
        </div>
      </header>

      {/* Menú móvil — overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-navy-dark/95 backdrop-blur-xl"
          onClick={closeMenu}
        />

        <nav
          className={cn(
            "absolute top-[73px] left-0 right-0 px-8 py-10 flex flex-col gap-2 transition-all duration-300",
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
          aria-label="Mobile menu"
        >
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={cn(
                "text-[22px] font-display font-bold text-white-soft/80 hover:text-cyan",
                "py-3 border-b border-white/[0.06] transition-colors duration-200",
                "animate-[fadeUp_0.3s_ease_both]"
              )}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.label}
            </a>
          ))}

          {/* Language switcher móvil */}
          <div className="flex items-center gap-2 mt-4">
            {(["en", "es"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => { switchLocale(lang); closeMenu(); }}
                className={cn(
                  "text-[13px] font-display font-bold uppercase tracking-widest px-4 py-2 rounded-lg border transition-all duration-200",
                  locale === lang
                    ? "border-cyan/40 bg-cyan/10 text-cyan"
                    : "border-white/10 text-ice-dim hover:text-ice"
                )}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <OpenModalButton
              variant="primary"
              size="lg"
              className="w-full"
              onClick={closeMenu}
            >
              {t("cta")}
            </OpenModalButton>
          </div>
        </nav>
      </div>
    </>
  );
}

/* ── Logo SVG ── */
function KlyroIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 308.30573 281.11823"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="m 144.69813,275.98563 c 3.46606,-2.85836 6.52692,-5.45545 6.80192,-5.77132 0.86302,-0.99126 28.04292,-24.35414 32.74029,-28.14238 l 4.47723,-3.61072 12.64124,-0.56288 c 28.95106,-1.28912 52.64669,-12.96326 68.75851,-33.87526 4.14162,-5.37554 12.38273,-20.54194 12.38273,-22.78838 0,-0.57863 0.88312,-1.05205 1.96249,-1.05205 1.07937,0 4.43533,-0.92521 7.4577,-2.05602 6.82458,-2.55341 13.71458,-9.78204 15.54079,-16.30461 3.68654,-13.16703 -5.03878,-26.49924 -19.45377,-29.72517 l -5.36172,-1.1999 -3.23893,-7.4286 c -10.1876,-23.36562 -31.74606,-40.94357 -58.84298,-47.97832 -8.54585,-2.21863 -12.25062,-2.54192 -34.81358,-3.03794 l -25.25,-0.55509 0.0136,-5.60717 c 0.0192,-7.88254 0.57405,-9.22683 5.16126,-12.50463 12.46491,-8.90686 9.16099,-28.48982 -5.76858,-34.19147 -8.44048,-3.22345 -19.11703,0.16078 -24.54183,7.77921 -1.80494,2.5348 -2.43029,4.92651 -2.69452,10.3053 -0.31843,6.48234 -0.11851,7.3143 2.68235,11.16206 1.66453,2.28671 4.4037,4.97124 6.08705,5.96561 2.99052,1.76655 3.06062,1.98343 3.06062,9.46945 v 7.6615 l -24.25,0.54956 c -29.79287,0.67518 -36.90583,2.05299 -53.0358,10.27326 -9.58723,4.88592 -15.87124,9.73374 -24.91693,19.22227 -6.18216,6.48482 -8.71588,10.15413 -12.83505,18.58758 l -5.13231,10.50775 -5.21199,1.16639 c -6.54522,1.46476 -12.1916,5.25631 -16.09188,10.80573 -2.78113,3.95707 -3.02604,4.97952 -3.02604,12.63325 0,7.65215 0.24594,8.67948 3.03166,12.66386 4.0454,5.78609 11.40285,10.62591 17.3534,11.41528 4.70721,0.62443 4.74425,0.65926 7.15402,6.72617 9.11261,22.94216 31.55158,41.50708 59.56307,49.2796 3.61815,1.00395 11.59917,1.83482 20.64785,2.14955 l 14.75005,0.51304 v 17.47196 c 0,22.28501 1.28052,25.04491 11.69808,25.21286 3.63098,0.0585 5.0494,-0.63437 10.5,-5.12933 z m -0.19808,-39.3083 C 144.49633,217.24952 143.08279,216.18264 117.34234,216.18264 97.57940,216.18264 91.46962,215.06912 78.99633,209.19401 61.31357,200.86516 49.68389,187.18479 44.98266,169.18264 c -2.32843,-8.91614 -1.58666,-25.22492 1.50094,-33 7.29437,-18.36841 22.12944,-31.82764 42.84608,-38.87244 l 7.66665,-2.60708 52.27099,-0.30983 c 55.9573,-0.33169 62.07585,0.0579 74.43627,4.73943 14.25674,5.39977 27.96931,17.58975 34.36575,30.54992 9.42675,19.10002 7.96325,40.40078 -4.00675,58.31695 -6.06315,9.07505 -13.82577,15.63018 -24.99706,21.10871 -10.30392,5.05316 -20.3659,7.07271 -35.27704,7.0805 -13.15208,0.007 -14.72503,0.50454 -21.53201,6.8126 -2.34308,2.17134 -9.54765,8.51246 -16.01015,14.09138 l -11.75,10.14348 z m -21.09884,-56.94358 c 5.77168,-2.98465 6.09884,-4.46607 6.09884,-27.61593 V 131.0 l -3.4,-3.4 c -2.98387,-2.98387 -4.0285,-3.4 -8.53518,-3.4 -6.13065,0 -9.78376,2.08307 -11.70125,6.67228 -1.77171,4.24031 -1.81621,37.18576 -0.0571,42.29309 2.3029,6.68624 11.06105,9.96443 17.59472,6.58574 z m 76.28945,-2.43841 2.80939,-3.14425 v -21.83122 c 0,-19.36457 -0.19773,-22.05674 -1.75,-23.82724 -5.68709,-6.48665 -17.00687,-5.93325 -20.70473,1.01221 -1.46849,2.75818 -1.64921,5.97026 -1.36859,24.32525 0.2979,19.48493 0.48055,21.32202 2.32332,23.36803 2.88251,3.20043 5.35227,4.014 10.94061,3.60397 4.0333,-0.29592 5.45653,-0.93992 7.75,-3.50675 z m 14.30546,-138.08941 c 1.37708,-8.15091 7.58988,-14.00393 17.13126,-16.1392 5.81387,-1.30109 5.56575,-2.14337 -0.97805,-3.32007 -9.16334,-1.64775 -13.02212,-5.32851 -15.73698,-15.01097 -0.93347,-3.32918 -1.91755,-5.37805 -2.18685,-4.55305 -0.26929,0.825 -1.09245,3.49653 -1.82923,5.93674 -2.33583,7.73624 -7.33464,12.14485 -15.43078,13.60887 -6.14918,1.11195 -6.215,1.66275 -0.37666,3.15188 2.97617,0.7591 7.03114,2.44937 9.01105,3.75615 3.83941,2.53411 7.90017,9.74847 7.90017,14.03546 0,3.95759 1.75379,2.92768 2.49607,-1.46581 z" />
    </svg>
  );
}