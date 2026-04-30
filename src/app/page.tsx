import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { About } from "@/components/sections/About";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";

function Divider() {
  return (
    <div className="h-px mx-12 bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Divider />
      <Services />
      <Divider />
      <Process />
      <Divider />
      <Portfolio />
      <Divider />
      <About />
      <Divider />
      <CTA />
      <Footer />
    </main>
  );
}