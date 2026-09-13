import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import { getSeo } from "../data/seo";
import Hero from "../components/Hero";
import WhatWeOffer from "../components/WhatWeOffer";
import WhyChoose from "../components/WhyChoose";
import Solutions from "../components/Solutions";
import ProcessSteps from "../components/ProcessSteps";
import ImpactStats from "../components/ImpactStats";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <>
      <Seo {...getSeo("/")} />
      <Hero />
      <WhatWeOffer />
      <WhyChoose />
      <Solutions />
      <ProcessSteps />
      <ImpactStats />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
