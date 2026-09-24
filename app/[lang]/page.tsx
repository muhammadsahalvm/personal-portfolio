import ScrollProgress from "@/components/layout/scroll-progress";
import ManifestoFlow from "@/components/effects/manifesto-flow";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Stack from "@/components/sections/stack";
import Projects from "@/components/sections/projects";
import Roadmap from "@/components/sections/roadmap";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />

      <main className="bg-background relative">

        <Hero />

        <div className="relative z-10 bg-background border-t border-border">

          <section id="about" className="section-snap">
            <About />
          </section>

          <ManifestoFlow />

          <section id="stack" className="section-snap">
            <Stack />
          </section>

          <ManifestoFlow reverse />

          <section id="projects" className="section-snap">
            <Projects />
          </section>

          <ManifestoFlow />

          <section id="roadmap" className="section-snap">
            <Roadmap />
          </section>

          <ManifestoFlow reverse />

          <section id="contact" className="section-snap">
            <Contact />
          </section>

        </div>

      </main >
    </>
  );
}
