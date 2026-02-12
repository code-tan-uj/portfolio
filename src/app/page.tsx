import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/sections/Hero";
import AboutServer from "@/components/sections/AboutServer";
import ProjectsServer from "@/components/sections/ProjectsServer";
import Skills from "@/components/sections/Skills";
import ExperienceSection from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <AboutServer />
      <ProjectsServer />
      <Skills />
      <ExperienceSection />
      <Contact />
    </MainLayout>
  );
}
