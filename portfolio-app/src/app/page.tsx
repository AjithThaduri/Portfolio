import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section with Scroll Animation */}
      <section id="home" className="relative">
        {/* The canvas renders the image sequence */}
        <ScrollyCanvas />

        {/* Overlay with parallax text sections */}
        <Overlay />
      </section>

      {/* Projects Section */}
      <Projects />

      {/* Footer */}
      <Footer />
    </main>
  );
}
