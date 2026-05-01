import { notFound } from "next/navigation"
import { getProject } from "@/data/projects"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import type { Metadata } from "next";

type Props = {
    params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  const lang = locale as "en" | "es";

  return {
    title: `${project.title} — Klyro Web Studio`,
    description: project.description[lang],
    openGraph: {
      title: `${project.title} — Klyro Web Studio`,
      description: project.description[lang],
      images: [{ url: project.image }],
      url: `https://klyroweb.co/${locale}/portfolio/${slug}`,
    },
  };
}

export default async function ProjectPage({ params}: Props) {
    const { locale, slug } = await params
    const project = getProject(slug)

    if (!project) notFound()

    const lang = locale as "en" | "es"

    return (
        <main className="min-h-screen bg-navy-dark text-white-soft">
            {/* Back */}
            <div className="max-w-[1080px] mx-auto px-6 md:px-12 pt-10">
                <Link
                href="/#portfolio"
                className="inline-flex items-center gap-2 text-[13px] text-ice-dim hover:text-cyan transition-colors"
                >
                ← {lang === "es" ? "Volver al portfolio" : "Back to portfolio"}
                </Link>
            </div>

            {/* Hero image */}
            <div className="max-w-[1080px] mx-auto px-6 md:px-12 mt-8">
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.06]">
                <Image
                    src={project.image}
                    alt={project.imageAlt[lang]}
                    fill
                    className="object-cover object-top"
                    priority
                />
                </div>
            </div>

            {/* Header */}
            <div className="max-w-[1080px] mx-auto px-6 md:px-12 mt-10">
                <div className="flex items-center gap-2.5 mb-3">
                <span className="w-6 h-[1.5px] bg-gradient-to-r from-cyan to-teal rounded-full" />
                <span className={`text-[11px] font-medium tracking-[0.1em] uppercase ${project.tagColor}`}>
                    {project.tag[lang]}
                </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h1 className="font-display font-bold text-[42px] tracking-[-0.03em] leading-[1.1] mb-3">
                    {project.title}
                    </h1>
                    <p className="text-[17px] font-light text-ice-dim max-w-[560px] leading-[1.7]">
                    {project.description[lang]}
                    </p>
                </div>
                <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan/30 text-cyan text-[13px] font-medium hover:bg-cyan/10 transition-colors"
                >
                    {lang === "es" ? "Ver sitio en vivo" : "View live site"} ↗
                </a>
                </div>
            </div>

            <div className="max-w-[1080px] mx-auto px-6 md:px-12 mt-16 grid md:grid-cols-3 gap-12">
                {/* Left col: Problem + Stack */}
                <div className="md:col-span-2 space-y-12">
                {/* El problema */}
                <section>
                    <h2 className="font-display font-bold text-[22px] tracking-tight mb-4">
                    {lang === "es" ? "El problema" : "The problem"}
                    </h2>
                    <p className="text-[15px] font-light text-ice-dim leading-[1.8]">
                    {project.problem[lang]}
                    </p>
                </section>

                {/* Stack */}
                <section>
                    <h2 className="font-display font-bold text-[22px] tracking-tight mb-4">
                    {lang === "es" ? "Stack utilizado" : "Tech stack"}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                        <span
                        key={tech}
                        className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[13px] text-ice-dim font-medium"
                        >
                        {tech}
                        </span>
                    ))}
                    </div>
                </section>
                </div>

                {/* Right col: Métricas */}
                <aside>
                <h2 className="font-display font-bold text-[22px] tracking-tight mb-4">
                    {lang === "es" ? "Resultados" : "Results"}
                </h2>
                <div className="space-y-3">
                    {project.metrics.map((m) => (
                    <div
                        key={m.value}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                    >
                        <div className="font-display font-bold text-[26px] text-cyan tracking-tight">
                        {m.value}
                        </div>
                        <div className="text-[12px] text-ice-dim mt-0.5">
                        {m.label[lang]}
                        </div>
                    </div>
                    ))}
                </div>
                </aside>
            </div>

            {/* Galería */}
            <div className="max-w-[1080px] mx-auto px-6 md:px-12 mt-16 mb-24">
                <h2 className="font-display font-bold text-[22px] tracking-tight mb-6">
                {lang === "es" ? "Galería" : "Gallery"}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                {project.gallery.map((src, i) => (
                    <div
                    key={i}
                    className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.06]"
                    >
                    <Image
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        className="object-cover object-top"
                    />
                    </div>
                ))}
                </div>
            </div>
        </main>
    )
}