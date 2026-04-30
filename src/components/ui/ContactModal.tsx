"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useContactModal } from "./ContactModalContext";
import { sendContactEmail, type ContactFormData } from "@/app/actions/contact";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

const WA_NUMBER = "573144147996";

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const empty: ContactFormData = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};

export function ContactModal() {
  const t = useTranslations("ContactModal");
  const tErrors = useTranslations("FormErrors");
  const { isOpen, closeModal } = useContactModal();
  const [form, setForm] = useState<ContactFormData>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const overlayRef = useRef<HTMLDivElement>(null);

  const projectTypes = [
    t("pt1"),
    t("pt2"),
    t("pt3"),
    t("pt4"),
    t("pt5"),
    t("pt6"),
  ];

  const WA_MESSAGE = encodeURIComponent(t("whatsappMessage"));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeModal]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setForm(empty);
        setErrors({});
        setStatus("idle");
      }, 300);
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const result = await sendContactEmail(form);
    if (result.success) {
      setStatus("success");
    } else {
      // Traduce los códigos de error a strings del idioma activo
      const translatedErrors: FieldErrors = {};
      for (const [key, code] of Object.entries(result.errors)) {
        translatedErrors[key as keyof ContactFormData] = tErrors(
          code as keyof IntlMessages["FormErrors"]
        );
      }
      setErrors(translatedErrors);
      setStatus("error");
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && closeModal()}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Fondo */}
      <div className="absolute inset-0 bg-navy-dark/80 backdrop-blur-xl" />

      {/* Panel */}
      <div
        className={cn(
          "relative w-full max-w-lg bg-navy-light border border-cyan/[0.15] rounded-3xl p-8 shadow-2xl transition-all duration-300",
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        )}
      >
        {/* Línea top */}
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-60 rounded-full" />

        {/* Cerrar */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-ice-dim hover:text-white-soft hover:border-white/20 transition-colors"
          aria-label={t("close")}
        >
          ✕
        </button>

        {status === "success" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center text-3xl mx-auto mb-6">
              ✓
            </div>
            <h3 className="font-display font-bold text-[24px] text-white-soft mb-3 tracking-tight">
              {t("successTitle")}
            </h3>
            <p className="text-[14px] text-ice-dim leading-[1.7] mb-8">
              {t("successDesc")}
            </p>
            <Button variant="ghost" onClick={closeModal}>
              {t("close")}
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-7">
              <h3 className="font-display font-bold text-[22px] text-white-soft tracking-tight mb-1">
                {t("title")}
              </h3>
              <p className="text-[13px] text-ice-dim">
                {t("subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label={t("labelName")} error={errors.name}>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("placeholderName")}
                  className={inputClass(!!errors.name)}
                />
              </Field>

              <Field label={t("labelEmail")} error={errors.email}>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("placeholderEmail")}
                  className={inputClass(!!errors.email)}
                />
              </Field>

              <Field label={t("labelProjectType")} error={errors.projectType}>
                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  className={cn(inputClass(!!errors.projectType), "cursor-pointer")}
                >
                  <option value="" disabled>
                    {t("placeholderProjectType")}
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label={t("labelMessage")} error={errors.message}>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("placeholderMessage")}
                  rows={4}
                  className={cn(inputClass(!!errors.message), "resize-none")}
                />
              </Field>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? t("sending") : t("send")}
                </Button>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button type="button" variant="whatsapp" size="lg" className="w-full sm:w-auto">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                    </svg>
                    WhatsApp
                  </Button>
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[12px] font-medium text-ice-dim tracking-wide uppercase">
        {label}
      </label>
      {children}
      {error && <p className="text-[12px] text-orange">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full bg-navy-dark border rounded-xl px-4 py-3 text-[14px] text-white-soft placeholder:text-ice-dim/40",
    "outline-none transition-colors duration-200",
    "focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20",
    hasError ? "border-orange/50" : "border-white/10 hover:border-white/20"
  );
}