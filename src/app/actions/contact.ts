"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  projectType: z.string().min(1, "Selecciona un tipo de proyecto"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export type ContactFormData = z.infer<typeof schema>;

export type ActionResult =
  | { success: true }
  | { success: false; errors: Partial<Record<keyof ContactFormData, string>> };

export async function sendContactEmail(
  data: ContactFormData
): Promise<ActionResult> {
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
            Enviado desde klyro.co
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch {
    return {
      success: false,
      errors: { message: "Error al enviar. Intenta de nuevo." },
    };
  }
}