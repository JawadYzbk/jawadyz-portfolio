import SiteHeader from '@/components/SiteHeader';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="content" tabIndex={-1} className="outline-none">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer year={new Date().getFullYear()} />
    </>
  );
}
