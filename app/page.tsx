"use client";

import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Mentor from "@/components/sections/Mentor";
import Program from "@/components/sections/Program";
import Registration from "@/components/sections/Registration";
import Testimonials from "@/components/sections/Testimonials";
import Upload from "@/components/sections/Upload";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";
import StarsCanvas from "@/components/StarsCanvas";
import Toast from "@/components/Toast";
import { useReveal, useToast } from "@/lib/hooks";

export default function Home() {
  const { message, show } = useToast();
  useReveal();

  return (
    <>
      <PageLoader />
      <StarsCanvas />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Mentor onToast={show} />
        <Program />
        <Upload onToast={show} />
        <Registration />
        <Testimonials />
        <Contact onToast={show} />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Toast message={message} />
    </>
  );
}
