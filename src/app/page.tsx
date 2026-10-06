import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Journey } from "@/components/Journey";
import { Features } from "@/components/Features";
import { Calculator } from "@/components/Calculator";
import { Security } from "@/components/Security";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Stats />
        <Journey />
        <Features />
        <Calculator />
        <Security />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
