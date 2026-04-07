import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import BlogPreview from "../sections/BlogPreview";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <BlogPreview />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
