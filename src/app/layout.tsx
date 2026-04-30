// src/app/layout.tsx  ← este es el NUEVO, el raíz mínimo
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}