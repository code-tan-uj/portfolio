import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import ExperienceSection from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <ExperienceSection />
      <Contact />
    </MainLayout>
  );
}
