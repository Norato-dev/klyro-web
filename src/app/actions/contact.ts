"use server";

import { Resend } from "resend";
import { z } from "zod";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2, "name_too_short"),
  email: z.string().email("email_invalid"),
  projectType: z.string().min(1, "project_type_required"),
  message: z.string().min(10, "message_too_short"),
  // Honeypot — debe estar vacío siempre
  website: z.string().max(0, "bot_detected"),
});

export type ContactFormData = z.infer<typeof schema>;

export type ActionResult =
  | { success: true }
  | { success: false; errors: Partial<Record<keyof ContactFormData, string>> };

// Rate limiting simple en memoria
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;        // máx 3 envíos
const WINDOW_MS = 60 * 60 * 1000; // por hora

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

export async function sendContactEmail(
  data: ContactFormData & { website?: string }
): Promise<ActionResult> {

  // Rate limiting por IP
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return {
      success: false,
      errors: { message: "send_error" },
    };
  }

  // Honeypot check
  if (data.website && data.website.length > 0) {
    // Bot detectado — respuesta falsa exitosa para no revelar la trampa
    return { success: true };
  }

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};
    parsed.error.issues.forEach((e) => {
      const key = e.path[0] as keyof ContactFormData;
      errors[key] = e.message;
    });
    return { success: false, errors };
  }

  const { name, email, projectType, message } = parsed.data;

  try {
    await resend.emails.send({
      from: `Klyro Web Studio <${process.env.RESEND_FROM}>`,
      to: process.env.RESEND_TO!,
      replyTo: email,
      subject: `Nuevo proyecto: ${projectType} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #111b30; color: #dae8f8; border-radius: 12px;">
          <h2 style="color: #00d4ff; margin-bottom: 24px; font-size: 20px;">
            Nuevo mensaje de contacto — Klyro
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: rgba(218,232,248,0.55); font-size: 13px; width: 140px;">Nombre</td>
              <td style="padding: 10px 0; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: rgba(218,232,248,0.55); font-size: 13px;">Email</td>
              <td style="padding: 10px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #00d4ff;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: rgba(218,232,248,0.55); font-size: 13px;">Tipo de proyecto</td>
              <td style="padding: 10px 0; font-size: 15px;">${projectType}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: rgba(218,232,248,0.55); font-size: 13px; vertical-align: top;">Mensaje</td>
              <td style="padding: 10px 0; font-size: 15px; line-height: 1.6;">${message}</td>
            </tr>
          </table>
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(0,212,255,0.15); font-size: 12px; color: rgba(218,232,248,0.4);">
            Enviado desde klyroweb.co
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch {
    return {
      success: false,
      errors: { message: "send_error" },
    };
  }
}