const WA_PHONE = "6283878581733";

function waLink(text: string) {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
}

export const SITE = {
  name: "Meramu Rasa",
  tagline: "Les Cipta Puisi Daring",
  founder: "Ardi Kamal Karima",
  email: "ardikamal1213@gmail.com",
  whatsapp: "+62 838-7858-1733",
  whatsappRaw: "+6283878581733",
  whatsappUrl: `https://wa.me/${WA_PHONE}`,
  whatsappRegisterUrl: waLink(
    "Halo Meramu Rasa, saya ingin mendaftar les cipta puisi.\n\nNama:\nJumlah pertemuan:\nJadwal yang diinginkan:\nTujuan mengikuti les:"
  ),
  whatsappKaryaUrl: waLink(
    "Halo Meramu Rasa, saya ingin mengirim karya puisi/tulisan saya untuk dibaca dan diberi umpan balik."
  ),
  emailUrl: "mailto:ardikamal1213@gmail.com",
  pricePerSession: 150_000,
} as const;

export const NAV_LINKS = [
  { href: "#tentang", label: "Tentang" },
  { href: "#mentor", label: "Mentor" },
  { href: "#program", label: "Program" },
  { href: "#kontak", label: "Kontak" },
] as const;

export const ASSETS = {
  logo: "/assets/logo.png",
  mentor: "/assets/mentor.jpg",
} as const;
