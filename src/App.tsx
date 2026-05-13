import { useEffect } from 'react';
import { Amenities } from './components/Amenities';
import { Brands } from './components/Brands';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MobileCTA } from './components/MobileCTA';
import { PriceList } from './components/PriceList';
import { Process } from './components/Process';
import { Reviews } from './components/Reviews';
import { Services } from './components/Services';
import { Transparency } from './components/Transparency';
import { TrustBlock } from './components/TrustBlock';

export function App() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -40px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <PriceList />
        <TrustBlock />
        <Process />
        <Transparency />
        <Brands />
        <Reviews />
        <Amenities />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
