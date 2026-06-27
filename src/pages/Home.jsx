import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Education from '../components/Education/Education';
import Portfolio from '../components/Portfolio/Portfolio';
import Certificates from '../components/Certificates/Certificates';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import ScrollToTop from '../components/common/ScrollToTop';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Portfolio />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
