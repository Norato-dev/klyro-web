# Klyro Web Studio

> Sitio oficial de **Klyro** — estudio de diseño y desarrollo web en Bogotá.
> Webs profesionales para emprendedores y empresas que quieren crecer online.

🌐 **klyro.co**

---

## ✨ Stack

- ⚡ **Next.js 16** (App Router) + **React 19**
- 🎨 **Tailwind CSS v4**
- 🔠 **TypeScript**
- ✉️ **Resend** para envío de emails del formulario de contacto
- 🛡️ **Zod** para validación de schemas
- 🎯 **clsx** + **tailwind-merge** para composición de clases
- 🔤 Tipografías: **Syne** (display) + **DM Sans** (texto)

---

## 📁 Estructura

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, providers
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Tailwind + tokens de diseño
│   └── actions/
│       └── contact.ts      # Server action (Resend + Zod)
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, Services, Process, Portfolio, About, CTA
│   └── ui/                 # Button, ContactModal, OpenModalButton
└── lib/
    └── utils.ts            # cn() helper
```

---

## 🚀 Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Servir build
npm start

# Lint
npm run lint
```

Abre [http://localhost:3000](http://localhost:3000).

---

## 🔐 Variables de entorno

Crea un archivo `.env.local` en la raíz:

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM=hola@tudominio.com
RESEND_TO=destino@tudominio.com
```

| Variable          | Descripción                                 |
| ----------------- | ------------------------------------------- |
| `RESEND_API_KEY`  | API key de [Resend](https://resend.com)     |
| `RESEND_FROM`     | Email remitente (debe estar verificado)     |
| `RESEND_TO`       | Email donde llegan los mensajes de contacto |

---

## 🎨 Sistema de diseño

Paleta inspirada en lo nocturno y eléctrico — `navy-dark`, `cyan`, `teal`, `ice`.
Tokens definidos como CSS custom properties en [src/app/globals.css](src/app/globals.css) y consumidos vía Tailwind.

Componentes UI con variantes tipadas (ej. `Button` → `primary` / `whatsapp`) y composición segura con `cn()`.

---

## 📦 Secciones de la landing

1. **Hero** — Propuesta de valor
2. **Services** — Qué hacemos
3. **Process** — Cómo trabajamos
4. **Portfolio** — Trabajos seleccionados
5. **About** — Quiénes somos
6. **CTA** — Modal de contacto + WhatsApp directo

---

## 🤝 Contacto

- 💬 WhatsApp: [+57 314 414 7996](https://wa.me/573144147996)
- 🌐 Web: [klyro.co](https://klyro.co)

---

Hecho con ☕ y mucho `cn()` por el equipo de Klyro.
