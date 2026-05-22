import type { Metadata } from "next";
import { Cormorant_Garamond, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ASSETS, SITE } from "@/lib/constants";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-josefin",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Meramu Rasa — Les Cipta Puisi Daring",
  description:
    "Meramu Rasa adalah platform les cipta puisi daring profesional bersama Ardi Kamal Karima. Belajar menulis puisi dengan bimbingan personal, sesi Zoom/Meet, materi eksklusif.",
  keywords: [
    "les puisi",
    "cipta puisi",
    "kursus puisi online",
    "Meramu Rasa",
    "Ardi Kamal Karima",
  ],
  authors: [{ name: SITE.founder }],
  openGraph: {
    title: "Meramu Rasa — Les Cipta Puisi Daring",
    description:
      "Belajar mencipta puisi dengan bimbingan langsung dari Ardi Kamal Karima. Platform les puisi daring yang artistik dan profesional.",
    type: "website",
    locale: "id_ID",
    siteName: SITE.name,
    images: [{ url: ASSETS.mentor, width: 800, height: 800, alt: SITE.founder }],
  },
  icons: {
    icon: ASSETS.logo,
    apple: ASSETS.logo,
  },
  twitter: {
    card: "summary_large_image",
    title: "Meramu Rasa — Les Cipta Puisi Daring",
    description:
      "Platform les puisi daring profesional dengan nuansa sastra modern.",
    images: [ASSETS.mentor],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${cormorant.variable} ${josefin.variable}`}>
      <body>{children}</body>
    </html>
  );
}
