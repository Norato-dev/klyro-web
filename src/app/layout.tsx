import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { ContactModalProvider } from "@/components/ui/ContactModalContext";
import { ContactModal } from "@/components/ui/ContactModal";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Klyro Web Studio · Diseño y desarrollo web en Bogotá",
  description:
    "Diseñamos y desarrollamos sitios web profesionales para emprendedores y empresas que quieren crecer online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-navy-dark text-ice antialiased">
        <ContactModalProvider>
          <Navbar />
          {children}
          <ContactModal />
        </ContactModalProvider>
      </body>
    </html>
  );
}