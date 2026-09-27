import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://leo-cumple-18.vercel.app"
  ),
  title: "¡Misión Acordeón para Leo! 🪗 Cumpleaños 18 de Leonardo Barreto Finol",
  description:
    "Leo cumple 18 años y su gran deseo es un acordeón. ¡Mira el avance de recaudación, el ranking de aportes y acompáñanos a la gran fiesta el 03 de Octubre en Kissimmee, FL!",
  keywords: [
    "Leonardo Barreto Finol",
    "Cumpleaños 18",
    "Acordeón Leo",
    "Misión Acordeón",
    "Fiesta Kissimmee",
    "Ranking",
  ],
  authors: [{ name: "Familia Barreto Finol" }],
  openGraph: {
    title: "¡Misión Acordeón para Leo! 🪗 Cumpleaños 18",
    description:
      "Cualquier aporte suma... ¡Acompáñanos a regalarle a Leo su acordeón y mira el ranking en vivo!",
    url: "https://leo-cumple-18.vercel.app",
    siteName: "Cumpleaños 18 de Leo",
    images: [
      {
        url: "/invitacion.jpeg",
        width: 1200,
        height: 1600,
        alt: "Invitación oficial Cumpleaños 18 de Leo Barreto Finol",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "¡Misión Acordeón para Leo! 🪗 Cumpleaños 18",
    description:
      "Leo cumple 18 y quiere un acordeón. ¡Mira la recaudación y el ranking de aportes!",
    images: ["/invitacion.jpeg"],
  },
  icons: {
    icon: "/invitacion.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <head>
        <meta name="theme-color" content="#111111" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="bg-[#111111] text-[#f4f4f4] min-h-screen flex flex-col antialiased selection:bg-[#B6FF00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
