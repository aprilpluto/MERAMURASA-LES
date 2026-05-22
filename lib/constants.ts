export const SITE = {
  name: "Meramu Rasa",
  tagline: "Les Cipta Puisi Daring",
  founder: "Ardi Kamal Karima",
  email: "ardikamal1213@gmail.com",
  whatsapp: "+62 838-7858-1733",
  whatsappRaw: "+6283878581733",
  whatsappUrl: "https://wa.me/6283878581733",
  emailUrl: "mailto:ardikamal1213@gmail.com",
  pricePerSession: 150_000,
  maxUploadBytes: 5 * 1024 * 1024,
  allowedExtensions: ["pdf", "docx", "txt"] as const,
} as const;

export const NAV_LINKS = [
  { href: "#tentang", label: "Tentang" },
  { href: "#mentor", label: "Mentor" },
  { href: "#program", label: "Program" },
  { href: "#upload", label: "Karya" },
  { href: "#kontak", label: "Kontak" },
] as const;

export const ASSETS = {
  logo: "/assets/logo.png",
  mentor: "/assets/mentor.jpg",
} as const;
